const { test, expect } = require('@playwright/test');

test('Validation and Alerts', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack();
    // await page.goForward();
    // await page.reload();
    // page.on('dialog', dialog => {dialog.accept();});
    page.on('dialog', dialog => {
        console.log(dialog.message());
        dialog.accept();
    });
    await page.locator('#alertbtn').click();
    await page.locator('#mousehover').hover();
    await page.getByText('Reload').click();

    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator('li a[href*="lifetime-access"]:visible').click();
    console.log(await framePage.locator('h2 span').textContent());
});

test('Screenshots', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({ path: 'item.png' });
    await page.locator('#hide-textbox').click();
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator('#displayed-text')).toBeHidden();
});

test('Visual Comparision', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    expect(await page.screenshot()).toMatchSnapshot('Match.png');
});