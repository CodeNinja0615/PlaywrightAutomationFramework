const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    const title = await page.title();
    await page.fill('#userEmail', 'akhtarsameer743@gmail.com');
    await page.fill('#userPassword', 'Sameerking01!');
    await page.click('input#login');
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
});