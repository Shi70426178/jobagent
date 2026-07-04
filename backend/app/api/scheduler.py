from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.services.scheduler_service import run_scheduler

router = APIRouter()


@router.post("/run")
def run(
    db: Session = Depends(get_db)
):

    run_scheduler(db)

    return {
        "success": True,
        "message": "Scheduler completed"
    }