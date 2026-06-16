from googleapiclient.discovery import build

def get_gmail_profile(credentials):
    service = build(
        "gmail",
        "v1",
        credentials=credentials
    )

    profile = (
        service.users()
        .getProfile(userId="me")
        .execute()
    )

    return profile