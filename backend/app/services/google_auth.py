from google.oauth2 import id_token
from google.auth.transport import requests
from fastapi import HTTPException
import os


GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
# print("GOOGLE_CLIENT_ID:", GOOGLE_CLIENT_ID)


def verify_google_token(token: str):
    try:
        user_info = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID,
        )

        return {
            "google_id": user_info["sub"],
            "email": user_info["email"],
            "name": user_info.get("name"),
            "picture": user_info.get("picture"),
            "email_verified": user_info.get("email_verified"),
        }

    except Exception as e:
        # print("Google verify error:", repr(e))
        raise HTTPException(
            status_code=401,
            detail=str(e),
        )