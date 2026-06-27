from sqlalchemy import (
    Column,
    Integer,
    Text,
    String,
    ForeignKey,
    DateTime,
    UniqueConstraint,
)

from sqlalchemy.sql import func

from app.db.base import Base


class UserHackerNewsPost(Base):

    __tablename__ = "user_hackernews_posts"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    master_job_id = Column(
        Integer,
        ForeignKey("master_hackernews_jobs.id"),
        nullable=False,
    )

    match_score = Column(Integer)

    match_reason = Column(Text)

    generated_email = Column(Text)

    status = Column(
        String,
        default="new",
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "master_job_id",
            name="uq_user_master_job",
        ),
    )