# backend/models.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    business_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    
    # Relationships
    inventory = relationship("InventoryItem", back_populates="owner")
    sales = relationship("HistoricalSale", back_populates="owner")

class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String, index=True)
    current_stock = Column(Float)
    unit_cost = Column(Float)
    owner_id = Column(Integer, ForeignKey("users.id"))

    # Relationships
    owner = relationship("User", back_populates="inventory")

class HistoricalSale(Base):
    __tablename__ = "historical_sales"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String, index=True)
    quantity_sold = Column(Float)
    sale_date = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))

    # Relationships
    owner = relationship("User", back_populates="sales")