from app.db.database import SessionLocal
from app.services.scheduler_service import run_scheduler

db = SessionLocal()

try:
    print("Starting LinkedIn Scheduler...")
    run_scheduler(db)
    print("Scheduler Completed.")
finally:
    db.close()