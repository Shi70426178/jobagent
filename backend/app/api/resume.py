from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends
from app.models.resume import Resume

from sqlalchemy.orm import Session
from app.models.user import User
from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.services.resume_service import save_resume
from app.services.resume_parser import extract_resume_text
from app.services.resume_ai_service import extract_resume_data
import os

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_DIR = "uploads/resumes"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(
            await file.read()
        )

    # Debug
    print("\n========== FILE SAVED ==========")
    print("File Path:", file_path)
    print("File Exists:", os.path.exists(file_path))
    print("File Size:", os.path.getsize(file_path))

    text = extract_resume_text(file_path)

    # Debug
    print("\n========== RESUME TEXT ==========")
    print("Text Length:", len(text))
    print(text[:1000])

    data = extract_resume_data(text)

    # Debug
    print("\n========== EXTRACTED DATA ==========")
    print(data)

    resume = save_resume(
        db=db,
        user_id=current_user.id,
        file_path=file_path,
        name=data.get(
            "name",
            ""
        ),
        email=data.get(
            "email",
            ""
        ),
        phone=data.get(
            "phone",
            ""
        ),
        skills=",".join(
            data.get("skills", [])
        ),
        experience=data.get(
            "experience",
            ""
        ),
        education=data.get(
            "education",
            ""
        )
    )

    return {
        "message": "Resume uploaded",
        "resume_id": resume.id
    }

@router.get("/latest")
def latest_resume(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Resume)
        .filter(
            Resume.user_id == current_user.id
        )
        .order_by(Resume.id.desc())
        .first()
    )