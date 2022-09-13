const { chromium } = require('playwright');
const { expect } = require('playwright-test');

export async function runPlaywrightTest (runenv, client, url) {
    let browser;

    try {
        runenv.recordMessage('playwright: launching chromium and opening new page');
        browser = await chromium.launch();
        const page = await browser.newPage();

        runenv.recordMessage('playwright: visiting on new page: ' + url);
        await page.goto(url);

        runenv.recordMessage('playwright: asserting message is available on page...');
        expect(page.locator('[id="greeting"]')).toContainText('Hello world');
    } finally {
        if (browser) {
            browser.close();
        }
    }
}
