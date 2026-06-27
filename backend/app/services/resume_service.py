from sqlalchemy.orm import Session
from app.models.resume import Resume


def save_resume(
    db: Session,
    user_id: int,
    file_path: str,
    name: str = "",
    email: str = "",
    phone: str = "",
    skills: str = "",
    experience: str = "",
    education: str = ""
):

    resume = Resume(
        user_id=user_id,
        file_path=file_path,
        name=name,
        email=email,
        phone=phone,
        skills=skills,
        experience=experience,
        education=education
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume