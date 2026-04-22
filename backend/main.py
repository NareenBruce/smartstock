# backend/main.py
from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import csv
import io
import models
from database import engine, get_db
# --- Add these to the VERY TOP of backend/main.py ---
import os
import requests
from dotenv import load_dotenv
import json

# Create the database tables
models.Base.metadata.create_all(bind=engine)

# Load the secret API key from the .env file
load_dotenv()
Z_AI_API_KEY = os.getenv("Z_AI_API_KEY")

app = FastAPI(title="SmartStock API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://smartstock.nareenbruce.tech"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "SmartStock Backend is running."}

# --- NEW: Phase 2 CSV Upload Endpoint ---
@app.post("/api/v1/upload-sales")
async def upload_sales_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # 1. Validate it's actually a CSV
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a CSV.")

    try:
        # 2. Read the file into memory
        contents = await file.read()
        decoded = contents.decode('utf-8')
        reader = csv.DictReader(io.StringIO(decoded))

        sales_records_count = 0
        
        # 3. Parse each row and add it to the database
        for row in reader:
            # We assume the CSV has columns: item_name, quantity_sold, sale_date
            sale_date_str = row.get('sale_date')
            sale_date = datetime.strptime(sale_date_str, "%Y-%m-%d") if sale_date_str else datetime.utcnow()
            
            new_sale = models.HistoricalSale(
                item_name=row.get('item_name', 'Unknown Item'),
                quantity_sold=float(row.get('quantity_sold', 0)),
                sale_date=sale_date,
                owner_id=1 # Hardcoding user 1 for the MVP
            )
            db.add(new_sale)
            sales_records_count += 1

        # 4. Commit all records to the SQLite database
        db.commit()
        
        return {
            "status": "success", 
            "message": f"Successfully imported {sales_records_count} sales records."
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error processing CSV: {str(e)}")

# Placeholder for the AI Integration (From Phase 1)
# Add this endpoint to the bottom of backend/main.py

@app.post("/api/v1/analyze-inventory")
def analyze_inventory(context_notes: str, db: Session = Depends(get_db)):
    # 1. Fetch historical sales
    sales = db.query(models.HistoricalSale).all()
    if not sales:
        raise HTTPException(status_code=400, detail="No historical sales data found. Please upload a CSV first.")

    # 2. Format structured data
    sales_summary = "Historical Sales Data (Last 7 Days):\n"
    for sale in sales:
        sales_summary += f"- {sale.item_name}: {sale.quantity_sold} sold on {sale.sale_date.strftime('%Y-%m-%d')}\n"
        
    # 3. Token Boundary Mitigation (Protects against oversized inputs)
    estimated_tokens = int((len(sales_summary.split()) + len(context_notes.split())) * 1.3)
    MAX_TOKENS = 1500
    boundary_warning = None
    
    if estimated_tokens > MAX_TOKENS:
        sales_summary = sales_summary[:2000] + "\n...[DATA TRUNCATED DUE TO TOKEN LIMITS]"
        boundary_warning = "Input truncated to prevent Z.AI API failure."

    # 4. Construct the System & User Prompts
    system_prompt = """
    You are SmartStock, an AI decision-support tool for SMEs. 
    Analyze the provided sales data against the user's operational context.
    You MUST output your response as a strictly formatted JSON object with exactly three keys:
    {
      "mock_strategy": "A clear 1-sentence purchasing action",
      "mock_tradeoff": "A clear 1-sentence explanation of cost vs risk",
      "risk_level": an integer between 0 and 100
    }
    Do not include any markdown formatting, just the raw JSON.
    """
    
    user_prompt = f"{sales_summary}\n\nOperational Context: {context_notes}"

    # 5. --- THE Z.AI API INTEGRATION ---
    # Fallback if you haven't pasted your key yet
    if not Z_AI_API_KEY or Z_AI_API_KEY == "your_z_ai_api_key_goes_here":
        return {
            "estimated_tokens": estimated_tokens,
            "boundary_warning": boundary_warning,
            "mock_strategy": "[MOCK] Reduce dairy orders by 20% due to storm.",
            "mock_tradeoff": "[MOCK] Saves $60, risks stockout if weather clears.",
            "riskLevel": 85
        }

    # The actual network request to Z.AI
    headers = {
        "Authorization": f"Bearer {Z_AI_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # NOTE: Adjust the endpoint URL and payload structure based on the official hackathon Z.AI docs!
    payload = {
        "model": "z-ai-glm-1", # Check exact model name in hackathon docs
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.2 # Low temperature for highly analytical, consistent business logic
    }

    try:
        # Send to Z.AI API
        response = requests.post("https://api.z.ai/v1/chat/completions", json=payload, headers=headers)
        response.raise_for_status() # Triggers the except block if it fails
        
        # Parse the response
        ai_response_data = response.json()
        ai_text = ai_response_data['choices'][0]['message']['content']
        
        # Convert the AI's JSON string into an actual Python dictionary
        ai_insights = json.loads(ai_text)
        
        return {
            "status": "success",
            "estimated_tokens": estimated_tokens,
            "boundary_warning": boundary_warning,
            "mock_strategy": ai_insights.get("mock_strategy", "Strategy generation failed."),
            "mock_tradeoff": ai_insights.get("mock_tradeoff", "Tradeoff analysis failed."),
            "riskLevel": ai_insights.get("risk_level", 50)
        }

    except requests.exceptions.RequestException as e:
        # Graceful degradation: The AI crashed, but the system survives
        raise HTTPException(status_code=502, detail=f"Z.AI API Connection Error: {str(e)}")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Z.AI returned an unreadable format. Please try again.")

# backend/main.py (Add to the bottom)

@app.get("/api/v1/trends")
def get_predictive_trends(db: Session = Depends(get_db)):
    # 1. Fetch all historical sales from the SQLite database
    sales = db.query(models.HistoricalSale).all()
    
    if not sales:
        return []

    # 2. Aggregate total sales by date
    daily_sales = {}
    for sale in sales:
        # Format date to just 'MM-DD' for a cleaner chart X-axis
        date_str = sale.sale_date.strftime('%m-%d') 
        if date_str not in daily_sales:
            daily_sales[date_str] = 0
        daily_sales[date_str] += sale.quantity_sold

    # 3. Format the data for Recharts
    trends_data = []
    for date_str, total in daily_sales.items():
        trends_data.append({
            "day": date_str,
            "historicalSales": total,
            # For the MVP, we mock the AI prediction as 85% of historical, and risk at 12%
            # In production, Z.AI would generate these numbers.
            "predictedDemand": int(total * 0.85), 
            "spoilageRisk": 12 
        })
        
    # Sort chronologically and return the last 7 days
    trends_data = sorted(trends_data, key=lambda x: x["day"])[-7:]
    
    return trends_data