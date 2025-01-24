const { test, expect } = require('@playwright/test');

test.only('basic test', async ({ page }) => {
    // const productName = 'IPHONE 13 PRO';
    const productNames = ['IPHONE 13 PRO', 'Banarsi Saree', 'qwerty'];
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
        // await page.pause();
        const productToAdd = await products.nth(i).locator('b').textContent();
        if(productNames.includes(productToAdd)){
            // await products.nth(i).locator('.btn.w-10.rounded').click();
            await products.nth(i).locator('text=Add To Cart').click();
            const toast = page.locator('.ng-trigger-flyInOut');
            await toast.waitFor();
            await toast.waitFor({ state: 'hidden' });
            // break;
        }
    }
    // await page.pause();
    await page.locator('[routerlink$="/dashboard/cart"]').click();

    const cartProd = page.locator('.cartSection h3');
    await cartProd.first().waitFor();
    const cartCount = await cartProd.count();
    for (let i = 0; i < cartCount; i++) {
        const product = await cartProd.nth(i).textContent();
        await expect(productNames).toContain(product);
    }

    await page.locator('.totalRow .btn.btn-primary').click();
    await page.locator('[placeholder="Select Country"]').pressSequentially ('India');
    const dropdown = await page.locator('.ta-results');
    await dropdown.waitFor();
    await page.pause();
    const options = await dropdown.locator('button');
    const optionsCount = await options.count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await options.nth(i).textContent();
        if (text=== ' India') {
            await options.nth(i).click();
            break;
        }
    }
    await page.locator('text=Place Order').click();
    const success = page.locator('.hero-primary');
    expect(await success.textContent()).toContain('Thankyou for the order.');
});