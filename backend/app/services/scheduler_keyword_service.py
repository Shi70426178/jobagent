from sqlalchemy.orm import Session
from sqlalchemy import asc

from app.models.scheduler_keyword import SchedulerKeyword


def get_next_keyword(db: Session):

    keyword = (
        db.query(SchedulerKeyword)
        .order_by(
            SchedulerKeyword.last_run.asc().nullsfirst()
        )
        .first()
    )

    return keyword


def mark_completed(db: Session, keyword):

    from datetime import datetime

    keyword.last_run = datetime.utcnow()

    db.commit()