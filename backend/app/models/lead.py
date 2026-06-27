from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.db.database import Base


class Lead(Base):

    __tablename__ = "leads"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    source = Column(String)

    email = Column(String)

    source_url = Column(String)

    summary = Column(Text)

    external_id = Column(String)