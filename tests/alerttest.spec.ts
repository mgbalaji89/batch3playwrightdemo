import {test,expect} from 'playwright/test';
const baseURL = 'https://testautomationpractice.blogspot.com/';

test('Alert Handling Test', async( {page} ) => {
    await page.goto(baseURL);
    page.on('dialog', async (dialog) => {
        console.log(dialog.message());
        //await page.getByRole('button', {name: 'Simple Alert'}).click();
        await dialog.accept();
    });
    await page.getByRole('button', {name: 'Simple Alert'}).click();

    await expect(page).toHaveTitle(/Automation Testing Practice/);
});

test('Confirmation Alert', async( {page} ) => {
    await page.goto(baseURL);
    //The code order is important , if we interchange the code the will get issue or no response
    page.on('dialog', async(dialog) => {
        console.log(dialog.message());
        console.log(dialog.type());
        //await dialog.accept();
        await dialog.dismiss();
        //Below code will execute only when the button is clicked
        const resultMessage = await page.locator('#demo').textContent();
        console.log(resultMessage);
    });
    //This is under page not under dialog 
    await page.getByRole('button', {name: 'Confirmation Alert'}).click();
}); 
test('Prompt Alert - Verify the default text and enter name', async( {page}) => {
    await page.goto(baseURL);
    const userName = "Balaji";

    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('Please enter your name:');

        //Enter Name and Click Ok
        await dialog.accept(userName);

        //Click Prompt Alert button
        await page.getByRole('button', {name: 'Prompt Alert'}).click();

        //verify result displayed on page
        await expect(page.locator('#demo')).toContainText(`Hello ${userName}! How are you today?`);
    });
});
test('Verify the new tab functionality',async ({page,context}) => {
    await page.goto(baseURL);
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('button', {name: 'New Tab'}).click()
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    //URL Assertion
    await expect(newPage).toHaveURL('https://www.pavantestingtools.com/');
    
});
