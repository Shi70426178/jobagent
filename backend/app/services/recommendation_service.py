import re
from typing import Optional

from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.resume import Resume
from app.models.linkedin_job import LinkedInJob
from app.models.linkedin_post import LinkedInPost

from app.services.job_match_service import calculate_matches


# =========================================================
# SKILL NORMALIZATION
# =========================================================

def normalize_skill(skill: str) -> str:
    if not skill:
        return ""

    skill = skill.lower().strip()

    replacements = {
        "react.js": "react",
        "reactjs": "react",
        "node.js": "node",
        "nodejs": "node",
        "next.js": "next",
        "nextjs": "next",
        "javascript (es6+)": "javascript",
        "python3": "python",
        "ms excel": "excel",
        "microsoft excel": "excel",
    }

    return replacements.get(skill, skill)


def extract_skills(skills_text: Optional[str]):
    if not skills_text:
        return []

    skills = []

    for skill in re.split(r"[,;\n|]+", skills_text):

        skill = normalize_skill(skill)

        if skill and skill not in skills:
            skills.append(skill)

    return skills


# =========================================================
# RESUME EXPERIENCE
# =========================================================

def parse_resume_experience(experience_text: Optional[str]) -> float:
    """
    Extract total years from the resume experience text.

    Examples:

    "5 years experience"       -> 5
    "5 Years"                  -> 5
    "2 years 6 months"         -> 2.5
    "6 months"                 -> 0.5
    """

    if not experience_text:
        return 0

    text = experience_text.lower()

    years = 0
    months = 0

    year_match = re.search(
        r"(\d+(?:\.\d+)?)\s*(?:years?|yrs?)",
        text
    )

    if year_match:
        years = float(year_match.group(1))

    month_match = re.search(
        r"(\d+(?:\.\d+)?)\s*(?:months?|mos?)",
        text
    )

    if month_match:
        months = float(month_match.group(1))

    return round(years + (months / 12), 2)


# =========================================================
# JOB EXPERIENCE
# =========================================================

def parse_job_experience(experience_text: Optional[str]):
    """
    Returns:

        min_years
        max_years
        known
        fresher
        all_experience
    """

    if not experience_text:
        return {
            "min_years": None,
            "max_years": None,
            "known": False,
            "fresher": False,
            "all_experience": False,
        }

    text = experience_text.lower().strip()

    # -----------------------------------------------------
    # Freshers & Experienced
    # -----------------------------------------------------

    if (
        "fresher" in text
        and "experienced" in text
    ):
        return {
            "min_years": 0,
            "max_years": None,
            "known": True,
            "fresher": True,
            "all_experience": True,
        }

    # -----------------------------------------------------
    # Fresher
    # -----------------------------------------------------

    if (
        "fresher" in text
        or "freshers" in text
        or "freshers welcome" in text
        or "freshers or students" in text
    ):
        return {
            "min_years": 0,
            "max_years": 1,
            "known": True,
            "fresher": True,
            "all_experience": False,
        }

    # -----------------------------------------------------
    # 10 Years Above
    # -----------------------------------------------------

    match = re.search(
        r"(\d+(?:\.\d+)?)\s*(?:years?|yrs?)\s*(?:above|and above)",
        text
    )

    if match:

        minimum = float(match.group(1))

        return {
            "min_years": minimum,
            "max_years": None,
            "known": True,
            "fresher": False,
            "all_experience": False,
        }

    # -----------------------------------------------------
    # 5-8 Years
    # 5–8+ Years
    # -----------------------------------------------------

    match = re.search(
        r"(\d+(?:\.\d+)?)\s*[-–—]\s*"
        r"(\d+(?:\.\d+)?)\s*\+?\s*"
        r"(?:years?|yrs?)",
        text
    )

    if match:

        minimum = float(match.group(1))
        maximum = float(match.group(2))

        return {
            "min_years": minimum,
            "max_years": maximum,
            "known": True,
            "fresher": minimum == 0,
            "all_experience": False,
        }

    # -----------------------------------------------------
    # 6 Months - 1 Year
    # -----------------------------------------------------

    match = re.search(
        r"(\d+)\s*months?\s*[-–—]\s*"
        r"(\d+(?:\.\d+)?)\s*(?:years?|yrs?)",
        text
    )

    if match:

        minimum = float(match.group(1)) / 12
        maximum = float(match.group(2))

        return {
            "min_years": minimum,
            "max_years": maximum,
            "known": True,
            "fresher": minimum == 0,
            "all_experience": False,
        }

    # -----------------------------------------------------
    # 2+ Years
    # 3rd+
    # 3+ Yrs
    # -----------------------------------------------------

    match = re.search(
        r"(\d+(?:\.\d+)?)\s*"
        r"(?:st|nd|rd|th)?\s*\+\s*"
        r"(?:years?|yrs?)?",
        text
    )

    if match:

        minimum = float(match.group(1))

        return {
            "min_years": minimum,
            "max_years": None,
            "known": True,
            "fresher": False,
            "all_experience": False,
        }

    # -----------------------------------------------------
    # Minimum 5 years
    # Minimum 6 years' experience
    # -----------------------------------------------------

    match = re.search(
        r"(?:minimum|min\.?|at least)\s+"
        r"(\d+(?:\.\d+)?)\s*"
        r"(?:years?|yrs?)",
        text
    )

    if match:

        minimum = float(match.group(1))

        return {
            "min_years": minimum,
            "max_years": None,
            "known": True,
            "fresher": False,
            "all_experience": False,
        }

    # -----------------------------------------------------
    # Plain number
    # Example: "5 Years"
    # -----------------------------------------------------

    match = re.search(
        r"(\d+(?:\.\d+)?)\s*(?:years?|yrs?)",
        text
    )

    if match:

        minimum = float(match.group(1))

        return {
            "min_years": minimum,
            "max_years": None,
            "known": True,
            "fresher": False,
            "all_experience": False,
        }

    # -----------------------------------------------------
    # Unknown
    #
    # Examples:
    # "Proven experience..."
    # "strong experience"
    # -----------------------------------------------------

    return {
        "min_years": None,
        "max_years": None,
        "known": False,
        "fresher": False,
        "all_experience": False,
    }


