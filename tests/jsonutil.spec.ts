import { test, expect } from '@playwright/test';
import testdata from './testData.json'
const baseURL = "https://demoblaze.com/";

test('Test Signup for Demoblaze using JSON', async( { page } ) => {
    await page.goto(baseURL);
    await page.locator('#signin2').click();
    
    await page.locator('#sign-username').fill(testdata.username);
    await page.locator('#sign-password').fill(testdata.password);
    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('button', { name: 'Sign up' }).click();
    // page.on('dialog',async(dialog) => {
    //     console.log(dialog.message);
    //     dialog.accept();
    //}); 
    const dialog = await dialogPromise;
    const dialogMessage = dialog.message();
    console.log(dialogMessage);
    await dialog.accept();
});
//console.log(testdata.username);
//console.log(testdata.password);
