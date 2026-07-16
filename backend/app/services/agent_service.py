from app.services.linkedin_job_service import get_recent_jobs
from app.services.linkedin_db_service import save_post
from app.services.job_match_service import calculate_match
from app.services.email_generator_service import generate_email
from datetime import datetime, timezone
from app.models.resume import Resume


def search_jobs(
    db,
    user_id,
    keywords,
    location
):
    print("Agent keyword:", keywords)

    jobs = get_recent_jobs(
        db,
        user_id,
        keywords,
        location
    )

    print("Jobs found:", len(jobs))

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

        print(f"Processing: {job.company} - {job.job_title}", flush=True)

        match = calculate_match(
            resume.skills,
            resume.experience,
            job.post_text
        )

        print(f"Match score: {match['score']}", flush=True)

        diff = datetime.now(timezone.utc) - job.scraped_at

        hours = int(diff.total_seconds() // 3600)

        if hours < 1:
            minutes = int(diff.total_seconds() // 60)
            current_posted_time = f"{minutes} mins ago"
        elif hours < 24:
            current_posted_time = f"{hours} hrs ago"
        else:
            days = hours // 24
            current_posted_time = f"{days} days ago"

        save_post(
            db=db,
            user_id=user_id,
            linkedin_job_id=job.id,
            recruiter_name=job.recruiter_name,
            company=job.company,
            email=job.email,
            job_title=job.job_title,
            location=job.location,
            posted_time=current_posted_time,
            experience=job.experience,
            skills=job.skills,
            post_text=job.post_text,
            match_score=match["score"],
            match_reason=match["reason"],
            generated_email=""
        )

        print("Saved post successfully", flush=True)

    return True