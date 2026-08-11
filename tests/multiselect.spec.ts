import { test, expect } from '@playwright/test';

const baseURL = 'https://testautomationpractice.blogspot.com/';
// Select Multiple Days
test('Select multiple days', async({page}) => {
    await page.goto(baseURL);
    //Selecting Sunday , Wednesday and Friday 
    await page.locator('#sunday').check();
    await page.locator('#wednesday').check();
    await page.locator('#friday').check();

    //Perform assertion for selected items
    await expect(page.locator('#sunday')).toBeChecked();
    await expect(page.locator('#wednesday')).toBeChecked();
    await expect(page.locator('#friday')).toBeChecked();

});
