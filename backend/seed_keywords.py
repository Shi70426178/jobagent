from app.db.database import SessionLocal
from app.models.scheduler_keyword import SchedulerKeyword

KEYWORDS = [
    "Python",
    "Java",
    "React",
    "Node.js",
    "HR",
    "Finance",
    "Accountant",
    "Sales",
    "Marketing",
    "Healthcare",
    "Teacher",
    "Construction",
    "Logistics",
    "Legal",
    "Business Analyst",
    "QA",
    "DevOps",
    "Data Scientist",
    "Flutter",
    "Android"
]

db = SessionLocal()

for keyword in KEYWORDS:

    exists = (
        db.query(SchedulerKeyword)
        .filter(
            SchedulerKeyword.keyword == keyword
        )
        .first()
    )

    if exists:
        continue

    db.add(
        SchedulerKeyword(
            keyword=keyword
        )
    )

db.commit()

print("Keywords inserted.")