from fastapi import APIRouter, Depends
from sqlalchemy import or_, and_
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
        .filter(

            or_(
                and_(
                    LinkedInWalkInJob.walkin_date.isnot(None),
                    LinkedInWalkInJob.walkin_date != ""
                ),
                and_(
                    LinkedInWalkInJob.walkin_time.isnot(None),
                    LinkedInWalkInJob.walkin_time != ""
                ),
            ),

            or_(
                and_(
                    LinkedInWalkInJob.venue.isnot(None),
                    LinkedInWalkInJob.venue != ""
                ),
                and_(
                    LinkedInWalkInJob.location.isnot(None),
                    LinkedInWalkInJob.location != ""
                ),
            ),

        )
        .order_by(LinkedInWalkInJob.scraped_at.desc())
        .all()
    )

    return jobs