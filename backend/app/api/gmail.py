from fastapi import APIRouter, Request
from google_auth_oauthlib.flow import Flow
import os
from sqlalchemy.orm import Session
from fastapi import Depends

from app.db.database import get_db
from app.services.gmail_service import (
    save_gmail_account,
    get_gmail_profile
)
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
# from app.services.gmail_service import save_gmail_account
print("LOADING GMAIL FILE")

router = APIRouter()

SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly"
]

# TEMPORARY FOR TESTING
# Later we'll store this in DB/session
CODE_VERIFIER = None


@router.get("/connect")
def connect_gmail():

    global CODE_VERIFIER

    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": os.getenv("GOOGLE_CLIENT_ID"),
                "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token"
            }
        },
        scopes=SCOPES
    )

    flow.redirect_uri = os.getenv(
        "GOOGLE_REDIRECT_URI"
    )

    auth_url, state = flow.authorization_url(
        access_type="offline",
        prompt="consent",
        include_granted_scopes="true"
    )

    CODE_VERIFIER = flow.code_verifier

    print("CODE VERIFIER SAVED")
    print(CODE_VERIFIER)

    return {
        "auth_url": auth_url
    }


@router.get("/callback")
def gmail_callback(
    request: Request,
    db: Session = Depends(get_db)
):

    global CODE_VERIFIER

    print("CALLBACK START")

    code = request.query_params.get("code")

    print("CODE:", code)

    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": os.getenv("GOOGLE_CLIENT_ID"),
                "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token"
            }
        },
        scopes=SCOPES
    )

    flow.redirect_uri = os.getenv(
        "GOOGLE_REDIRECT_URI"
    )

    # Restore verifier
    flow.code_verifier = CODE_VERIFIER

    print("USING VERIFIER")
    print(flow.code_verifier)

    flow.fetch_token(code=code)

    credentials = flow.credentials

    print("TOKEN FETCHED")
    print("ACCESS TOKEN:", credentials.token)
    print("REFRESH TOKEN:", credentials.refresh_token)

    creds = Credentials(
    token=credentials.token
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

    email = profile["emailAddress"]

    print("EMAIL:", email)

    save_gmail_account(
    db=db,
    email=email,
    access_token=credentials.token,
    refresh_token=credentials.refresh_token
)

    return {
        "success": True,
        "email": email
    }


@router.get("/profile")
def gmail_profile(
    db: Session = Depends(get_db)
):
    return get_gmail_profile(db)


@router.get("/hello")
def hello():
    return {
        "msg": "gmail loaded"
    }