from sqlalchemy.exc import IntegrityError
from app.models.hackernews_post import HackerNewsPost


def save_hackernews_post(
    db,
    user_id,
    comment_id,
    company,
    job_title,
    email,
    source_url,
    summary,
    match_score,
    match_reason,
    generated_email,
):

    existing = (
        db.query(HackerNewsPost)
        .filter(
            HackerNewsPost.user_id == user_id,
            HackerNewsPost.comment_id == str(comment_id),
        )
        .first()
    )

    if existing:
        return existing

    post = HackerNewsPost(
        user_id=user_id,
        comment_id=str(comment_id),
        company=company,
        job_title=job_title,
        email=email,
        source_url=source_url,
        summary=summary,
        match_score=match_score,
        match_reason=match_reason,
        generated_email=generated_email,
        status="new",
    )

    db.add(post)

    try:
        db.commit()
        db.refresh(post)
    except IntegrityError:
        db.rollback()
        return None

    return post