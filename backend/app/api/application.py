from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.application import ApplicationCreate
from app.services.application_service import (
    create_application,
    get_applications
)

router = APIRouter()


@router.post("/")
def add_application(
    request: ApplicationCreate,
    db: Session = Depends(get_db)
):
    return create_application(
        db=db,
        user_id=1,  # temporary
        company=request.company,
        role=request.role
    )


@router.get("/")
def list_applications(
    db: Session = Depends(get_db)
):
    return get_applications(db)