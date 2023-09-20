const { expect } = require('@playwright/test');

exports.MyChannelLandingPage = class MyChannelLandingPage {
    constructor(page) {
        this.page = page;
        this.dropdownOption = page.locator('select.form-select');
        this.buttonNext = page.getByText('NEXT');
        this.fieldUsername = page.locator('id=username');
        this.fieldPassword = page.locator('id=password');
        this.buttonLogIn = page.getByText('Log in'); 
        this.buttonSalePilotTest = page.getByText('Sale (Pilot Test)');
        this.buttonHandsetAndAccessory = page.getByText('Handset & Accessory');
        this.buttonStock = page.getByText('Stock');
        this.dialogErrorTitle = page.locator('id=swal2-title');
        this.dialogErrorDesc = page.locator('id=swal2-html-container');
        this.dialogErrorButton = page.getByRole('button', { name: 'OK' });
    }

    async textLocationCodeDisplay(locationCode) {
        await expect(this.page.getByText(`Location : ${locationCode}`)).toBeVisible();
    }

    async textUserIdDisplay(userId) {
        await expect(this.page.getByText(`รหัสพนักงานขาย : ${userId}`)).toBeVisible();
    }

    async buttonSalePilotNotDisplay() {
        await expect(this.buttonSalePilotTest).not.toBeVisible();
    }
    
    async clickButtonHandsetAndAccessory() {
        await this.buttonSalePilotTest.click();
        await this.buttonHandsetAndAccessory.click();
    }

    async clickButtonStock(){
        await this.buttonSalePilotTest.click();
        await this.buttonStock.click();
    }

    async dialogErrorTitleDisplay(message) {
        await expect(this.dialogErrorTitle).toContainText(message);
    }

    async dialogErrorDescDisplay(message) {
        await expect(this.dialogErrorDesc).toContainText(message);
    }
    
    async clickDialogButtonOK() {
        await this.dialogErrorButton.click();
    }
}