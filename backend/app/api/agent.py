from fastapi import APIRouter
# from app.services.agent_service import search_jobs
# from app.services.agent_service import scrape_wellfound
from app.services.agent_service import search_jobs
from sqlalchemy import func
from app.models.job_keyword import JobKeyword
from app.services.hackernews_service import get_hackernews_leads
from sqlalchemy.orm import Session
from fastapi import Depends
from app.models.user import User
from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.services.job_service import save_jobs
from app.models.resume import Resume
from app.services.gmail_service import get_user_account
from pydantic import BaseModel
class AgentRequest(BaseModel):
    keywords: str
    location: str
    
router = APIRouter()
@router.post("/start")
def start_agent(
    data: AgentRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        return {
            "success": False,
            "resume_uploaded": False,
            "message": "Please upload your resume first."
        }
    
    print("================================")
    print("Keyword received:", repr(data.keywords))
    print("Location received:", repr(data.location))
    print("================================")

    search_jobs(
        db,
        current_user.id,
        data.keywords,
        data.location
    )

    # search_jobs(
    #     db,
    #     current_user.id,
    #     data.keywords,
    #     data.location
    # )



    return {
        "success": True,
        "message": "Job search completed"
    }

@router.get("/hn-test")
def hn_test(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    leads = get_hackernews_leads(
        db,
        current_user.id
    )

    return {
        "count": len(leads)
    }
@router.get("/hn-emails")
def hn_emails(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    leads = get_hackernews_leads(
        db,
        current_user.id
    )

    return {
        "count": len(leads),
        "leads": leads
    }

@router.get("/keywords")
def get_keywords(db: Session = Depends(get_db)):
    keywords = (
        db.query(JobKeyword)
        .order_by(JobKeyword.keyword)
        .all()
    )

    return [
        {
            "value": row.search_value,   # <-- send search value
            "label": row.keyword,        # <-- show label
        }
        for row in keywords
    ]