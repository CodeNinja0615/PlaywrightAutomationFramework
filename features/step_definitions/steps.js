const assert = require('assert')
const { expect } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber')

Given('A login to Ecommerce Application with {string} and {string}', { timeout: 10000 }, async function (username, password) {
    this.email = username;
    await this.poManager.getLoginPage().goTo();
    const title = await this.poManager.getLoginPage().pageTitle();
    await this.poManager.getLoginPage().validLogin(username, password)
});


When('Add {string} to Cart', async function (productName) {
    await this.poManager.getDashboardPage().searchProductAddCart(productName);
    await this.poManager.getDashboardPage().navigateToCart();
});

Then('Verify {string} is displayed in cart', async function (productName) {
    const cartProduct = await this.poManager.getCartPage().verifyCartProduct(productName);
    expect(productName).toEqual(cartProduct);
    await this.poManager.getCartPage().checkOutProduct();
});


When('Enter valid details and place the order', async function () {
    await this.poManager.getPaymentPage().selectCountry(' India', this.email);
    this.orderID = await this.poManager.getConfirmationPage().confirmOrder();
});

Then('Verify order is present in order history page', async function () {
    await this.poManager.getConfirmationPage().navigateToOrderPage();
    await this.poManager.getOrderPage().verifyAndViewOrder(this.orderID, this.email);
});

Given('A login to Ecommerce2 Application with {string} and {string}', async function (userid, password) {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    //get title of page and assert
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    const username = this.page.locator('#username');
    const signIn = this.page.locator('[name="signin"]');

    await username.fill(userid);
    await this.page.locator('[id="password"]').fill(password);
    await signIn.click();
});

Then('Verify Error mesaage is displayed', async function () {
    const error = this.page.locator('[style*="block"]');
    console.log(await error.textContent());
    await expect(error).toContainText('Incorrect');
});
