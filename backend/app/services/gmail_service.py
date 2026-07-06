from sqlalchemy.orm import Session

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

from app.models.gmail_account import GmailAccount

import base64
import os


def save_gmail_account(
    db: Session,
    user_id: int,
    email: str,
    access_token: str,
    refresh_token: str
):

    account = (
        db.query(GmailAccount)
        .filter(
            GmailAccount.user_id == user_id
        )
        .first()
    )

    if account:

        account.email = email
        account.access_token = access_token

        if refresh_token:
            account.refresh_token = refresh_token

        db.commit()
        db.refresh(account)

        return account

    account = GmailAccount(
        user_id=user_id,
        email=email,
        access_token=access_token,
        refresh_token=refresh_token
    )

    db.add(account)

    db.commit()

    db.refresh(account)

    return account


def get_user_account(
    db: Session,
    user_id: int
):

    return (
        db.query(GmailAccount)
        .filter(
            GmailAccount.user_id == user_id
        )
        .first()
    )


def send_test_email(
    db: Session,
    user_id: int,
    to_email: str,
    subject: str,
    body: str,
    attachment_path: str = None
):

    account = get_user_account(
        db,
        user_id
    )

    if not account:
        raise Exception(
            "Gmail account not connected."
        )

    creds = Credentials(
        token=account.access_token,
        refresh_token=account.refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET")
    )

    service = build(
        "gmail",
        "v1",
        credentials=creds
    )

    message = MIMEMultipart()

    message["to"] = to_email
    message["subject"] = subject

    message.attach(
        MIMEText(
            body,
            "plain"
        )
    )

    if (
        attachment_path
        and os.path.exists(
            attachment_path
        )
    ):

        with open(
            attachment_path,
            "rb"
        ) as file:

            part = MIMEBase(
                "application",
                "octet-stream"
            )

            part.set_payload(
                file.read()
            )

        encoders.encode_base64(
            part
        )

        part.add_header(
            "Content-Disposition",
            f'attachment; filename="{os.path.basename(attachment_path)}"',
        )

        message.attach(
            part
        )

    raw = (
        base64.urlsafe_b64encode(
            message.as_bytes()
        ).decode()
    )

    result = (
        service.users()
        .messages()
        .send(
            userId="me",
            body={
                "raw": raw
            }
        )
        .execute()
    )

    return result