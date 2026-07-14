from playwright.sync_api import sync_playwright
from urllib.parse import quote

from app.services.openai_service import extract_job_details
from app.services.linkedin_job_db_service import save_job

SESSION_FILE = "linkedin.json"


# def split_posts(body_text):
#     return body_text.split("Feed post")


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
        "dotnet",
        "react",
    ]

    text = text.lower()

    return any(word in text for word in keywords)


def collect_jobs(
    db,
    keyword
):

    with sync_playwright() as p:

        browser = p.chromium.launch(headless=True)

        context = browser.new_context(
            storage_state=SESSION_FILE
        )

        page = context.new_page()

        url = (
            "https://www.linkedin.com/search/results/content/?keywords="
            + quote(keyword)
        )

        print(f"\nSearching: {keyword}")

        page.goto(
            url,
            wait_until="domcontentloaded",
            timeout=60000
         )

        page.wait_for_timeout(5000)
        print("\n========== LINKEDIN DEBUG ==========")
        print("Title:", page.title())
        print("URL:", page.url)
        print("===================================\n")

        if "checkpoint" in page.url:
            print("LinkedIn security verification detected.")
            browser.close()
            return

        page.wait_for_timeout(3000)
        
        page.screenshot(path="linkedin_debug.png", full_page=True)

        print("\n===== PAGE TITLE =====")
        print(page.title())

        print("\n===== CURRENT URL =====")
        print(page.url)

        print("\n===== BODY (First 5000 chars) =====")
        body = page.locator("body").inner_text()
        print(body[:5000])

        posts = body.split("Feed post")

        print(f"\nFound {len(posts)} posts")

        for text in posts:

            text = text.strip()

            if not text:
                continue

            if not is_hiring_post(text):
                continue

            try:

                job = extract_job_details(text)

                if not job.get("is_job_post"):
                    continue

                email = job.get("email", "").strip()

                # Skip jobs without a valid email
                if (
                    email == ""
                    or email.lower() in [
                        "n/a",
                        "na",
                        "none",
                        "null",
                        "not mentioned",
                        "not provided"
                    ]
                ):
                    print("Skipping job - no email found")
                    continue

                save_job(

                    db=db,

                    recruiter_name=job.get("recruiter", ""),

                    company=job.get("company", ""),

                    email=email,

                    job_title=job.get("job_title", ""),

                    department=job.get("department", ""),

                    industry=job.get("industry", ""),

                    location=job.get("location", ""),

                    posted_time=job.get("posted_time", ""),

                    experience=job.get("experience", ""),

                    employment_type=job.get("employment_type", ""),

                    salary=job.get("salary", ""),

                    skills=job.get("skills", []),

                    post_text=text,

                    linkedin_url="",

                    search_keyword=keyword
                )

                print(f"Saved: {job.get('company')} - {job.get('job_title')}")

            except Exception as e:
                print(e)
        browser.close()