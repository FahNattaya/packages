const { expect } = require('@playwright/test');

exports.ServiceCarePage = class ServiceCarePage {
    constructor(page) {
        this.page = page;
        this.buttonNext = page.getByTestId('buttonNext');
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


}