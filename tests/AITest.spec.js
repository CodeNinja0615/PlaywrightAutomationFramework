const { test, expect } = require('@playwright/test');
const { ai } = require('@zerostep/playwright');

test('Table Validation', async ({ page }) => {
    const aiArgs = {page, test}
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    const orignalPrice = await ai('What is the Price of Tomato', aiArgs);
    expect(orignalPrice).toEqual("37");
    const discountPrice = await ai('What is the Discount price of Tomato', aiArgs);
    expect(discountPrice).toEqual("26");
    const differnceAmount = await ai('What is the difference between Price and Discount price of Tomato', aiArgs)
    expect(differnceAmount).toEqual("11");
    console.log(differnceAmount);
});

test('LinkedIn Test', async ({ page }) => {
    const aiArgs = {page, test}
    await page.goto('https://in.linkedin.com/');
    await ai('Click on "Sign in with email"', aiArgs);
    await ai('Use email: xyz@gmail.com and Passwork: abc123', aiArgs);
    await ai('Click on "Sign in"', aiArgs);
});