from app.models.user_hackernews_post import UserHackerNewsPost
from app.models.master_hackernews_job import MasterHackerNewsJob


def get_user_jobs(
    db,
    user_id,
):

    rows = (
        db.query(
            UserHackerNewsPost,
            MasterHackerNewsJob,
        )
        .join(
            MasterHackerNewsJob,
            UserHackerNewsPost.master_job_id
            ==
            MasterHackerNewsJob.id,
        )
        .filter(
            UserHackerNewsPost.user_id == user_id
        )
        .order_by(
            UserHackerNewsPost.id.desc()
        )
        .all()
    )

    data = []

    for user_job, master_job in rows:

        data.append({

            "id": user_job.id,

            "comment_id": master_job.comment_id,

            "company": master_job.company,

            "job_title": master_job.job_title,

            "email": master_job.email,

            "source_url": master_job.source_url,

            "match_score": user_job.match_score,

            "match_reason": user_job.match_reason,

            "generated_email": user_job.generated_email,

            "status": user_job.status,
        })

    return data