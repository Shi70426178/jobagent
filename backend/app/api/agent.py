from fastapi import APIRouter
# from app.services.agent_service import search_jobs
# from app.services.agent_service import scrape_wellfound
# from app.services.agent_service import search_jobs
from app.services.agent_service import search_jobs
from sqlalchemy import func
from app.models.job_keyword import JobKeyword
from app.services.hackernews_service import get_hackernews_leads
from sqlalchemy.orm import Session
from app.models.agent_search import AgentSearch
from fastapi import Depends
from app.models.user import User
from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.services.job_service import save_jobs
from app.models.resume import Resume
from app.services.gmail_service import get_user_account
from pydantic import BaseModel
class AgentRequest(BaseModel):
    keywords: str | None = None
    location: str | None = None
    page: int = 1
    page_size: int = 5
    search_id: int | None = None
    
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
    

    if data.search_id is not None:

        search = (
            db.query(AgentSearch)
            .filter(
                AgentSearch.id == data.search_id,
                AgentSearch.user_id == current_user.id
            )
            .first()
        )

        if not search:
            return {
                "success": False,
                "message": "Search session not found."
            }

    else:

        search = AgentSearch(
            user_id=current_user.id,
            keywords=data.keywords,
            location=data.location
        )

        db.add(search)
        db.commit()
        db.refresh(search)

    if data.page > search.last_scraped_page:

        result = search_jobs(
            db=db,
            user_id=current_user.id,
            search_id=search.id,
            keywords=search.keywords,
            location=search.location,
            page=data.page,
            page_size=data.page_size
        )

        search.total_jobs = result["total"]
        search.last_scraped_page = data.page
        db.commit()

    else:

        result = {
            "jobs": [],
            "total": search.total_jobs
        }

    jobs = result["jobs"]

    # search_jobs(
    #     db,
    #     current_user.id,
    #     data.keywords,
    #     data.location
    # )



    return {
        "success": True,
        "message": f"{result['total']} jobs found.",
        "jobs_found": result["total"],
        "search_id": search.id
    }

@router.get("/searches")
def get_searches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    searches = (
        db.query(AgentSearch)
        .filter(AgentSearch.user_id == current_user.id)
        .order_by(AgentSearch.created_at.desc())
        .all()
    )

    return searches
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
            "value": row.search_value,    
            "label": row.keyword,        
        }
        for row in keywords
    ]

