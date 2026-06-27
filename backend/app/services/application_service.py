from sqlalchemy.orm import Session

from app.models.application import Application


def create_application(
    db: Session,
    user_id: int,
    company: str,
    role: str
):
    application = Application(
        user_id=user_id,
        company=company,
        role=role
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return application


def get_applications(
    db: Session
):
    return db.query(Application).all()