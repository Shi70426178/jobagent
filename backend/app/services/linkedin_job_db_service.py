from sqlalchemy.orm import Session
from app.models.linkedin_job import LinkedInJob


def save_job(
    db,
    recruiter_name,
    company,
    email,
    job_title,
    department,
    industry,
    location,
    posted_time,
    experience,
    employment_type,
    salary,
    skills,
    post_text,
    linkedin_url,
    search_keyword
):

    existing = (
        db.query(LinkedInJob)
        .filter(
            LinkedInJob.email == email,
            LinkedInJob.job_title == job_title
        )
        .first()
    )

    if existing:
        return existing

    job = LinkedInJob(
        recruiter_name=recruiter_name,

        company=company,

        email=email,

        job_title=job_title,

        department=department,

        industry=industry,

        location=location,

        experience=experience,

        employment_type=employment_type,

        salary=salary,

        skills=",".join(skills),

        post_text=post_text,

        linkedin_url=linkedin_url,

        search_keyword=search_keyword
        
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return job