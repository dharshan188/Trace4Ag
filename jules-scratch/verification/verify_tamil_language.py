from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the homepage
        page.goto("http://127.0.0.1:8080/")

        # Click the Tamil language button
        tamil_button = page.get_by_role("button", name="தமிழ்")
        expect(tamil_button).to_be_visible()
        tamil_button.click()

        # Verify that the page has been translated
        # We'll check for the translated "Get Started" button text
        get_started_button_tamil = page.get_by_text("தொடங்கவும்")
        expect(get_started_button_tamil).to_be_visible()

        # Take a screenshot for visual confirmation
        page.screenshot(path="jules-scratch/verification/tamil_verification.png", full_page=True)

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)