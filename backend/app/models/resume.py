from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer)

    file_path = Column(String)

    skills = Column(Text)

    experience = Column(Text)

    education = Column(Text)

    name = Column(String)

    email = Column(String)
    
    phone = Column(String)