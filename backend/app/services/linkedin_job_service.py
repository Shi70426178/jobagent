from datetime import datetime, timedelta
from sqlalchemy import or_
from app.models.linkedin_post import LinkedInPost
from app.models.linkedin_job import LinkedInJob


# Location aliases (normalized to lowercase keys)
LOCATION_MAP = {
    "bangalore": [
        "Bangalore",
        "Bengaluru",
        "Greater Bengaluru",
        "Bellandur",
        "Koramangala",
        "Manyata Tech Park",
        "North Bangalore",
    ],
    "hyderabad": [
        "Hyderabad",
        "Kondapur",
        "Malakpet",
    ],
    "mumbai": [
        "Mumbai",
        "Navi Mumbai",
        "Andheri",
        "Powai",
        "Thane",
        "Goregaon",
        "Lower Parel",
    ],
    "delhi ncr": [
        "Delhi",
        "Delhi NCR",
        "New Delhi",
        "Noida",
        "Greater Noida",
        "Gurgaon",
        "Gurugram",
        "Faridabad",
        "Ghaziabad",
    ],
    "pune": [
        "Pune",
        "Baner",
        "Kalyani Nagar",
        "Magarpatta",
        "Wakad",
        "Shivajinagar",
    ],
    "remote": [
        "Remote",
        "Work From Home",
        "WFH",
        "Permanent Remote",
        "Anywhere",
    ],
}


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

    # Location filter
    if location and location.strip():

        normalized_location = location.strip().lower()

        aliases = LOCATION_MAP.get(
            normalized_location,
            [location]
        )

        query = query.filter(
            or_(
                *[
                    LinkedInJob.location.ilike(f"%{alias}%")
                    for alias in aliases
                ]
            )
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