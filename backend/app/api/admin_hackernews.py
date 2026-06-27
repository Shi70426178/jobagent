from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services.master_hackernews_service import (
    fetch_master_hackernews_jobs,
)

router = APIRouter()


@router.post("/fetch")
def fetch_jobs(
    db: Session = Depends(get_db),
):

    return fetch_master_hackernews_jobs(db)