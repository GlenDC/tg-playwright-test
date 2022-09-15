import {
    expect
} from '@playwright/test';

import {
    runBrowserFn
} from "../api/run";

export default async (runenv, client) => {
    try {
        await runBrowserFn(async (browser) => {
            const page = await browser.newPage();

            const b = await client.barrier('server-ready', 1);
            await b.wait;

            // TODO: pass correct URL...
            const url = '127.0.0.1:8080';

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
    } finally {
        await client.signalEntry('test-ready');
    }
}