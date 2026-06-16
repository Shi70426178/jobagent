from fastapi import FastAPI
from sqlalchemy import text

from app.db.database import engine, Base

from app.api.gmail import router as gmail_router
from app.api.auth import router as auth_router
from app.api.application import router as application_router

from app.models.user import User
from app.models.gmail_account import GmailAccount

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

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