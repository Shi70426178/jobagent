from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.gmail_service import send_test_email
from app.db.database import get_db
from app.models.linkedin_post import LinkedInPost
from app.services.linkedin_service import open_linkedin
from app.models.user import User
from app.core.dependencies import get_current_user
from app.models.resume import Resume
from app.schemas.linkedin import UpdateEmailRequest
router = APIRouter()


@router.get("/login")
def linkedin_login(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    open_linkedin(
        db,
        current_user.id
    )

    return {"message": "success"}


@router.get("/posts")
def get_posts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(LinkedInPost)
        .filter(
            LinkedInPost.user_id == current_user.id
        )
        .order_by(LinkedInPost.id.desc())
        .all()
    )

@router.post("/apply/{post_id}")
def apply_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    post = (
        db.query(LinkedInPost)
        .filter(
            LinkedInPost.id == post_id
        )
        .first()
    )

    if not post:
        return {
            "success": False
        }

    if not post.email:
        return {
            "success": False,
            "message": "No recruiter email found"
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
        to_email=post.email,
        subject=post.job_title,
        body=post.generated_email,
        attachment_path=resume.file_path if resume else None
    )

    post.status = "applied"

    db.commit()

    return {
        "success": True
    }

@router.put("/email/{post_id}")
def update_email(
    post_id: int,
    request: UpdateEmailRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    post = (
        db.query(LinkedInPost)
        .filter(
            LinkedInPost.id == post_id,
            LinkedInPost.user_id == current_user.id
        )
        .first()
    )

    if not post:
        return {
            "success": False
        }

    post.generated_email = request.generated_email

    db.commit()

    return {
        "success": True
    }