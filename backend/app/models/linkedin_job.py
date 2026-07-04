from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.db.base import Base


class LinkedInJob(Base):
    __tablename__ = "linkedin_jobs"

    id = Column(Integer, primary_key=True)

    recruiter_name = Column(String)

    company = Column(String)

    email = Column(String)

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

    experience = Column(String)

    employment_type = Column(String)

    salary = Column(String)

    skills = Column(Text)