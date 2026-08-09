from app.services.linkedin_job_service import get_recent_jobs
from app.services.linkedin_db_service import save_post
from app.services.job_match_service import calculate_match
from app.services.email_generator_service import generate_email
from datetime import datetime, timezone
from app.models.linkedin_post import LinkedInPost
from app.models.resume import Resume


def search_jobs(
    db,
    user_id,
    search_id,
    keywords,
    location,
    page=1,
    page_size=5
):
    print("Agent keyword:", keywords)

    result = get_recent_jobs(
        db=db,
        user_id=user_id,
        keywords=keywords,
        location=location,
        page=page,
        page_size=page_size
    )

    jobs = result["jobs"]
    total_jobs = result["total"]

    print("Jobs found:", len(jobs))

        # --------------------------------------------------
    # FIND JOBS ALREADY PROCESSED FOR THIS SEARCH
    # --------------------------------------------------

    saved_job_ids = {
        row[0]
        for row in (
            db.query(LinkedInPost.linkedin_job_id)
            .filter(
                LinkedInPost.user_id == user_id,
                LinkedInPost.search_id == search_id,
                LinkedInPost.linkedin_job_id.isnot(None)
            )
            .all()
        )
    }

    print("Already saved jobs:", len(saved_job_ids), flush=True)

    new_jobs = [
        job
        for job in jobs
        if job.id not in saved_job_ids
    ]

    print("New jobs to process:", len(new_jobs), flush=True)

   

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

    for job in new_jobs:

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
            search_id=search_id,
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

    return {
        "jobs": jobs,
        "total": total_jobs
}