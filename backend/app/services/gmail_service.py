from sqlalchemy.orm import Session

from app.models.gmail_account import GmailAccount

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build


def save_gmail_account(
    db: Session,
    email: str,
    access_token: str,
    refresh_token: str
):
    account = GmailAccount(
        email=email,
        access_token=access_token,
        refresh_token=refresh_token
    )

    db.add(account)
    db.commit()
    db.refresh(account)

    return account


def get_first_account(db: Session):
    return db.query(
        GmailAccount
    ).first()


def get_gmail_profile(db: Session):

    account = get_first_account(db)

    creds = Credentials(
        token=account.access_token
    )

    service = build(
        "gmail",
        "v1",
        credentials=creds
    )

    profile = (
        service.users()
        .getProfile(userId="me")
        .execute()
    )

    return profile