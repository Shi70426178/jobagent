from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.models.linkedin_job import LinkedInJob


def get_recent_jobs(db, keyword):

    last_24_hours = datetime.utcnow() - timedelta(hours=24)

    jobs = (
        db.query(LinkedInJob)
        .filter(
            LinkedInJob.scraped_at >= last_24_hours,
            LinkedInJob.search_keyword.ilike(f"%{keyword}%")
        )
        .all()
    )

    return jobs