from sqlalchemy.orm import Session
from app.core.security import verify_password

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password


def create_user(
    db: Session,
    user: UserCreate
):
    existing = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing:
        return None

    db_user = User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hash_password(
            user.password
        )
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def authenticate_user(
    db,
    email,
    password
):
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.hashed_password
    ):
        return None

    return user