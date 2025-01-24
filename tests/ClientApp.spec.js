const { test, expect } = require('@playwright/test');

test.only('basic test', async ({ page }) => {
    const productName = 'IPHONE 13 PRO';
    await page.goto('https://rahulshettyacademy.com/client/');
    const products = page.locator('.card-body');
    const title = await page.title();
    await page.fill('#userEmail', 'akhtarsameer743@gmail.com');
    await page.fill('#userPassword', 'Sameerking01!');
    await page.click('input#login');
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count = await products.count();
    //iterate through the products
    for (let i = 0; i < count; i++) {
        const productToAdd = await products.nth(i).locator('b').textContent();
        if(productToAdd === productName) {
            await products.nth(i).locator('.btn.w-10.rounded').click();
            break;
        }
    }
    const toast = page.locator('.ng-trigger-flyInOut');
    await toast.waitFor();
    await toast.waitFor({ state: 'hidden' });
});