const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base'); //---Custom fixture
const { POManager } = require('../pageObjects/POManager'); //---Page Object Manager
const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json'))); //--JSON -> String -> JS Object

for (const data of dataset) {
    test(`@Web End-To-End Test ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getLoginPage().goTo();
        const title = await poManager.getLoginPage().pageTitle();
        await poManager.getLoginPage().validLogin(data.email, data.password)
        console.log(title);
        await poManager.getDashboardPage().searchProductAddCart(data.productName);
        await poManager.getDashboardPage().navigateToCart();
        const cartProduct = await poManager.getCartPage().verifyCartProduct(data.productName);
        expect(data.productName).toEqual(cartProduct);
        await poManager.getCartPage().checkOutProduct();
        await poManager.getPaymentPage().selectCountry(' India', data.email);
        const orderID = await poManager.getConfirmationPage().confirmOrder();
        await poManager.getConfirmationPage().navigateToOrderPage();
        await poManager.getOrderPage().verifyAndViewOrder(orderID, data.email);
    });
}

customtest(`@CutomFixture End-To-End Test`, async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    await poManager.getLoginPage().goTo();
    const title = await poManager.getLoginPage().pageTitle();
    await poManager.getLoginPage().validLogin(testDataForOrder.email, testDataForOrder.password)
    console.log(title);
    await poManager.getDashboardPage().searchProductAddCart(testDataForOrder.productName);
    await poManager.getDashboardPage().navigateToCart();
    const cartProduct = await poManager.getCartPage().verifyCartProduct(testDataForOrder.productName);
    expect(testDataForOrder.productName).toEqual(cartProduct);
    await poManager.getCartPage().checkOutProduct();
    await poManager.getPaymentPage().selectCountry(' India', testDataForOrder.email);
    const orderID = await poManager.getConfirmationPage().confirmOrder();
    await poManager.getConfirmationPage().navigateToOrderPage();
    await poManager.getOrderPage().verifyAndViewOrder(orderID, testDataForOrder.email);
});