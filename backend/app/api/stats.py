from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.linkedin_post import LinkedInPost
from app.models.user import User
from app.core.dependencies import get_current_user

router = APIRouter()

@router.get("")
def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    jobs_found = (
        db.query(LinkedInPost)
        .filter(
            LinkedInPost.user_id == current_user.id
        )
        .count()
    )

    applications_sent = (
        db.query(LinkedInPost)
        .filter(
            LinkedInPost.user_id == current_user.id,
            LinkedInPost.status == "applied"
        )
        .count()
    )

    return {
        "jobs_found": jobs_found,
        "applications_sent": applications_sent
    }