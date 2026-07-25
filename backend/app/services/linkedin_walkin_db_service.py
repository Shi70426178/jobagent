import re
from sqlalchemy.orm import Session
from app.models.linkedin_walkin_job import LinkedInWalkInJob

WALKIN_PATTERN = re.compile(r"\bwalk[- ]?in\b", re.IGNORECASE)


def is_walkin_post(post_text: str) -> bool:
    if not post_text:
        return False

    return bool(WALKIN_PATTERN.search(post_text))


def save_walkin_job(
    db: Session,
    recruiter_name: str,
    company: str,
    job_title: str,
    department: str,
    industry: str,
    location: str,
    posted_time: str,
    experience: str,
    employment_type: str,
    salary: str,
    skills,
    post_text: str,
    linkedin_url: str,
    search_keyword: str
):

    existing = (
        db.query(LinkedInWalkInJob)
        .filter(
            LinkedInWalkInJob.post_text == post_text
        )
        .first()
    )

    if existing:
        return existing

    job = LinkedInWalkInJob(
        recruiter_name=recruiter_name,
        company=company,
        job_title=job_title,
        department=department,
        industry=industry,
        location=location,
        posted_time=posted_time,
        experience=experience,
        employment_type=employment_type,
        salary=salary,
        skills=",".join(skills) if isinstance(skills, list) else skills,
        post_text=post_text,
        linkedin_url=linkedin_url,
        search_keyword=search_keyword
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return job