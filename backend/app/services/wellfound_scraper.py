from playwright.sync_api import sync_playwright

def scrape_wellfound():

    with sync_playwright() as p:

        browser = p.chromium.launch(
            headless=False
        )

        page = browser.new_page()

        page.goto(
            "https://wellfound.com/jobs",
            wait_until="networkidle"
        )

        page.wait_for_timeout(10000)

        browser.close()

    return []