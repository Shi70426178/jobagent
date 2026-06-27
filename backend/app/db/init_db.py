from app.db.database import engine
from app.db.base import Base
from app.models.oauth_account import OAuthAccount
from app.models.user import User
from app.models.application import Application
from app.models.application import Application
from app.models.job import Job
from app.models.hiring_lead import HiringLead
from app.models.resume import Resume
Base.metadata.create_all(bind=engine)

print("Tables created")