from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.db.base import Base


class HackerNewsPost(Base):

    __tablename__ = "hackernews_posts"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    comment_id = Column(String)

    company = Column(String)

    job_title = Column(String)

    email = Column(String)

    source_url = Column(String)

    summary = Column(Text)

    match_score = Column(Integer)

    match_reason = Column(Text)

    generated_email = Column(Text)

    status = Column(String, default="new")