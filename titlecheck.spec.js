import { test, expect } from '@playwright/test';

const baseURL = 'https://testautomationpractice.blogspot.com/';

test('Check the title of the page ', async( { page} ) => {
    await page.goto(baseURL);
    const actualTitle = 'Automation Testing Practiceee';
    await expect(page).toHaveTitle(actualTitle);
});
