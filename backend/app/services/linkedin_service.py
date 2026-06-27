from playwright.sync_api import sync_playwright

from app.services.linkedin_db_service import save_post
from app.services.openai_service import extract_job_details
from app.models.resume import Resume
from app.services.job_match_service import calculate_match
from app.services.email_generator_service import generate_email
from urllib.parse import quote
SESSION_FILE = "linkedin.json"


def split_posts(body_text):
    return body_text.split("Feed post")


def is_hiring_post(text):

    keywords = [
        "hiring",
        "job",
        "developer",
        "engineer",
        "recruiter",
        "vacancy",
        "opening",
        "python",
        "java",
        "react"
    ]

    text = text.lower()

    return any(
        keyword in text
        for keyword in keywords
    )


def open_linkedin(
    db,
    user_id,
    keywords
):

    with sync_playwright() as p:

        browser = p.chromium.launch(
            headless=True
        )

        context = browser.new_context(
            storage_state=SESSION_FILE
        )

        page = context.new_page()

        search_url = (
            "https://www.linkedin.com/search/results/content/?keywords="
            + quote(keywords)
        )

        print("Searching:", keywords)

        page.goto(search_url)

        page.wait_for_timeout(10000)

        print("\n========== PAGE TITLE ==========")
        print(page.title())

        print("\n========== CURRENT URL ==========")
        print(page.url)

        try:

            body = page.locator("body").inner_text()

            posts = split_posts(body)

            print(f"\nPosts Found: {len(posts)}")

            for post in posts:

                if not is_hiring_post(post):
                    continue

                print("\n========== HIRING POST ==========")
                print(post[:1000])

                try:

                    job_data = extract_job_details(post)
                    if not job_data.get("email"):
                        print("Skipped - No email found")
                        continue

                    if not job_data.get("is_job_post"):
                        continue

                    resume = (
                        db.query(Resume)
                        .filter(
                            Resume.user_id == user_id
                        )
                        .order_by(Resume.id.desc())
                        .first()
                    )

                    match = {
                        "score": 0,
                        "reason": "No resume found"
                    }

                    email_text = ""

                    if resume:

                        match = calculate_match(
                            resume.skills,
                            resume.experience,
                            post
                        )

                        if match["score"] >= 5:

                            email_text = generate_email(
                                resume=resume,
                                job_title=job_data.get("job_title", ""),
                                company=job_data.get("company", ""),
                                post_text=post
                            )

                    print(
                        f"Match Score: {match['score']}"
                    )

                    print(
                        f"Reason: {match['reason']}"
                    )

                    save_post(
                        db=db,
                        user_id=user_id,
                        recruiter_name=job_data.get(
                            "recruiter",
                            ""
                        ),
                        company=job_data.get(
                            "company",
                            ""
                        ),
                        email=job_data.get(
                            "email",
                            ""
                        ),
                        job_title=job_data.get(
                            "job_title",
                            ""
                        ),
                        post_text=post,
                        match_score=match["score"],
                        match_reason=match["reason"],
                        generated_email=email_text
                    )

                    print(
                        "Saved to database"
                    )

                except Exception as e:
                    print(
                        "OPENAI ERROR:",
                        e
                    )

        except Exception as e:
            print(
                "ERROR:",
                e
            )

        browser.close()