# =========================================================
# EXPERIENCE FILTER
# =========================================================

def is_experience_eligible(
    candidate_years: float,
    job_experience: Optional[str],
) -> bool:

    parsed = parse_job_experience(
        job_experience
    )

    # No numeric experience requirement.
    # Allow the job and let skill matching decide.
    if not parsed["known"]:
        return True

    # Freshers & Experienced
    if parsed["all_experience"]:
        return True

    minimum = parsed["min_years"]

    # -----------------------------------------------------
    # Fresher
    # -----------------------------------------------------

    if candidate_years <= 0:

        if parsed["fresher"]:
            return True

        if minimum is not None and minimum <= 0:
            return True

        return False

    # -----------------------------------------------------
    # Experienced candidate
    #
    # Candidate must satisfy minimum requirement.
    #
    # Example:
    # Candidate = 5
    # Job = 3-7
    #
    # 5 >= 3 -> eligible
    # -----------------------------------------------------

    if minimum is not None:
        return candidate_years >= minimum

    return True


# =========================================================
# POSTED TIME
# =========================================================

def get_posted_time(job):
    """
    Calculate human-readable posted time from scraped_at.
    """

    from datetime import datetime, timezone

    if not job.scraped_at:
        return job.posted_time or ""

    diff = (
        datetime.now(timezone.utc)
        - job.scraped_at
    )

    hours = int(
        diff.total_seconds() // 3600
    )

    if hours < 1:

        minutes = int(
            diff.total_seconds() // 60
        )

        return f"{minutes} mins ago"

    if hours < 24:
        return f"{hours} hrs ago"

    days = hours // 24

    return f"{days} days ago"


# =========================================================
# MAIN RECOMMENDATION FUNCTION
# =========================================================

