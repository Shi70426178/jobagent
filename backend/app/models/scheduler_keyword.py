from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.base import Base


class SchedulerKeyword(Base):
    __tablename__ = "scheduler_keywords"

    id = Column(Integer, primary_key=True)

    keyword = Column(String, unique=True, nullable=False)

    last_run = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )