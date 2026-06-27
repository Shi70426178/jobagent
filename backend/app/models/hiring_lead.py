from sqlalchemy import Column, Integer, String
from app.db.base import Base

class HiringLead(Base):
    __tablename__ = "hiring_leads"

    id = Column(Integer, primary_key=True)

    title = Column(String)

    company = Column(String)

    url = Column(String)

    email = Column(String)

    source = Column(String)

    status = Column(String, default="new")