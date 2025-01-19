const { test, expect } = require('@playwright/test');   

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
    });