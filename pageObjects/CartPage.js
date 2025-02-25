class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProd = page.locator('.cartSection h3');
        this.checkOut = page.locator('.totalRow .btn.btn-primary');
    }

    async verifyCartProduct(productName) {
        await this.cartProd.first().waitFor();
        const cartCount = await this.cartProd.count();
        for (let i = 0; i < cartCount; i++) {
            const product = await this.cartProd.nth(i).textContent();
            if (product === productName) {
                return product;
            }
        }
    }
    async checkOutProduct() {
        await this.checkOut.click();
    }
}
module.exports = { CartPage };