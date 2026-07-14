from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base
from sqlalchemy import ForeignKey

class LinkedInPost(Base):

    __tablename__ = "linkedin_posts"

    id = Column(Integer, primary_key=True)
    user_id = Column(
    Integer,
    ForeignKey("users.id")
)

    recruiter_name = Column(String)

    company = Column(String)

    email = Column(String)

    job_title = Column(String)
    location = Column(String)
    posted_time = Column(String)

    experience = Column(String)


    status = Column(String, default="new")

    post_text = Column(Text)

    linkedin_url = Column(String)

    match_score = Column(Integer)

    match_reason = Column(Text)
    generated_email = Column(Text)
    