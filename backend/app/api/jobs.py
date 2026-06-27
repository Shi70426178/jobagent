from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.job import Job

router = APIRouter()


@router.get("/")
def get_jobs(
    db: Session = Depends(get_db)
):
    return db.query(Job).all()


@router.get("/{job_id}")
def get_job(
    job_id: int,
    db: Session = Depends(get_db)
):
    job = (
        db.query(Job)
        .filter(Job.id == job_id)
        .first()
    )

    return job