import { test, expect } from '@playwright/test';

const baseURL = 'https://testautomationpractice.blogspot.com/';

//Verify Gender Selection
test('Verify the Male Gender Selection', async( { page }) => {
    // Launch the base URL and select male Radio button
    await page.goto(baseURL);
    await page.locator('#male').check();
    //Ensure male radio option is selected and female option is not selected
    await expect(page.locator('#male')).toBeChecked();
    await expect(page.locator('#female')).not.toBeChecked();
});
