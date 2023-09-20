const { expect } = require('@playwright/test');

exports.CustomerNavbarPage = class CustomerNavbarPage {
    constructor(page) {
        this.page = page;
        this.buttonNameuser = page.getByTestId('buttonUser');
        this.logoAis = page.getByTestId('logoAis');
        this.textPhoneNumbe = page.getByTestId('textPhoneNumber');
        this.textStatus = page.getByTestId('textStatus');
    }

    async customerNavbarDisplay () {
        await expect(this.buttonNameuser).toBeVisible();
        await expect(this.logoAis).toBeVisible();
        await expect(this.textPhoneNumbe).toBeVisible();
        await expect(this.textStatus).toBeVisible();
    }
}