const { expect } = require('@playwright/test');

exports.ValidateCustomerPage = class ValidateCustomerPage {
    constructor(page) {
        this.page = page;
        this.fieldMobileNumber = page.getByTestId('mobilNo');
        this.buttonNext = page.getByTestId('buttonNext');
        this.buttonSkip = page.getByTestId('buttonSkip');
        this.fieldKeyIn = page.getByTestId('identityNumber');
        this.errorMobileNoIncorrect = page.getByText('กรุณากรอกเบอร์ใหม่ เนื่องจากไม่พบข้อมูลในระบบ',{ exact: true });
    }

    async inputMobileNumber(number) {
        await this.fieldMobileNumber.click();
        await this.fieldMobileNumber.type(number);
    }

    async inputfieldKeyIn(number) {
        await this.fieldKeyIn.click();
        await this.fieldKeyIn.type(number);
    }

    async clearMobileNumber() {
        await this.fieldMobileNumber.clear();
    }

    async clickButtonSkip(){
        await this.buttonSkip.click();
    }

    async clickButtonNext() {
        await this.buttonNext.click();
    }

    async buttonNextIsEnable() {
        const parent = await this.page.locator('app-button-next', { has: this.buttonNext })
        const status = await parent.getAttribute('class');
        expect(status).not.toContain('disabled');
    }

    async buttonNextIsDisabled() {
        const parent = await this.page.locator('app-button-next', { has: this.buttonNext })
        const status = await parent.getAttribute('class');
        expect(status).toContain('disabled');
    }

    async validateKeyInErrorDisplay(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async clearfieldKeyIn(text) {
        await this.fieldKeyIn.clear();
    }

    async dialogErrorMobileNoIncorrect() {
        await expect(this.errorMobileNoIncorrect).toBeVisible();
    }

    async clickDialogOKButton() {
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

}