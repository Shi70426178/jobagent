from app.models.master_hackernews_job import MasterHackerNewsJob
from app.models.user_hackernews_post import UserHackerNewsPost
from app.models.resume import Resume

from app.services.job_match_service import calculate_match
from app.services.email_generator_service import generate_email


def sync_user_jobs(
    db,
    user_id,
):

    resume = (
        db.query(Resume)
        .filter(
            Resume.user_id == user_id
        )
        .order_by(
            Resume.id.desc()
        )
        .first()
    )

    if not resume:
        return []

    existing = (
        db.query(
            UserHackerNewsPost.master_job_id
        )
        .filter(
            UserHackerNewsPost.user_id == user_id
        )
    )

    jobs = (
        db.query(
            MasterHackerNewsJob
        )
        .filter(
            ~MasterHackerNewsJob.id.in_(existing)
        )
        .order_by(
            MasterHackerNewsJob.created_at.desc()
        )
        .limit(10)
        .all()
    )

    synced = []

    for job in jobs:

        match = calculate_match(
            resume.skills,
            resume.experience,
            job.raw_text,
        )

        generated_email = ""

        if match["score"] >= 60:

            generated_email = generate_email(
                resume,
                job.job_title,
                job.company,
                job.raw_text,
            )

        row = UserHackerNewsPost(

            user_id=user_id,

            master_job_id=job.id,

            match_score=match["score"],

            match_reason=match["reason"],

            generated_email=generated_email,
        )

        db.add(row)

        synced.append(row)

    db.commit()

    return synced