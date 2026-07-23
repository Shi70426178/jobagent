from sqlalchemy import Column, Integer, String
from app.db.database import Base

class JobKeyword(Base):
    __tablename__ = "job_keywords"

    id = Column(Integer, primary_key=True, index=True)
    keyword = Column(String(100), unique=True, nullable=False, index=True)
    search_value = Column(String(100), nullable=True)