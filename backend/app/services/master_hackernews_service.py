import re
import requests
import time

from app.services.master_hackernews_db_service import save_master_job


def fetch_master_hackernews_jobs(db):

    user = requests.get(
        "https://hacker-news.firebaseio.com/v0/user/whoishiring.json"
    ).json()

    latest_thread = user["submitted"][0]

    thread = requests.get(
        f"https://hacker-news.firebaseio.com/v0/item/{latest_thread}.json"
    ).json()

    comments = thread.get("kids", [])

    added = 0
    skipped = 0

    print(f"Total comments: {len(comments)}")

    for i, comment_id in enumerate(comments, start=1):

        print(f"{i}/{len(comments)}")

        try:

            comment = requests.get(
                f"https://hacker-news.firebaseio.com/v0/item/{comment_id}.json",
                timeout=15,
            ).json()

        except Exception:

            continue

        text = comment.get("text", "")

        emails = re.findall(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            text,
        )

        if not emails:
            skipped += 1
            continue

        email = emails[0]

        first_line = text.split("<p>")[0]

        parts = first_line.split("|")

        company = ""
        job_title = ""

        if len(parts) >= 2:

            company = parts[0].strip()

            job_title = parts[1].strip()

        job = save_master_job(

            db=db,

            comment_id=comment_id,

            company=company,

            job_title=job_title,

            email=email,

            source_url=f"https://news.ycombinator.com/item?id={comment_id}",

            raw_text=text,
        )

        if job:
            added += 1

        time.sleep(0.1)

    return {

        "added": added,

        "skipped": skipped,

        "total": len(comments),
    }