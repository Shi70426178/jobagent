from fastapi import APIRouter
# from app.services.agent_service import search_jobs
# from app.services.agent_service import scrape_wellfound
from app.services.agent_service import search_jobs
from app.services.hackernews_service import get_hackernews_leads
from sqlalchemy.orm import Session
from fastapi import Depends
from app.models.user import User
from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.services.job_service import save_jobs
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
    
    
    search_jobs(
        db,
        current_user.id,
        data.keywords
    )

    return {
        "success": True,
        "message": "LinkedIn search completed"
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