from app.services.linkedin_service import open_linkedin

def search_jobs(
    db,
    user_id,
    keywords
):
    open_linkedin(
        db,
        user_id,
        keywords
    )

    return True