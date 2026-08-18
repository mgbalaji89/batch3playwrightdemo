import { test, expect } from '@playwright/test';

const baseURL = 'https://testautomationpractice.blogspot.com/';

test('Select multiple days', async({page}) => {
    await page.goto(baseURL);

    await page.locator('#sunday').check();
    await page.locator('#wednesday').check();
    await page.locator('#friday').check();

    await expect(page.locator('#sunday')).toBeChecked();
    await expect(page.locator('#wednesday')).toBeChecked();
    await expect(page.locator('#friday')).toBeChecked();

});
test('Fill Data Entry Form', async ({ page }) => {

await page.goto('https://testautomationpractice.blogspot.com/');

// Name
await page.locator('#name').fill('Balaji MG');

// Email
await page.locator('#email').fill('balaji@example.com');

// Phone
await page.locator('#phone').fill('9876543210');

// Address
await page.locator('#textarea').fill(
'Bengaluru, Karnataka, India'
);

// Gender
await page.locator('#male').check();

// Days
await page.locator('#sunday').check();
await page.locator('#monday').check();
await page.locator('#friday').check();

// Country
await page.locator('#country').selectOption('India');

// Colors
await page.locator('#colors').selectOption([
'red',
'blue',
'green'
]);

// Animals
await page.locator('#animals').selectOption([
'cat',
'dog',
'lion'
]);

// Date Picker 1 (MM/DD/YYYY)
await page.locator('#datepicker').fill('08/18/2026');

// Date Picker 2 (Readonly Calendar)
await page.locator('#txtDate').click();

// Select month/year if required
while (
(await page.locator('.ui-datepicker-month').textContent()) !== 'August' ||
(await page.locator('.ui-datepicker-year').textContent()) !== '2026'
) {
await page.locator('.ui-datepicker-next').click();
}

// Select day
await page.locator("//a[text()='18']").click();

// Verify selected date
await expect(page.locator('#txtDate'))
.toHaveValue('18/08/2026');

// Submit
await page.locator("//button[normalize-space()='Submit']").click();

await page.waitForTimeout(3000);
});
