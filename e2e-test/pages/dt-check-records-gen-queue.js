const { expect } = require('@playwright/test');

exports.DtCheckRecordsGenQue = class DtCheckRecordsGenQue {
    constructor(page) {
        this.page = page;
        this.fieldUsername = page.locator('id=username');
        this.fieldPassword = page.locator(`//input[@type='password']`);
        this.buttonLogIn = page.getByText('Login');
        this.buttonSaleOrder = page.getByRole('link', { name: 'Sale & Order' });
        this.buttonDeviceSaleUpdateMaterialCode = page.getByText('Device Sale Update Material Code');
        this.fieldMobileNo = page.locator('#mobileNo');
        this.buttonQuery = page.getByRole('button', { name: ' Query' })
    }

    async gotoDigitalTrading() {
        await this.page.goto('https://sit-digitaltrading.cdc.ais.th/digital-trading/Login');
    }

    async inputUsername(username) {
        await expect(this.page.locator('id=username')).toBeVisible();
        await this.fieldUsername.fill(username);
    }

    async inputPassword(password) {
        await expect(this.page.locator(`//input[@type='password']`)).toBeVisible();
        await this.fieldPassword.fill(password);
    }

    async clickButtonLogIn() {
        await this.buttonLogIn.click();
    }

    async loginDigitalTrading(username, password) {
        await this.inputUsername(username);
        await this.inputPassword(password);
        await this.clickButtonLogIn();
    }

    async clickButtonSaleOrder() {
        await this.buttonSaleOrder.click();
    }

    async clickButtonDeviceSaleUpdateMaterialCode () {
        await this.buttonDeviceSaleUpdateMaterialCode.click();
    }

    async inputMobileNo (mobileno) {
        await expect(this.page.locator('#mobileNo')).toBeVisible();
        await this.fieldMobileNo.fill(mobileno);
    }

    async clickButtonQuery() {
        await this.buttonQuery.click();
    }
}