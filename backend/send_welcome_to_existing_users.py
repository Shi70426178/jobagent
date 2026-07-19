from app.db.database import SessionLocal
from app.models.user import User
from app.services.email_service import send_welcome_email

db = SessionLocal()

try:
    users = db.query(User).all()

    print(f"Found {len(users)} users")

    for user in users:
        try:
            send_welcome_email(
                user.email,
                user.full_name or "there"
            )
            print(f"✅ Sent to {user.email}")
        except Exception as e:
            print(f"❌ Failed for {user.email}: {e}")

finally:
    db.close()