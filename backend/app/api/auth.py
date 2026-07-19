from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from app.core.dependencies import get_current_user
from app.models.user import User
from sqlalchemy.orm import Session
from app.schemas.user import UserLogin
from app.services.auth_service import authenticate_user
from app.core.security import create_access_token
from app.db.database import get_db
from app.schemas.user import UserCreate
from app.services.auth_service import create_user
from datetime import datetime, timedelta

from app.schemas.user import (
    ForgotPasswordRequest,
    ResetPasswordRequest,
)

from app.core.security import (
    generate_reset_token,
    hash_password,
)

from app.services.email_service import (
    send_reset_password_email,
    send_welcome_email,
)
router = APIRouter()


@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    created = create_user(db, user)

    if not created:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    # Send welcome email
    send_welcome_email(
        created.email,
        created.full_name or "there"
    )

    return {
        "message": "User created",
        "email": created.email
    }
@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "sub": str(db_user.id),
            "email": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.post("/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )

    # Always return success (don't reveal whether the email exists)
    if not user:
        return {
            "message": "If an account exists, a reset link has been sent."
        }

    token = generate_reset_token()

    user.reset_token = token
    user.reset_token_expiry = datetime.utcnow() + timedelta(minutes=30)

    db.commit()

    send_reset_password_email(
        user.email,
        token,
    )

    return {
        "message": "If an account exists, a reset link has been sent."
    }

@router.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(User.reset_token == request.token)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid reset token"
        )

    if (
        user.reset_token_expiry is None
        or user.reset_token_expiry < datetime.utcnow()
    ):
        raise HTTPException(
            status_code=400,
            detail="Reset token has expired"
        )

    user.hashed_password = hash_password(request.password)

    user.reset_token = None
    user.reset_token_expiry = None

    db.commit()

    return {
        "message": "Password reset successfully"
    }

@router.get("/me")
def me(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
    }