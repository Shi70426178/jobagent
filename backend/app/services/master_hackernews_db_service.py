from app.models.master_hackernews_job import MasterHackerNewsJob


def save_master_job(
    db,
    comment_id,
    company,
    job_title,
    email,
    source_url,
    raw_text,
):

    existing = (
        db.query(MasterHackerNewsJob)
        .filter(
            MasterHackerNewsJob.comment_id == str(comment_id)
        )
        .first()
    )

    if existing:
        return existing

    job = MasterHackerNewsJob(

        comment_id=str(comment_id),

        company=company,

        job_title=job_title,

        email=email,

        source_url=source_url,

        raw_text=raw_text,
    )

    db.add(job)

    db.commit()

    db.refresh(job)

    return job