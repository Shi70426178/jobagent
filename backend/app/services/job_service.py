from sqlalchemy.orm import Session
from app.models.job import Job

def save_jobs(db: Session, jobs: list):

    new_count = 0

    for job in jobs:

        existing = (
            db.query(Job)
            .filter(
                Job.company == job["company"],
                Job.title == job["title"]
            )
            .first()
        )

        if existing:
            continue

        db_job = Job(
            company=job["company"],
            title=job["title"],
            location=job["location"],
            source=job["source"],
            url=job["url"],
            description=""
)

        db.add(db_job)

        new_count += 1

    db.commit()

    return new_count