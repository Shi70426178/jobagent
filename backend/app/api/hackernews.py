from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
# from app.services.hackernews_service import get_hackernews_leads
from app.db.database import get_db
# from app.models.hackernews_post import HackerNewsPost
from app.services.gmail_service import send_test_email
from app.models.user import User
from app.core.dependencies import get_current_user
from app.services.user_hackernews_service import sync_user_jobs
from app.services.user_hackernews_query_service import get_user_jobs
from app.models.user_hackernews_post import UserHackerNewsPost
from app.models.master_hackernews_job import MasterHackerNewsJob
from app.models.resume import Resume

router = APIRouter()


@router.get("/posts")
def list_posts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_user_jobs(
        db=db,
        user_id=current_user.id,
    )
@router.post("/apply/{post_id}")
def apply_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    user_post = (
        db.query(UserHackerNewsPost)
        .filter(
            UserHackerNewsPost.id == post_id,
            UserHackerNewsPost.user_id == current_user.id,
        )
        .first()
    )

    if not user_post:
        return {
            "success": False,
            "message": "Job not found",
        }

    master_job = (
        db.query(MasterHackerNewsJob)
        .filter(
            MasterHackerNewsJob.id == user_post.master_job_id,
        )
        .first()
    )

    if not master_job:
        return {
            "success": False,
            "message": "Master job not found",
        }

    if not master_job.email:
        return {
            "success": False,
            "message": "Recruiter email not found",
        }

    resume = (
        db.query(Resume)
        .filter(
            Resume.user_id == current_user.id
        )
        .order_by(Resume.id.desc())
        .first()
    )

    send_test_email(
        db=db,
        user_id=current_user.id,
        to_email=master_job.email,
        subject=master_job.job_title,
        body=user_post.generated_email,
        attachment_path=resume.file_path if resume else None,
    )

    user_post.status = "applied"

    db.commit()
    db.refresh(user_post)

    return {
        "success": True
    }
@router.post("/sync")
def sync_hackernews(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    jobs = sync_user_jobs(
        db=db,
        user_id=current_user.id,
    )

    return {
        "success": True,
        "count": len(jobs),
    }