import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly successMessage: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.getByRole('heading', {name: 'Logged In Successfully'});
        this.logoutButton = page.getByText('Log out');
    }
    async verifyLogoutButton() {
        await expect(this.logoutButton).toBeVisible();
        await expect(this.logoutButton).toHaveText('Log out');
    }
    async verifySuccessMessage() {
        await expect(this.successMessage).toHaveText('Logged In Successfully');
    }
}
