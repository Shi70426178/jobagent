from fastapi import FastAPI
from sqlalchemy import text
from app.api.gmail import router as gmail_router
from app.db.database import engine
from app.api.auth import router as auth_router
from app.api.application import router as application_router
app = FastAPI()

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

@app.get("/health/db")
def db_health():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))

    return {"database": "connected"}