def get_recommended_jobs(
    db: Session,
    user_id: int,
    page: int = 1,
    limit: int = 20,
):

    # -----------------------------------------------------
    # GET LATEST RESUME
    # -----------------------------------------------------

    resume = (
        db.query(Resume)
        .filter(
            Resume.user_id == user_id
        )
        .order_by(
            Resume.id.desc()
        )
        .first()
    )

    if not resume:

        return {
            "resume_found": False,
            "message": "Please upload your resume first.",
            "jobs": [],
            "total": 0,
            "page": page,
            "limit": limit,
            "total_pages": 0,
        }

    # -----------------------------------------------------
    # RESUME DATA
    # -----------------------------------------------------

    resume_skills = extract_skills(
        resume.skills
    )

    candidate_years = parse_resume_experience(
        resume.experience
    )

    print(
        "RECOMMENDATIONS:",
        "USER =", user_id,
        "EXPERIENCE =", candidate_years,
        "SKILLS =", resume_skills,
        flush=True
    )

    # -----------------------------------------------------
    # FIND JOBS WITH MATCHING SKILLS
    # -----------------------------------------------------

    query = (
        db.query(LinkedInJob)
    )

    if resume_skills:

        conditions = []

        for skill in resume_skills:

            conditions.append(
                LinkedInJob.skills.ilike(
                    f"%{skill}%"
                )
            )

        query = query.filter(
            or_(*conditions)
        )

    jobs = query.all()

    print(
        "Potential jobs found:",
        len(jobs),
        flush=True
    )

    # -----------------------------------------------------
    # EXPERIENCE FILTER
    # -----------------------------------------------------

    eligible_jobs = []

    for job in jobs:

        if not is_experience_eligible(
            candidate_years,
            job.experience
        ):
            continue

        eligible_jobs.append(job)

    print(
        "Experience eligible jobs:",
        len(eligible_jobs),
        flush=True
    )

    # -----------------------------------------------------
    # DON'T PROCESS JOBS ALREADY RECOMMENDED
    #
    # Recommendation posts have search_id = NULL.
    # -----------------------------------------------------

    saved_job_ids = {
        row[0]
        for row in (
            db.query(
                LinkedInPost.linkedin_job_id
            )
            .filter(
                LinkedInPost.user_id == user_id,
                LinkedInPost.search_id.is_(None),
                LinkedInPost.linkedin_job_id.isnot(None),
            )
            .all()
        )
    }

    new_jobs = [
        job
        for job in eligible_jobs
        if job.id not in saved_job_ids
    ]

    print(
        "New recommendation jobs:",
        len(new_jobs),
        flush=True
    )

    # -----------------------------------------------------
    # CALCULATE MATCHES
    #
    # Use the SAME matching service as Agent.
    # -----------------------------------------------------

    for batch_start in range(
        0,
        len(new_jobs),
        5
    ):

        batch = new_jobs[
            batch_start:batch_start + 5
        ]

        print(
            f"Recommendation matching batch "
            f"{batch_start + 1}-"
            f"{batch_start + len(batch)} "
            f"of {len(new_jobs)}",
            flush=True
        )

        matches = calculate_matches(
            skills=resume.skills,
            experience=resume.experience,
            jobs=batch
        )

        # -------------------------------------------------
        # SAVE RECOMMENDATIONS
        # -------------------------------------------------

        for job, match in zip(
            batch,
            matches
        ):

            posted_time = get_posted_time(
                job
            )

            existing = (
                db.query(LinkedInPost)
                .filter(
                    LinkedInPost.user_id == user_id,
                    LinkedInPost.search_id.is_(None),
                    LinkedInPost.linkedin_job_id == job.id
                )
                .first()
            )

            if existing:
                continue

            post = LinkedInPost(
                user_id=user_id,

                # This is NOT an Agent search.
                search_id=None,

                linkedin_job_id=job.id,

                recruiter_name=(
                    job.recruiter_name or ""
                ),

                company=(
                    job.company or ""
                ),

                email=(
                    job.email or ""
                ),

                job_title=(
                    job.job_title or ""
                ),

                location=(
                    job.location or ""
                ),

                posted_time=posted_time,

                experience=(
                    job.experience or ""
                ),

                skills=(
                    job.skills or ""
                ),

                post_text=(
                    job.post_text or ""
                ),

                linkedin_url=(
                    job.linkedin_url or ""
                ),

                match_score=int(
                    match.get("score", 0)
                ),

                match_reason=(
                    match.get("reason", "")
                ),

                generated_email="",

                status="new",
            )

            db.add(post)

        db.commit()

    # -----------------------------------------------------
    # GET SAVED RECOMMENDATION POSTS
    # -----------------------------------------------------

    recommendation_query = (
        db.query(LinkedInPost)
        .filter(
            LinkedInPost.user_id == user_id,
            LinkedInPost.search_id.is_(None),
        )
        .order_by(
            LinkedInPost.match_score.desc(),
            LinkedInPost.id.desc()
        )
    )

    total = recommendation_query.count()

    offset = (
        (page - 1) * limit
    )

    posts = (
        recommendation_query
        .offset(offset)
        .limit(limit)
        .all()
    )

    # -----------------------------------------------------
    # RESPONSE
    # -----------------------------------------------------

    result = []

    for post in posts:

        result.append({
            "id": post.id,

            "linkedin_job_id": (
                post.linkedin_job_id
            ),

            "job_title": post.job_title,

            "company": post.company,

            "location": post.location,

            "experience": post.experience,

            "skills": post.skills,

            "linkedin_url": (
                post.linkedin_url
            ),

            "source": "linkedin",

            "posted_time": post.posted_time,

            "employment_type": None,

            "salary": None,

            "match_score": (
                post.match_score or 0
            ),

            "match_reason": (
                post.match_reason or ""
            ),

            "matched_skills": [],

            "generated_email": (
                post.generated_email or ""
            ),

            "status": (
                post.status or "new"
            ),

            "email": post.email,
        })

    return {
        "resume_found": True,

        "candidate": {
            "experience_years": candidate_years,
            "skills": resume_skills,
        },

        "jobs": result,

        "total": total,

        "page": page,

        "limit": limit,

        "total_pages": (
            (total + limit - 1) // limit
            if total
            else 0
        ),
    }