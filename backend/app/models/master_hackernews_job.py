from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.db.base import Base


class MasterHackerNewsJob(Base):

    __tablename__ = "master_hackernews_jobs"

    id = Column(Integer, primary_key=True)

    comment_id = Column(String, unique=True)

    company = Column(String)

    job_title = Column(String)

    email = Column(String)

    source_url = Column(Text)

    raw_text = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )