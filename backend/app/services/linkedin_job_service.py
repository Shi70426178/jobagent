from datetime import datetime, timedelta
from sqlalchemy import or_
from app.models.linkedin_job import LinkedInJob


def get_recent_jobs(db, keyword):

    last_7_days = datetime.utcnow() - timedelta(days=7)

    jobs = (
        db.query(LinkedInJob)
        .filter(
            LinkedInJob.scraped_at >= last_7_days,
            or_(
                LinkedInJob.search_keyword.ilike(f"%{keyword}%"),
                LinkedInJob.skills.ilike(f"%{keyword}%")
            )
        )
        .all()
    )

    return jobs