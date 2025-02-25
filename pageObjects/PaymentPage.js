const { expect } = require('@playwright/test');
class PaymentPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator('[placeholder="Select Country"]');
        this.dropdown = page.locator('.ta-results');
        this.purchaseEmail = page.locator('.user__name label');
        this.placeOrder = page.locator('.action__submit');
    }

    async selectCountry(countryName, email) {
        await this.country.pressSequentially('India');
        await this.dropdown.waitFor();
        const options = await this.dropdown.locator('button');
        const optionsCount = await options.count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await options.nth(i).textContent();
            if (text === countryName) {
                await options.nth(i).click();
                break;
            }
        }
        await expect(this.purchaseEmail).toHaveText(email);
        await this.placeOrder.click();
    }
}
module.exports = { PaymentPage };