import requests
import re
import time
from app.services.hackernews_db_service import save_hackernews_post
from app.models.resume import Resume
from app.services.job_match_service import calculate_match
from app.services.email_generator_service import generate_email


def get_hackernews_leads(db, user_id):

    user = requests.get(
        "https://hacker-news.firebaseio.com/v0/user/whoishiring.json"
    ).json()

    latest_id = user["submitted"][0]

    thread = requests.get(
        f"https://hacker-news.firebaseio.com/v0/item/{latest_id}.json"
    ).json()

    comments = thread.get("kids", [])
    print(f"Total comments found: {len(comments)}")

    leads = []

    MAX_COMMENTS = 100

    for i, comment_id in enumerate(comments[:MAX_COMMENTS], start=1):

        print(f"Processing {i}/{len(comments)} - {comment_id}")

        url = f"https://hacker-news.firebaseio.com/v0/item/{comment_id}.json"

        try:
            response = requests.get(
                url,
                timeout=15,
            )

            response.raise_for_status()

            comment = response.json()

        except requests.exceptions.RequestException as e:
            print(f"Skipping {comment_id}: {e}")

            time.sleep(1)

            continue

        text = comment.get("text", "")

        emails = re.findall(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            text,
        )

        if not emails:
            continue

        email = emails[0]

        source_url = (
            f"https://news.ycombinator.com/item?id={comment_id}"
        )

        summary = text[:500]

        # Extract company and job title
        first_line = text.split("<p>")[0]
        parts = first_line.split("|")

        company = ""
        job_title = ""

        if len(parts) >= 2:
            company = parts[0].strip()
            job_title = parts[1].strip()

        # Get latest resume
        resume = (
            db.query(Resume)
            .filter(Resume.user_id == user_id)
            .order_by(Resume.id.desc())
            .first()
        )

        match = {
            "score": 0,
            "reason": "No resume found",
        }

        generated_email = ""

        if resume:

            match = calculate_match(
                resume.skills,
                resume.experience,
                summary,
            )

            if match["score"] >= 95:
                print(f"Generating email for {company}")

                generated_email = generate_email(
                    resume,
                    job_title,
                    company,
                    summary,
                )

        save_hackernews_post(

            db=db,

            user_id=user_id,

            comment_id=comment_id,

            company=company,

            job_title=job_title,

            email=email,

            source_url=source_url,

            summary=summary,

            match_score=match["score"],

            match_reason=match["reason"],

            generated_email=generated_email,
        )

        leads.append(
            {
                "comment_id": comment_id,
                "company": company,
                "job_title": job_title,
                "email": email,
                "source": "hackernews",
                "source_url": source_url,
                "summary": summary,
                "match_score": match["score"],
                "generated_email": generated_email,
            }
        )

    return leads