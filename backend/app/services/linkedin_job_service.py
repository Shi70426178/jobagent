from datetime import datetime, timedelta
from sqlalchemy import or_

from app.models.linkedin_job import LinkedInJob


def get_recent_jobs(db, keyword, location=None):

    last_7_days = datetime.utcnow() - timedelta(days=7)

    query = (
        db.query(LinkedInJob)
        .filter(
            LinkedInJob.scraped_at >= last_7_days,
            or_(
                LinkedInJob.search_keyword.ilike(f"%{keyword}%"),
                LinkedInJob.skills.ilike(f"%{keyword}%")
            )
        )
    )

    if location and location.strip():
        query = query.filter(
            LinkedInJob.location.ilike(f"%{location}%")
        )

    return query.all()