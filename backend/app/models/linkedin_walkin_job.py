from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func

from app.db.base import Base


class LinkedInWalkInJob(Base):
    __tablename__ = "linkedin_walkin_jobs"

    id = Column(Integer, primary_key=True)

    recruiter_name = Column(String)

    company = Column(String)

    job_title = Column(String)

    post_text = Column(Text)

    linkedin_url = Column(String)

    source = Column(String, default="linkedin")

    scraped_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    search_keyword = Column(String)

    department = Column(String)

    industry = Column(String)

    location = Column(String)

    posted_time = Column(String)

    experience = Column(String)

    employment_type = Column(String)

    salary = Column(String)

    skills = Column(Text)

    # New walk-in specific fields
    walkin_date = Column(String)

    walkin_time = Column(String)

    venue = Column(Text)

    positions = Column(JSON)

    contact_email = Column(String)