const { expect } = require('@playwright/test');
class ConfirmationPage {
    constructor(page) {
        this.page = page;
        this.success = page.locator('.hero-primary');
        this.orderID = page.locator('label.ng-star-inserted');
        this.ordersBtn = page.locator('button[routerlink*="/dashboard/myorders"]');
        this.orderPage = page.locator('div h1:has-text("Your Orders")');
    }

    async confirmOrder() {
        await expect(this.success).toHaveText('Thankyou for the order.');
        const orderID = await this.orderID.first().textContent();
        console.log(orderID);
        return orderID;
    }
    async navigateToOrderPage(){
        await this.ordersBtn.click();
        await this.orderPage.waitFor();
    }
}
module.exports = { ConfirmationPage };