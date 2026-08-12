from fastapi import APIRouter, Request, Depends
from fastapi.responses import RedirectResponse

from sqlalchemy.orm import Session

from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google.oauth2 import id_token
from google.auth.transport.requests import Request as GoogleRequest
import os

from app.db.database import get_db

from app.models.user import User

from app.core.dependencies import get_current_user

from app.schemas.email import EmailRequest

from app.services.gmail_service import (
    save_gmail_account,
    send_test_email,
    get_user_account,
)

print("LOADING GMAIL FILE")

router = APIRouter()

SCOPES = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/gmail.send",
]

CODE_VERIFIER = None


@router.get("/connect")
def connect_gmail(
    current_user: User = Depends(get_current_user)
):

    global CODE_VERIFIER

    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": os.getenv(
                    "GOOGLE_CLIENT_ID"
                ),
                "client_secret": os.getenv(
                    "GOOGLE_CLIENT_SECRET"
                ),
                "auth_uri":
                    "https://accounts.google.com/o/oauth2/auth",
                "token_uri":
                    "https://oauth2.googleapis.com/token",
            }
        },
        scopes=SCOPES,
    )

    flow.redirect_uri = os.getenv(
        "GOOGLE_REDIRECT_URI"
    )

    auth_url, state = flow.authorization_url(
        access_type="offline",
        prompt="consent",
        include_granted_scopes="true",
        state=str(current_user.id),
    )

    CODE_VERIFIER = flow.code_verifier

    print("CODE VERIFIER SAVED")

    return {
        "auth_url": auth_url
    }


@router.get("/callback")
def gmail_callback(
    request: Request,
    db: Session = Depends(get_db),
):
    global CODE_VERIFIER

    print("CALLBACK START")

    frontend_url = os.getenv(
        "FRONTEND_URL",
        "http://localhost:3000"
    )

    try:
        code = request.query_params.get("code")
        state = request.query_params.get("state")
        error = request.query_params.get("error")

        # User cancelled Google OAuth
        if error:
            print("GOOGLE OAUTH ERROR:", error)

            return RedirectResponse(
                url=(
                    f"{frontend_url}/gmail"
                    f"?gmail_error=cancelled"
                )
            )

        if not code:
            print("NO AUTHORIZATION CODE")

            return RedirectResponse(
                url=(
                    f"{frontend_url}/gmail"
                    f"?gmail_error=connection_failed"
                )
            )

        if not state:
            print("NO STATE")

            return RedirectResponse(
                url=(
                    f"{frontend_url}/gmail"
                    f"?gmail_error=connection_failed"
                )
            )

        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": os.getenv(
                        "GOOGLE_CLIENT_ID"
                    ),
                    "client_secret": os.getenv(
                        "GOOGLE_CLIENT_SECRET"
                    ),
                    "auth_uri":
                        "https://accounts.google.com/o/oauth2/auth",
                    "token_uri":
                        "https://oauth2.googleapis.com/token",
                }
            },
            scopes=SCOPES,
        )

        flow.redirect_uri = os.getenv(
            "GOOGLE_REDIRECT_URI"
        )

        flow.code_verifier = CODE_VERIFIER

        flow.fetch_token(
            code=code
        )

        credentials = flow.credentials

        print("TOKEN FETCHED")

        if not credentials.id_token:
            print("NO ID TOKEN")

            return RedirectResponse(
                url=(
                    f"{frontend_url}/gmail"
                    f"?gmail_error=connection_failed"
                )
            )

        id_info = id_token.verify_oauth2_token(
            credentials.id_token,
            GoogleRequest(),
            os.getenv("GOOGLE_CLIENT_ID")
        )

        email = id_info["email"]

        user_id = int(state)

        print("USER ID:", user_id)
        print("EMAIL:", email)

        save_gmail_account(
            db=db,
            user_id=user_id,
            email=email,
            access_token=credentials.token,
            refresh_token=credentials.refresh_token,
        )

        print("GMAIL ACCOUNT SAVED")

        return RedirectResponse(
            url=f"{frontend_url}/gmail"
        )

    except Exception as e:

        print("GMAIL CALLBACK ERROR:", repr(e))

        # Rollback DB transaction if something failed
        try:
            db.rollback()
        except Exception:
            pass

        return RedirectResponse(
            url=(
                f"{frontend_url}/gmail"
                f"?gmail_error=connection_failed"
            )
        )
@router.get("/profile")
def gmail_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    account = get_user_account(
        db,
        current_user.id
    )

    if not account:
        return {
            "connected": False
        }

    return {
        "connected": True,
        "emailAddress": account.email
    }
@router.get("/hello")
def hello():

    return {
        "msg": "gmail loaded"
    }


@router.post("/send-test")
def send_test(
    request: EmailRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    try:

        result = send_test_email(
            db=db,
            user_id=current_user.id,
            to_email=request.to,
            subject=request.subject,
            body=request.body
        )

        return {
            "success": True,
            "message": "Email sent successfully.",
            "gmail_response": result
        }

    except Exception as e:

        print("SEND TEST ERROR:", e)

        return {
            "success": False,
            "message": str(e)
        }


@router.get("/accounts")
def get_accounts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    account = get_user_account(
        db,
        current_user.id
    )

    if not account:

        return {
            "connected": False,
            "accounts": []
        }

    return {
        "connected": True,
        "accounts": [
            {
                "email": account.email
            }
        ]
    }

@router.delete("/disconnect")
def disconnect_gmail(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    from app.services.gmail_service import disconnect_gmail_account

    disconnect_gmail_account(
        db=db,
        user_id=current_user.id
    )

    return {
        "success": True
    }