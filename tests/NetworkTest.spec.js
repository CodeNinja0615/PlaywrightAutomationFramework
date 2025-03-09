const { test, expect, request } = require('@playwright/test');
const { APIutils } = require('../utils/APIutils');

const loginPayload = { userEmail: "akhtarsameer743@gmail.com", userPassword: "Sameerking01!" }; // Define the login payload
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb" }] };
let response;
const fakePayloadOrder = { data: [], message: "No Orders" }; //----Fake reponse body
test.beforeAll(async () => {
    const apiContext = await request.newContext(); // Create a new context for API requests
    const apiUtils = new APIutils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload); //Don't forget await //---No need to create order here but response is coming from CreateOrder method hence using it.
});

// test.beforeEach(async ({ page }) => {
// });

test('@API Network Intercept', async ({ page }) => {
    page.addInitScript(value => { // Add the token to the local storage
        window.localStorage.setItem('token', value); // Set the token in the local storage
    }, response.token); // Pass the token to the init script

    const email = 'akhtarsameer743@gmail.com';
    await page.goto('https://rahulshettyacademy.com/client/');
    //----Product order using API
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();

    // await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/670fdb40ae2afd4c0b9d6a4f", //---Used Regex instead
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", //---URL to get the current response(orignal)
        async route => {
            //Intercepting response -> APi Response -> |-Us Jumping In with fake body-| browser -> render data on frontend
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrder); //---Converting JS object to JSON cause cannot parse JS object
            route.fulfill({ //----Old response new body
                response, //--Old response 
                body, //--New body
            })

        }
    )
    //---Do activities before performing the click for the page
    await page.locator('button[routerlink*="/dashboard/myorders"]').click(); //-requesting before order btn is pressed
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    // await page.waitForTimeout(2000);
    console.log(await page.locator('.mt-4').textContent());

});