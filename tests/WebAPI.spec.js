const { test, expect, request } = require('@playwright/test');
const loginPayload = {userEmail: "akhtarsameer743@gmail.com", userPassword: "Sameerking01!"}; // Define the login payload
let token;
test.beforeAll(async () => {
    const apiContext = await request.newContext(); // Create a new context for API requests
    const loginResponse = await  apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',  // Make a POST request to the login endpoint
    {
        data: loginPayload // Pass the login payload
    });
    expect(loginResponse.ok()).toBeTruthy(); // Assert that the response is OK
    const loginResponseJson = await loginResponse.json(); // Parse the response JSON
    token = loginResponseJson.token; // Extract the token from the response
    console.log(token);
});

// test.beforeEach(async ({ page }) => {

// });

test('WebApi Test', async ({ page }) => {

    page.addInitScript(value =>{ // Add the token to the local storage
        window.localStorage.setItem('token', value); // Set the token in the local storage
    }, token); // Pass the token to the init script

    const productName = 'IPHONE 13 PRO';
    const email = 'akhtarsameer743@gmail.com';
    const products = page.locator('.card-body');

    await page.goto('https://rahulshettyacademy.com/client/');
    // const title = await page.title();
    // await page.fill('#userEmail', email);
    // await page.fill('#userPassword', 'Sameerking01!');
    // await page.click('input#login');

    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count = await products.count();
    //iterate through the products
    for (let i = 0; i < count; i++) {
        const productToAdd = await products.nth(i).locator('b').textContent();
        if(productName === productToAdd){
            // await products.nth(i).locator('.btn.w-10.rounded').click();
            await products.nth(i).locator('text=Add To Cart').click();
            const toast = page.locator('.ng-trigger-flyInOut');
            await toast.waitFor();
            await toast.waitFor({ state: 'hidden' });
            break;
        }
    }
    await page.locator('[routerlink$="/dashboard/cart"]').click();

    const cartProd = page.locator('.cartSection h3');
    await cartProd.first().waitFor();
    const cartCount = await cartProd.count();
    for (let i = 0; i < cartCount; i++) {
        const product = await cartProd.nth(i).textContent();
        expect(productName).toEqual(product);
    }

    await page.locator('.totalRow .btn.btn-primary').click();
    await page.locator('[placeholder="Select Country"]').pressSequentially ('India');
    const dropdown = await page.locator('.ta-results');
    await dropdown.waitFor();
    const options = await dropdown.locator('button');
    const optionsCount = await options.count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await options.nth(i).textContent();
        if (text === ' India') {
            await options.nth(i).click();
            break;
        }
    }
    await expect(page.locator('.user__name label')).toHaveText(email);
    await page.locator('.action__submit').click();
    const success = page.locator('.hero-primary');
    await expect(success).toHaveText('Thankyou for the order.');
    const orderID = await page.locator('label.ng-star-inserted').textContent();
    console.log(orderID);
    await page.locator('button[routerlink*="/dashboard/myorders"]').click();
    await page.locator('div h1:has-text("Your Orders")').waitFor();
    const orderIDRow = page.locator('tbody tr');
    for (let i = 0; i < await orderIDRow.count(); i++) {
        const order = await orderIDRow.locator('th').nth(i).textContent();
        console.log(order);
        const text = orderID.split(" | ")[1];
        console.log(text);
        if(text.trim() === order){
            expect(text).toEqual(order);
            await orderIDRow.first().locator('button.btn-primary').click();
            await expect(page.locator('.address p.text:nth-child(2)').first()).toHaveText(email);
            break;
        }
    }
});