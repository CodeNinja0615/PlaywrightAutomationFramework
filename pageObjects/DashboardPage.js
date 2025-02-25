class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productsName = page.locator('.card-body b');
        this.cart = page.locator('[routerlink$="/dashboard/cart"]');
    }

    async searchProductAddCart(productName) {
        await this.productsName.first().waitFor();
        const titles = await this.productsName.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        //iterate through the products
        for (let i = 0; i < count; i++) {
            const productToAdd = await this.products.nth(i).locator('b').textContent();
            if (productName === productToAdd) {
                // await products.nth(i).locator('.btn.w-10.rounded').click();
                await this.products.nth(i).locator('text=Add To Cart').click();
                const toast = this.page.locator('.ng-trigger-flyInOut');
                await toast.waitFor();
                await toast.waitFor({ state: 'hidden' });
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }

}
module.exports = { DashboardPage };