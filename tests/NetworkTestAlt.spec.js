const { test, expect, request } = require('@playwright/test');
const { APIutils } = require('./utils/APIutils');

const loginPayload = { userEmail: "akhtarsameer743@gmail.com", userPassword: "Sameerking01!" }; // Define the login payload
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb" }] };
let response;
const fakePayloadOrder = { data: [], message: "No Orders" }; //----Fake reponse body
test.beforeAll(async () => {
    const apiContext = await request.newContext(); // Create a new context for API requests
    const apiUtils = new APIutils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload); //Don't forget await
});

test('Security test request intercept', async ({ page }) => {
    page.addInitScript(value => { // Add the token to the local storage
        window.localStorage.setItem('token', value); // Set the token in the local storage
    }, response.token); // Pass the token to the init script

    const email = 'akhtarsameer743@gmail.com';
    await page.goto('https://rahulshettyacademy.com/client/');
    //----Product order using API
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await page.locator('button[routerlink*="/dashboard/myorders"]').click();
    console.log(await page.locator('.mt-4').textContent());

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", //---URL to get the current response(orignal)
        async route => { //--Continue for changing GET call
            route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=55161da51da51da6wd654wd' }); // Here we are intercepting berfore the code reaches the server
        }
    )

    await page.locator('button:has-text("View")').nth(0).click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*');
    await page.waitForTimeout(2000);
    await expect(page.locator('p').last()).toContainText("not auth");
});


test.only('Network calls abort and listen', async ({ page }) => {
    await page.route('**/*.{css,jpg}',  //Blocking the css * is for regex
        async route => {
            await route.abort();
        }
    );

    page.on('request',
        request => {
            console.log(request.url());
        }
    );
    page.on('response',
        response => {
            console.log(response.url(), response.status());
        }
    );
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