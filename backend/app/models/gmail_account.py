from sqlalchemy import Column, Integer, String

# from app.db.database import Base
from app.db.base import Base

class GmailAccount(Base):
    __tablename__ = "gmail_accounts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    email = Column(String, unique=True)

    access_token = Column(String)

    refresh_token = Column(String)