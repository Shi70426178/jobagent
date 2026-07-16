from datetime import datetime, timedelta
from sqlalchemy import or_
from app.models.linkedin_post import LinkedInPost
from app.models.linkedin_job import LinkedInJob


def get_recent_jobs(
    db,
    user_id,
    keyword,
    location=None
):

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

    shown_jobs = (
        db.query(LinkedInPost.linkedin_job_id)
        .filter(
            LinkedInPost.user_id == user_id
        )
    )

    query = query.filter(
        ~LinkedInJob.id.in_(shown_jobs)
    )

    return (
        query.order_by(
            LinkedInJob.scraped_at.desc()
        )
        .limit(10)
        .all()
    )