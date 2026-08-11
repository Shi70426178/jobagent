from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.services.recommendation_service import (
    get_recommended_jobs,
)


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],
)


@router.get("/jobs")
def recommended_jobs(
    page: int = Query(
        1,
        ge=1
    ),
    limit: int = Query(
        20,
        ge=1,
        le=50
    ),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_recommended_jobs(
        db=db,
        user_id=current_user.id,
        page=page,
        limit=limit,
    )