const { expect } = require('@playwright/test');
class OrderPage {
    constructor(page) {
        this.page = page;
        this.orderIDRow = page.locator('tbody tr');
        this.emailAddress = page.locator('.address p.text:nth-child(2)');
    }

    async verifyAndViewOrder(orderID, email) {
        for (let i = 0; i < await this.orderIDRow.count(); i++) {
            const order = await this.orderIDRow.locator('th').nth(i).textContent();
            console.log(order);
            const text = orderID.split(" | ")[1];
            console.log(text);
            if (text.trim() === order) {
                expect(text).toEqual(order);
                await this.orderIDRow.first().locator('button.btn-primary').click();
                break;
            }
        }
        await expect(this.emailAddress.first()).toHaveText(email);
    }
}
module.exports = { OrderPage };