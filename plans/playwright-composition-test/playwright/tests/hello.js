import {
    expect
} from '@playwright/test';

import {
    runBrowserFn
} from "../api/run";

export default async (runenv, client) => {
    await runBrowserFn(async (browser) => {
        const page = await browser.newPage();

        // TODO: ensure to wait for express.js server to be ready :)

        runenv.recordMessage('playwright: visiting on new page: ' + url);
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
        });

        await expect(page).toHaveTitle(/Playwright Tester/);

        runenv.recordMessage('playwright: asserting message is available on page...');

        const locator = page.locator('div[id="greeting"]');
        await expect(locator).toHaveText(/Hello world/);

        runenv.recordMessage('playwright: hello test complete :)');
    }, {
        browser: 'firefox'
    });
}