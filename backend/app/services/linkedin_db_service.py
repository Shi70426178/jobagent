from sqlalchemy.orm import Session
from app.models.linkedin_post import LinkedInPost


def save_post(
    db: Session,
    user_id: int,
    recruiter_name: str,
    company: str,
    email: str,
    job_title: str,
    post_text: str,
    location: str = "",
    posted_time: str = "",
    experience: str = "",
    skills: str = "",
    match_score: int = 0,
    match_reason: str = "",
    generated_email: str = ""
):

    existing = (
        db.query(LinkedInPost)
        .filter(
            LinkedInPost.user_id == user_id,
            LinkedInPost.email == email
        )
        .first()
    )

    if existing:
        return existing

    post = LinkedInPost(
        user_id=user_id,
        recruiter_name=recruiter_name,
        company=company,
        email=email,
        job_title=job_title,
        location=location,
        posted_time=posted_time,
        experience=experience,
        skills=skills,
        status="new",
        post_text=post_text,
        linkedin_url="",
        match_score=match_score,
        match_reason=match_reason,
        generated_email=generated_email
    )

    db.add(post)

    db.commit()

    db.refresh(post)

    return post