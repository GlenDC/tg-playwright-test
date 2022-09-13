// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  const address = process.env.EXPRESS_SERVER_ADDRESS || '127.0.0.1:3001';
  await page.goto(`http://${address}`);
});

test.describe('Basic Playwright Express Test', () => {
  test('express sever should greet me', async ({ page }) => {
    await expect(page.locator('[id="greeting"]')).toContainText('Hello world');
  });
});

// test.afterEach(async ({}, testInfo) => {
//   if (testInfo.status === 'passed') {
//     testInfo['']
//   } else {
//   }
// });
