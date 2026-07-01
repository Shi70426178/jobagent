from sqlalchemy.orm import Session
from app.models.resume import Resume
import os


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

    # Check if the user already has a resume
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .first()
    )

    if resume:
        # Delete old resume file if it exists
        if (
            resume.file_path
            and os.path.exists(resume.file_path)
            and resume.file_path != file_path
        ):
            os.remove(resume.file_path)

        # Update existing resume
        resume.file_path = file_path
        resume.name = name
        resume.email = email
        resume.phone = phone
        resume.skills = skills
        resume.experience = experience
        resume.education = education

    else:
        # Create new resume
        resume = Resume(
            user_id=user_id,
            file_path=file_path,
            name=name,
            email=email,
            phone=phone,
            skills=skills,
            experience=experience,
            education=education,
        )

        db.add(resume)

    db.commit()
    db.refresh(resume)

    return resume