const { test, expect } = require('@playwright/test');   
const { assert } = require('console');

// test('Browser Playwright Test', async({browser}) =>
//     {
//         //chrome
//         const context = await browser.newContext();
//         const page = await context.newPage();
//         await page.goto('https://google.com/');
//     });

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


    test('UI Control Test', async({page}) =>
        {
            await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
            //get title of page and assert
            console.log(await page.title());
            await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    
            const username = page.locator('#username');
            const signIn = page.locator('[name="signin"]');
            const documentLink = page.locator('[href*="rahulshetty"]')
            await username.fill('rahulshettyacademy');
            await page.locator('[id="password"]').fill('learning');

            const dropdown = page.locator('select.form-control');
            await dropdown.selectOption('consult');
            await page.locator('.radiotextsty').last().click();
            await page.locator('#okayBtn').click();
            await expect(page.locator('.radiotextsty').last()).toBeChecked();
            console.log(await page.locator('.radiotextsty').last().isChecked());
            await page.locator('#terms').check();
            await expect(page.locator('#terms')).toBeChecked();
            await page.locator('#terms').uncheck();
            // await expect(page.locator('#terms')).not.toBeChecked();
            expect(await page.locator('#terms').isChecked()).toBeFalsy();
            await expect(documentLink).toHaveAttribute('class', 'blinkingText');
            // await page.pause();
        });

        test('Child windows handle', async({browser}) =>
        {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
            const username = page.locator('#username');
            const documentLink = page.locator('[href*="rahulshetty"]');
            const [newPage] = await Promise.all([
                context.waitForEvent('page'),
                await documentLink.click()
            ]);

            await newPage.waitForLoadState('domcontentloaded');
            await newPage.locator('.red').waitFor();
            const text = await newPage.locator('.red').textContent();
            const arrayText = text.split("@");
            const domainName = arrayText[1].split(" ")[0];
            console.log(await domainName);
            
            await page.locator('#username').fill(domainName);
            await page.pause();

        });