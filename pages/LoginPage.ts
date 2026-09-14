import {test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

import * as credential from '../test-data/users.json';
import { DashboardPage } from '../pages/DashboardPage';

test('User can signin with Valid Credentials ', async( { page }) => {
    //This is completly page object model
    //Creating the new instance for the Login Page , Navigating to Login URL and passing the valid username and password 
    // Then Clicking the Submit Button 
    const loginPage = new LoginPage(page); 
    const dashboardPage = new DashboardPage(page);
    //Getting the page title after successful login and storing it into pageTitle variable
    await loginPage.goto();
    //await loginPage.signIn('student','Password123',);
    await loginPage.signIn(credential.username,credential.password);
    const pageTitle = await loginPage.getPageTitle();
    //Logged In Successfully | Practice Test Automation
    //Performing the assertion of the page title after successful Login
    expect(pageTitle).toBe('Logged In Successfully | Practice Test Automation');
    console.log(pageTitle);
    await dashboardPage.verifyLogoutButton();
    await dashboardPage.verifySuccessMessage();
});
