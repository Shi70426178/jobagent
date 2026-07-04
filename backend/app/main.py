from fastapi import FastAPI
from sqlalchemy import text
from app.api.jobs import router as jobs_router
from app.api.linkedin import router as linkedin_router
from app.models.linkedin_post import LinkedInPost
# from app.db.database import engine, Base
from app.db.database import engine
from app.db.base import Base
from app.api.agent import router as agent_router
from app.api.gmail import router as gmail_router
from app.api.auth import router as auth_router
from app.api.application import router as application_router
from app.api.application import router as application_router
from app.models.user import User
from app.models.gmail_account import GmailAccount
from app.api.resume import router as resume_router
from fastapi.middleware.cors import CORSMiddleware
# from app.api.stats import router as stats_router
from app.api.stats import router as stats_router
from app.models.hackernews_post import HackerNewsPost
from app.api.hackernews import router as hackernews_router
from app.api import admin_hackernews
from app.models.scheduler_keyword import SchedulerKeyword
# from app.api import auth, gmail, resume, application, users
# from app.api.users import router as users_router
from app.models.linkedin_job import LinkedInJob
from app.api.scheduler import router as scheduler_router
app = FastAPI()

# print("DATABASE BASE TABLES")
# print(Base.metadata.tables.keys())
Base.metadata.create_all(bind=engine)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)
app.include_router(
    gmail_router,
    prefix="/gmail",
    tags=["Gmail"]
)
app.include_router(
    application_router,
    prefix="/applications",
    tags=["Applications"]
)
# app.include_router(
#     application_router,
#     prefix="/applications",
#     tags=["Applications"]
# )
app.include_router(
    agent_router,
    prefix="/agent",
    tags=["Agent"]
)
app.include_router(
    jobs_router,
    prefix="/jobs",
    tags=["Jobs"]
)
app.include_router(
    linkedin_router,
    prefix="/linkedin",
    tags=["LinkedIn"]
)
app.include_router(
    resume_router
)
app.include_router(
    stats_router,
    prefix="/stats",
    tags=["Stats"]
)
app.include_router(
    hackernews_router,
    prefix="/hackernews",
    tags=["Hacker News"]
)
app.include_router(
    admin_hackernews.router,
    prefix="/admin/hackernews",
    tags=["Admin HackerNews"],
)
# app.include_router(
#     users_router,
#     prefix="/users",
#     tags=["Users"],
# )
app.include_router(
    scheduler_router,
    prefix="/scheduler",
    tags=["Scheduler"]
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/health/db")
def db_health():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))

    return {"database": "connected"}