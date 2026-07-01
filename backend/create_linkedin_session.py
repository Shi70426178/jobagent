import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)

        context = await browser.new_context()

        page = await context.new_page()
        await page.goto("https://www.linkedin.com/login")

        input("Login to your NEW LinkedIn account, then press Enter...")

        await context.storage_state(path="linkedin.json")

        print("linkedin.json created successfully!")

        await browser.close()

asyncio.run(main())