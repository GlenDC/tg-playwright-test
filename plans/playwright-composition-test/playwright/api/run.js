import {
    chromium,
    firefox
} from 'playwright';

export async function runBrowserFn(fn, opts) {
    const browserName = opts && opts.browser;
    let browser;
    if (browserName == 'firefox') {
        browser = await firefox.launch();
    } else {
        browser = await chromium.launch();
    }
    try {
        await fn(browser);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}