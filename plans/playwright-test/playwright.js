import { chromium } from 'playwright';
import { expect } from '@playwright/test';

export async function runPlaywrightTest (runenv, client, url) {
    let browser;

    try {
        runenv.recordMessage('playwright: launching chromium and opening new page');
        browser = await chromium.launch();
        const page = await browser.newPage();

        runenv.recordMessage('playwright: visiting on new page: ' + url);
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
        });

        await expect(page).toHaveTitle(/Playwright Tester/);

        runenv.recordMessage('playwright: asserting message is available on page...');

        const locator = page.locator('div[id="greeting"]');
        await expect(locator).toHaveText(/Hello world/);
    } finally {
        if (browser) {
            browser.close();
        }
    }
}
