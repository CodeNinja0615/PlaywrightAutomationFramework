const { test, expect } = require('@playwright/test');
const { ai } = require('@zerostep/playwright');

test('Calendar Validation', async ({ page }) => {
    const aiArgs = {page, test}
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    const text = await ai('What is the Discount price of Tomato', aiArgs)
    expect(text).toEqual("26");
    console.log(text);
});