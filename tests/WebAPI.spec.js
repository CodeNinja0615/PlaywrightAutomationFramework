const { test, expect, request } = require('@playwright/test');
const {APIutils} = require('./utils/APIutils');

const loginPayload = {userEmail: "akhtarsameer743@gmail.com", userPassword: "Sameerking01!"}; // Define the login payload
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"67a8df1ac0d3e6622a297ccb"}]};
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext(); // Create a new context for API requests
    const apiUtils = new APIutils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

// test.beforeEach(async ({ page }) => {
// });

test('WebApi Test', async ({ page }) => {
    page.addInitScript(value =>{ // Add the token to the local storage
        window.localStorage.setItem('token', value); // Set the token in the local storage
    }, response.token); // Pass the token to the init script

    const email = 'akhtarsameer743@gmail.com';
    await page.goto('https://rahulshettyacademy.com/client/');
    //----Product order using API
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await page.locator('button[routerlink*="/dashboard/myorders"]').click();
    await page.locator('div h1:has-text("Your Orders")').waitFor();
    await page.locator('tbody tr').filter({hasText: response.orderID}).getByRole('button', {name: 'View'}).click();
    await expect(page.locator('.address p.text:nth-child(2)').first()).toHaveText(email);
});