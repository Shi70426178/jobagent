from app.services.linkedin_job_service import get_recent_jobs
from app.services.linkedin_db_service import save_post
from app.services.job_match_service import calculate_match
from app.services.email_generator_service import generate_email

from app.models.resume import Resume


def search_jobs(
    db,
    user_id,
    keywords
):

    jobs = get_recent_jobs(db, keywords)

    resume = (
        db.query(Resume)
        .filter(
            Resume.user_id == user_id
        )
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        return

    for job in jobs:

        match = calculate_match(
            resume.skills,
            resume.experience,
            job.post_text
        )

        # email_text = generate_email(
        #     resume=resume,
        #     job_title=job.job_title,
        #     company=job.company,
        #     post_text=job.post_text
        # )

        save_post(
            db=db,
            user_id=user_id,
            recruiter_name=job.recruiter_name,
            company=job.company,
            email=job.email,
            job_title=job.job_title,
            post_text=job.post_text,
            match_score=match["score"],
            match_reason=match["reason"],
            generated_email=""
        )

    return True