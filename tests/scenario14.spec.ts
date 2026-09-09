// tests/scenario14-negative-login.spec.ts

import { test, expect } from '@playwright/test';

import { SauceDemoLoginPage } from '../pages/SauceDemoLoginPage';
import { HerokuLoginPage } from '../pages/HerokuLoginPage';
import { DemoQAPracticeFormPage } from '../pages/DemoQAPracticeFormPage';

test.describe('Scenario 14 - Login Failure & Error Handling', () => {

  test('Negative Login Journey', async ({ page }) => {

    const sauceDemo = new SauceDemoLoginPage(page);

    await test.step('Step 1 - Launch Sauce Demo', async () => {

      await sauceDemo.navigate();

      await expect(page).toHaveURL(
        'https://www.saucedemo.com/'
      );
    });

    await test.step('Step 2 - Blank Username & Password', async () => {

      await sauceDemo.login('', '');

      await sauceDemo.verifyError('Username is required');
    });

    await test.step('Step 3 - Password Missing', async () => {

      await sauceDemo.username.fill('standard_user');

      await sauceDemo.loginButton.click();

      await sauceDemo.verifyError('Password is required');
    });

    await test.step('Step 4 - Invalid Credentials', async () => {

      await sauceDemo.login(
        'invalid_user',
        'wrongpass'
      );

      await sauceDemo.verifyError(
        'Username and password do not match'
      );
    });

    await test.step('Step 5 - Locked User Validation', async () => {

      await sauceDemo.login(
        'locked_out_user',
        'secret_sauce'
      );

      await sauceDemo.verifyError(
        'Sorry, this user has been locked out'
      );
    });

    await test.step('Step 6 - Validate Error Container Styling', async () => {
 
await expect(
sauceDemo.errorMessage
).toBeVisible();
 
await expect(
sauceDemo.page.locator('.error-message-container')
).toBeVisible();
});

    await test.step('Step 7 - Close Error Banner', async () => {

      await sauceDemo.errorCloseButton.click();

      await expect(
        sauceDemo.errorMessage
      ).toBeHidden();
    });

    //---------------------------------------

    //const heroku = new HerokuLoginPage(page);

    ////await heroku.navigate();

////await expect(page).toHaveURL(/login/);

// await expect(
// page.locator('#username')
// ).toBeVisible();

// await expect(
// page.locator('#password')
// ).toBeVisible();

//     await test.step('Step 9 - Invalid Heroku Login', async () => {

//       await heroku.login(
//         'admin',
//         'wrongpassword'
//       );

//       await expect(
//         heroku.flashMessage
//       ).toContainText(
//         'Your username is invalid!'
//       );
//     });

    // await test.step('Step 10 - Verify Error Styling', async () => {

    //   await expect(
    //     heroku.flashMessage
    //   ).toHaveClass(/error/);
    // });

    // await test.step('Step 11-13 - Successful Login', async () => {

    //   await heroku.login(
    //     'tomsmith',
    //     'SuperSecretPassword!'
    //   );

    //   await expect(page).toHaveURL(
    //     /secure/
    //   );

    //   await expect(
    //     heroku.flashMessage
    //   ).toContainText(
    //     'You logged into a secure area!'
    //   );
    // });

    // await test.step('Step 14 - Logout', async () => {

    //   await heroku.logoutButton.click();

    //   await expect(
    //     heroku.flashMessage
    //   ).toContainText(
    //     'You logged out of the secure area!'
    //   );
    // });

    //---------------------------------------

    const demoQA = new DemoQAPracticeFormPage(page);

    await test.step('Step 15 - Open DemoQA Form', async () => {

      await demoQA.navigate();

      await expect(
        demoQA.submitButton
      ).toBeVisible();
    });

    await test.step('Step 16 - Empty Form Submit', async () => {

      await demoQA.submitButton.click();
    });

    await test.step('Step 17 - Verify Required Fields', async () => {
await expect(
demoQA.firstName
).toHaveJSProperty('required', true);
await expect(
demoQA.lastName
).toHaveJSProperty('required', true);
await expect(
demoQA.mobile
).toHaveJSProperty('required', true);
});
await test.step('Step 18 - Invalid Mobile Validation', async () => {
await demoQA.mobile.fill('12345');
await demoQA.submitButton.click();
await expect(
demoQA.mobile
).toHaveValue('12345');
});
}); // closes test()
}); // closes describe()
