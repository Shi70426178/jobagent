from app.services.scheduler_keyword_service import (
    get_next_keyword,
    mark_completed
)
from app.services.linkedin_scheduler_service import collect_jobs

def run_scheduler(db):

    keyword = get_next_keyword(db)

    if not keyword:
        print("No keywords found")
        return

    print(f"Running keyword: {keyword.keyword}")

    collect_jobs(
        db,
        keyword.keyword
    )

    mark_completed(
        db,
        keyword
    )