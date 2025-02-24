class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signInButton = page.locator('input#login');
    }
    async validLogin(email, password) {
        await this.userName.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
    }
    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }
    async pageTitle(){
        return await this.page.title();
    }
}
module.exports = { LoginPage }