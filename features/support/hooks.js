const playwright = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager'); //---Page Object Manager
const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');
const path = require('path');


Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false, args: ["--start-maximized"] });
    const context = await browser.newContext({ viewport: null });
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(async function () {
    console.log("Last");
});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'ss.png' });
    }
});