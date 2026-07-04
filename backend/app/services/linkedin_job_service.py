from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.models.linkedin_job import LinkedInJob


# from datetime import datetime, timedelta

def get_recent_jobs(db, keyword):

    last_7_days = datetime.utcnow() - timedelta(days=7)

    jobs = (
        db.query(LinkedInJob)
        .filter(
            LinkedInJob.scraped_at >= last_7_days,
            LinkedInJob.search_keyword.ilike(f"%{keyword}%")
        )
        .all()
    )

    return jobs