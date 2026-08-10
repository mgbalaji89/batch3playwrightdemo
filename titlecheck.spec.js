import { test, expect } from '@playwright/test';

const baseURL = 'https://testautomationpractice.blogspot.com/';

test('Check the title of the page ', async( { page} ) => {
    await page.goto(baseURL);
    //Purposely give the wrong actual title to check the test case failiure
    const actualTitle = 'Automation Testing Practiceee';
    await expect(page).toHaveTitle(actualTitle);
});
