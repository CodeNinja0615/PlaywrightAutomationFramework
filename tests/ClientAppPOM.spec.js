const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');

test('End-To-End Test', async ({ page }) => {
    // const productName = 'IPHONE 13 PRO';
    const email = 'akhtarsameer743@gmail.com';
    const productNames = ['IPHONE 13 PRO', 'ZARA COAT 3', 'ADIDAS ORIGINAL'];
    await page.goto('https://rahulshettyacademy.com/client/');
    const products = page.locator('.card-body');
    const title = await page.title();
    await page.fill('#userEmail', email);
    await page.fill('#userPassword', 'Sameerking01!');
    await page.click('input#login');
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count = await products.count();
    //iterate through the products
    for (let i = 0; i < count; i++) {
        const productToAdd = await products.nth(i).locator('b').textContent();
        if (productNames.includes(productToAdd)) {
            // await products.nth(i).locator('.btn.w-10.rounded').click();
            await products.nth(i).locator('text=Add To Cart').click();
            const toast = page.locator('.ng-trigger-flyInOut');
            await toast.waitFor();
            await toast.waitFor({ state: 'hidden' });
            // break;
        }
    }
    await page.locator('[routerlink$="/dashboard/cart"]').click();

    const cartProd = page.locator('.cartSection h3');
    await cartProd.first().waitFor();
    const cartCount = await cartProd.count();
    for (let i = 0; i < cartCount; i++) {
        const product = await cartProd.nth(i).textContent();
        await expect(productNames).toContain(product);
    }

    await page.locator('.totalRow .btn.btn-primary').click();
    await page.locator('[placeholder="Select Country"]').pressSequentially('India');
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
    const orderID = await page.locator('label.ng-star-inserted').allTextContents();
    console.log(orderID);
    await page.locator('button[routerlink*="/dashboard/myorders"]').click();
    await page.locator('div h1:has-text("Your Orders")').waitFor();
    const orderIDs = page.locator('tr th[scope="row"]');
    const orderIDCount = await orderIDs.count();
    for (let i = 0; i < orderIDCount; i++) {
        const order = await orderIDs.nth(i).textContent();
        const newOrderID = " | " + order + " | ";
        if (orderID.includes(newOrderID)) {
            expect(orderID).toContain(newOrderID);
        }
    }
});


test('End-To-End Test 2', async ({ page }) => {
    const poManager = new POManager(page);
    const productName = 'IPHONE 13 PRO';
    const email = 'akhtarsameer743@gmail.com';
    const password = 'Sameerking01!';
    await poManager.getLoginPage().goTo();
    const title = await poManager.getLoginPage().pageTitle();
    await poManager.getLoginPage().validLogin(email, password)
    console.log(title);
    await poManager.getDashboardPage().searchProductAddCart(productName);
    await poManager.getDashboardPage().navigateToCart();
    const cartProduct = await poManager.getCartPage().verifyCartProduct(productName);
    expect(productName).toEqual(cartProduct);
    await poManager.getCartPage().checkOutProduct();
    await poManager.getPaymentPage().selectCountry(' India', email);
    const orderID = await poManager.getConfirmationPage().confirmOrder();
    await poManager.getConfirmationPage().navigateToOrderPage();
    await poManager.getOrderPage().verifyAndViewOrder(orderID, email);
});