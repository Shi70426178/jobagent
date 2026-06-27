from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True)

    company = Column(String)

    title = Column(String)

    location = Column(String)

    source = Column(String)

    url = Column(String)

    description = Column(Text)

    match_score = Column(Integer)

    match_reason = Column(Text)