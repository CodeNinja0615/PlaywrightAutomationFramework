const { test, expect } = require('@playwright/test');

test('Calendar Validation', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.waitForLoadState('networkidle');
    const date = '02 / 15 / 2025';
    const splitStr = date.split(' / ');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[parseInt(splitStr[0], 10) - 1];
    const day = splitStr[1];
    const year = splitStr[2];
    
    await page.locator('.react-date-picker__calendar-button__icon').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__decade-view').getByRole('button', { name: year }).click();
    await page.locator('.react-calendar__year-view').getByRole('button', { name: month }).click();
    await page.locator('.react-calendar__month-view').getByRole('button', { name: day }).click();
    await expect(page.locator('[name="date"]')).toHaveAttribute('value', year + '-' + splitStr[0] + '-' + day);
    // await expect(page.locator('.react-date-picker__inputGroup').filter({ hasText: date })).toBeVisible();
});