# SmartStock

SmartStock is a full-stack web application featuring a React frontend and a FastAPI Python backend. It provides intelligent inventory and stock analysis using the ILMU API.

## 🎥 Pitching Video

> **Watch our pitching video here:** [**Link to Pitching Video**](INSERT_YOUR_VIDEO_LINK_HERE) *(Please replace this link with your actual Google Drive or cloud storage link)*

## Prerequisites

Before running the application, ensure you have the following installed on your machine:
- **Node.js** and **npm** (for the frontend)
- **Python 3.8+** (for the backend)
- **Database**: PostgreSQL (or SQLite, depending on your environment configuration)

## Project Structure

- `frontend/`: Contains the React web application built with Vite.
- `backend/`: Contains the FastAPI application.

## Getting Started

To run the application locally, you will need to run the backend and frontend simultaneously in two separate terminal windows.

---

### 1. Backend Setup

Open your first terminal and navigate to the `backend` directory:
```bash
cd backend
```

**Step 1: Create and Activate a Virtual Environment**
Creating a virtual environment ensures that the project dependencies do not interfere with your system-wide Python packages.
```bash
# On Windows:
python -m venv venv
venv\Scripts\activate

# On macOS/Linux:
python3 -m venv venv
source venv/bin/activate
```

**Step 2: Install Dependencies**
Once the virtual environment is activated, install the required Python packages from the `requirements.txt` file:
```bash
pip install -r requirements.txt
```
*(This will install necessary packages including `fastapi`, `uvicorn`, `sqlalchemy`, `psycopg2-binary`, `python-dotenv`, `requests`, and `anthropic`.)*

**Step 3: Setup Environment Variables**
Ensure you have a `.env` file in the `backend` directory. It should contain your database connection string and API key:
```env
DATABASE_URL=postgresql://username:password@your-database-host/smartstock
ILMU_API_KEY=your_ilmu_api_key
```

**Step 4: Run the Backend Server**
Start the FastAPI application using Uvicorn:
```bash
uvicorn main:app --reload
```
The backend API will start running at `http://localhost:8000`. You can access the interactive API documentation at `http://localhost:8000/docs`.

---

### 2. Frontend Setup

Open a **second** terminal window and navigate to the `frontend` directory:
```bash
cd frontend
```

**Step 1: Install Dependencies**
Install all the required Node.js packages (such as React, React Router, Recharts, Axios, etc.) by running:
```bash
npm install
```

**Step 2: Run the Frontend Development Server**
Start the Vite development server:
```bash
npm run dev
```
The terminal will display the local URL for the frontend application (typically `http://localhost:5173`). Open this URL in your web browser.

## Running the Application

To fully interact with SmartStock, make sure both servers are running concurrently:
1. The backend server in Terminal 1 (`http://localhost:8000`)
2. The frontend server in Terminal 2 (`http://localhost:5173`)
