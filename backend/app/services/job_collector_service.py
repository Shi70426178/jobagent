from app.services.linkedin_service import collect_jobs_from_linkedin
from app.services.job_service import save_jobs


def collect_jobs(db, keyword):

    print(f"Collecting jobs for: {keyword}")

    jobs = collect_jobs_from_linkedin(keyword)

    if not jobs:
        print("No jobs found.")
        return 0

    count = save_jobs(db, jobs)

    print(f"{count} new jobs saved.")

    return count