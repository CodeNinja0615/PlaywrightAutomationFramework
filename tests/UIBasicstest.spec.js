const { test, expect } = require('@playwright/test');   
const { assert } = require('console');

test('Browser Playwright Test', async({browser}) =>
    {
        //chrome
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://google.com/');
    });

test('Page Playwright Test', async({page}) =>
    {
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        //get title of page and assert
        console.log(await page.title());
        await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

        const username = page.locator('#username');
        const signIn = page.locator('[name="signin"]');
        const cartTitles = page.locator('.card-body a');

        await username.fill('rahulshettyacadem');
        await page.locator('[id="password"]').fill('learning');
        await signIn.click();
        const error = page.locator('[style*="block"]');
        console.log(await error.textContent());
        await expect(error).toContainText('Incorrect');

        await username.fill('rahulshettyacademy');
        await signIn.click();

        await expect(page.locator('.navbar-brand').nth(0)).toContainText('ProtoCommerce');
        console.log(await cartTitles.nth(0).textContent());

        const allTitles = await cartTitles.allTextContents();
        console.log(allTitles);

    });