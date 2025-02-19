const { test, expect } = require('@playwright/test');

test('Playwright Special Locators', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill('Sameerking');
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').waitFor();
    await page.getByRole('link', {name: 'Shop'}).click();
    // await page.locator('div h1:has-text("Your Orders")').waitFor();
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button', {name: 'Add'}).click();

});

