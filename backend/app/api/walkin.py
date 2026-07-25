from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.linkedin_walkin_job import LinkedInWalkInJob

router = APIRouter(
    prefix="/walkin",
    tags=["WalkIns"]
)

@router.get("/jobs")
def get_walkin_jobs(db: Session = Depends(get_db)):

    jobs = (
        db.query(LinkedInWalkInJob)
        .order_by(LinkedInWalkInJob.scraped_at.desc())
        .all()
    )

    return jobs