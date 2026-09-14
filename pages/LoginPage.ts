import {type Locator, type Page} from '@playwright/test';
export class LoginPage{
    readonly page: Page;
    readonly username: Locator;
    readonly passwordInput: Locator;
    readonly SignInButton: Locator;
    readonly errorMessage: Locator;
    constructor(page: Page) {
        this.page = page;
        this.username = page.getByLabel('Username');
	    this.passwordInput = page.getByLabel('Password');
	    this.SignInButton = page.getByRole('button', { name: 'Submit'});
	    this.errorMessage = page.getByTestId('login-error');
    }
    async goto() {
        await this.page.goto('/practice-test-login');
    }
    async signIn(user: string, password: string){
        await this.username.fill(user);
        await this.passwordInput.fill(password);
        await this.SignInButton.click();
    }
    async getPageTitle() {
        return this.page.title();
    }
}
