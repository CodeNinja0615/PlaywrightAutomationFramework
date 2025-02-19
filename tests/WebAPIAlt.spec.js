// Login with UI once to copy all its cookies and storage data into a json and us it again and again

const { test, expect } = require('@playwright/test');

const email = 'akhtarsameer743@gmail.com';
const productName = 'IPHONE 13 PRO';
let webContext;
test.beforeAll(async ({browser}) => { //---Creating and saving the state of login
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    const title = await page.title();
    await page.fill('#userEmail', email);
    await page.fill('#userPassword', 'Sameerking01!');
    await page.click('input#login');
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await context.storageState({path: 'state.json'}); //Saving the state.json
    webContext = await browser.newContext({storageState: 'state.json'}) //Using the state.json
});

test('Session state', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    //--No login code here logging in using saved state in json frombefore all
    const products = page.locator('.card-body');
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
            break;
        }
    }
    await expect(page.locator('.address p.text:nth-child(2)').first()).toHaveText(email);
});
test('Session state 2', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    //--No login code here logging in using saved state in json frombefore all
    const products = page.locator('.card-body');
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

});