const { expect } = require('@playwright/test');

exports.MyChannelLoginPage = class MyChannelLoginPage {
    constructor(page) {
        this.page = page;
        this.dropdownOption = page.locator('select.form-select');
        this.buttonNext = page.getByText('NEXT');
        this.fieldUsername = page.locator('id=username');
        this.fieldPassword = page.locator('id=password');
        this.buttonLogIn = page.getByText('Log in'); 
        this.dialogContent = page.locator('id=swal2-content'); 
        this.dialogButtonOK = page.getByRole('button',{name: /OK/});
    }

    async gotoLoginPage() {
        await this.page.goto('/newlogin/callback-signin');
    }

    async dropdownOptionDisplay () {
        await expect(this.dropdownOption).toBeVisible();
    }

    async loginMyChannel (username,password){
        await this.dropdownOption.selectOption('Temporary_Login');
        await this.buttonNext.click();
        await expect(this.fieldUsername).toBeVisible();
        await this.fieldUsername.fill(username);
        await this.fieldPassword.fill(password);
        await this.buttonLogIn.click();
    }
    
    async dialogUnauthorizedDisplay(message) {
        await expect(this.dialogContent).toHaveText(message);
    }

    async clickDialogButtonOK () {
        await this.dialogButtonOK.click();
    }
}