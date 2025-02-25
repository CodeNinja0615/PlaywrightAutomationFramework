const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const { CartPage } = require('../pageObjects/CartPage');
const { PaymentPage } = require('../pageObjects/PaymentPage');
const { ConfirmationPage } = require('../pageObjects/ConfirmationPage');
const { OrderPage } = require('../pageObjects/OrderPage');

class POManager {
    constructor(page) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.paymentPage = new PaymentPage(page);
        this.confirmationPage = new ConfirmationPage(page);
        this.orderPage = new OrderPage(page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getPaymentPage(){
        return this.paymentPage;
    }
    getConfirmationPage(){
        return this.confirmationPage;
    }
    getOrderPage(){
        return this.orderPage;
    }
}
module.exports = { POManager };