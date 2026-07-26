from sqlalchemy import Column, Integer, String,  DateTime
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, nullable=False)

    full_name = Column(String)

    hashed_password = Column(String, nullable=True)

    reset_token = Column(String, nullable=True)
    reset_token_expiry = Column(DateTime, nullable=True)
    google_id = Column(String, unique=True, nullable=True)
    auth_provider = Column(String, default="email")
    profile_picture = Column(String, nullable=True)