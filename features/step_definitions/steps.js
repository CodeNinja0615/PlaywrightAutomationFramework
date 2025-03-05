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