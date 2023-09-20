const { expect } = require('@playwright/test');

exports.RoboCheckSharedTrans = class RoboCheckSharedTrans {
    constructor(page) {
        this.page = page;
        this.fieldUsername = page.getByPlaceholder('Enter username');
        this.fieldPassword = page.getByPlaceholder('Password');
        this.buttonLogIn = page.getByRole('button', { name: 'Log in' });
        this.buttonDB = page.getByRole('link', { name: ' Database' });
        this.fieldSearch = page.getByPlaceholder('Search ...');
        this.buttonSharedTransactions = page.getByRole('row', { name: ' sharedtransactions  Storage: 375.498 MB  Documents: 3,586  ' }).getByRole('link', { name: '' });
        this.fieldDataDB = page.getByRole('textbox').first();
        this.selectRadio = page.getByText('Equals');
        this.filedWording = page.getByLabel('คำค้นหา');
        this.buttonSearch = page.getByRole('button', { name: ' Search' });
    }

    async gotoMcAdmin() {
        await this.page.goto('https://sit-mcadm.cdc.ais.th/login');
    }

    async inputUsername(username) {
        await expect(this.page.getByPlaceholder('Enter username')).toBeVisible();
        await this.fieldUsername.fill(username);
    }

    async inputPassword(password) {
        await expect(this.page.getByPlaceholder('Password')).toBeVisible();
        await this.fieldPassword.fill(password);
    }

    async clickButtonLogIn() {
        await this.buttonLogIn.click();
    }

    async loginMcAdmin(username, password) {
        await this.inputUsername(username);
        await this.inputPassword(password);
        await this.clickButtonLogIn();
    }

    async clickButtonDB() {
        await this.buttonDB.click();
    }

    async inputSearch(search) {
        await expect(this.page.getByPlaceholder('Search ...')).toBeVisible();
        await this.fieldSearch.fill(search);
    }

    async clickSharedTransactions(){
        await expect(this.getByRole('row', { name: ' sharedtransactions  Storage: 375.498 MB  Documents: 3,586  ' }).getByRole('link', { name: '' })).toBeVisible();
        await this.buttonSharedTransactions.click();
    }

    async inputfieldTextBox(searchFieldDB){
        await expect(this.getByRole('textbox').first()).toBeVisible();
        await this.fieldSearch.fill(searchFieldDB);
    }

    async selectRadioButton(selectEquals){
        await expect(this.page.getByText(selectEquals)).toBeVisible();
        await this.selectRadio.click();
    }

    async specifyYourSearchTerm(searchTerm){
        await expect(this.page.getByLabel('คำค้นหา')).toBeVisible();
        await this.filedWording.fill(searchTerm);
    }

    async clickButtonSearch(){
        await this.buttonSearch.click();
    }
};


//   await page.getByText('64a7b0cad9f4f5000b2eb890').click();
//   await page.getByRole('link', { name: '' }).click();