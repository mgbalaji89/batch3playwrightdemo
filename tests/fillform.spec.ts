import { test, expect } from '@playwright/test';

const baseURL = 'https://testautomationpractice.blogspot.com/';
//Just filling the form details no submission
test('Fill Data Entry Form', async({ page }) => {
    await page.goto(baseURL);
    //Filling the basic data
    await page.locator('#name').fill('Balaji M G');
    await page.locator('#email').fill('balaji@test.com');
    await page.locator('#phone').fill('9090989098900');
    await page.locator('#textarea').fill('Bengaluru , Karnatka');

    // Selecting the gender
    await page.locator('#male').check();

    // Select the specific day
    await page.locator('#sunday').check();
    await page.locator('#monday').check();
});
