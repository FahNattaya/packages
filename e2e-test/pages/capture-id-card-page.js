const { expect } = require('@playwright/test');

exports.CaptureIdCardPage = class CaptureIdCardPage {
    constructor(page) {
        this.page = page;
        this.buttonCapture = page.getByTestId('captureIdCard');
        this.cameraIdCard = page.getByTestId('cameraIdCard');
        this.buttonBack = page.getByTestId('buttonBack');
        this.buttonNext = page.getByTestId('buttonNext');
    }

    async cameraIdCardDisplay () {
        await expect(this.cameraIdCard).toBeVisible({timeout: 180000 });
    }

    async buttonNextIsDisabled() {
        const parent = await this.page.locator('app-button-next',  { has: this.buttonNext })
        const status = await parent.getAttribute('class');
        expect(status).toContain('disabled');
    }

    async clickButtonCapture () {
        await this.buttonCapture.click();
    }

    async clickButtonNext () {
        await this.buttonNext.click();
    }

    async clickButtonBack () {
        await this.buttonBack.click();
    }
   
}