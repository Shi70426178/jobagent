from sqlalchemy import Column, Integer, String, Text

from app.db.base import Base


class OAuthAccount(Base):
    __tablename__ = "oauth_accounts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False)

    provider = Column(String, nullable=False)

    email = Column(String)

    access_token = Column(Text)

    refresh_token = Column(Text)