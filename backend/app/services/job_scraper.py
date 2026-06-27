from playwright.sync_api import sync_playwright


def scrape_remoteok():

    jobs = []

    with sync_playwright() as p:

        browser = p.chromium.launch(
            headless=False
        )

        page = browser.new_page()

        page.goto(
            "https://remoteok.com/remote-python-jobs",
            wait_until="networkidle"
        )

        page.wait_for_timeout(3000)

        rows = page.locator("tr.job")

        count = min(rows.count(), 10)

        for i in range(count):

            row = rows.nth(i)

            try:
                title = row.locator(
                    "h2"
                ).inner_text()

                company = row.locator(
                    "h3"
                ).inner_text()

                jobs.append(
                    {
                        "company": company,
                        "title": title,
                        "location": "Remote",
                        "source": "RemoteOK"
                    }
                )

            except:
                pass

        browser.close()

    return jobs