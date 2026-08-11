import { test, expect } from '@playwright/test';

const baseURL = 'https://testautomationpractice.blogspot.com/';

//Test Case 3: Verify Entered Name
test('verify the entered name', async({ page }) => {
    await page.goto(baseURL);
    await page.locator('#name').fill('Balaji');
    await expect(page.locator('#name')).toHaveValue('Balaji');
});
