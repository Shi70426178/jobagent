# app/models/agent_search.py
from sqlalchemy import Integer
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.database import Base
# app/models/agent_search.py
class AgentSearch(Base):
    __tablename__ = "agent_searches"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    keywords = Column(String)

    location = Column(String)

    total_jobs = Column(Integer, default=0)

    created_at = Column(DateTime, server_default=func.now())

    last_scraped_page = Column(Integer, default=0)

