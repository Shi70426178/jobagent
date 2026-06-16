from fastapi import APIRouter
from google_auth_oauthlib.flow import Flow
import os
from fastapi import APIRouter, Request
print("LOADING GMAIL FILE")
router = APIRouter()

SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly"
]

@router.get("/connect")
def connect_gmail():

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
        prompt="consent"
    )

    return {
        "auth_url": auth_url
    }

@router.get("/callback")
def gmail_callback(request: Request):
    code = request.query_params.get("code")

    return {
        "message": "Google returned code",
        "code": code
    }

@router.get("/hello")
def hello():
    return {"msg": "gmail loaded"}

@router.get("/callback")
def gmail_callback(request: Request):

    code = request.query_params.get("code")

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

    flow.fetch_token(code=code)

    credentials = flow.credentials

    return {
        "access_token": credentials.token,
        "refresh_token": credentials.refresh_token
    }

@router.get("/profile")
def gmail_profile():
    return {
        "message": "gmail profile endpoint created"
    }