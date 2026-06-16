from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.base import Base

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False)

    company = Column(String, nullable=False)

    role = Column(String, nullable=False)

    status = Column(String, default="pending")

    thread_id = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
