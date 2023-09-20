const { expect } = require('@playwright/test');

exports.ListNumberPage = class ListNumberPage {
    constructor(page) {
        this.page = page;
        this.inputSearchBar = page.getByTestId('searchBarInput');
        this.buttonSearchBar = page.getByTestId('searchBarButton');
        this.textPleaseSelectNumber = page.getByTestId('textPleaseSelectNumber');
        this.radioNumber = page.locator('#postpaid').getByTestId('radio-number');
        this.buttonPrepaid = page.getByText('Prepaid ');
        this.buttonNext = page.getByTestId('buttonNext');
    }

    async fieldSearchBarDisplay() {
        await expect(this.inputSearchBar).toBeVisible();
        await expect(this.buttonSearchBar).toBeVisible();
    }

    async clickRadioNumber() {
        await this.radioNumber.click();
    }

    async selectChargeType() {
        await this.buttonPrepaid.click();
    }

    async selectNumber(number) {
        await this.page.getByText(`${number} Active`).click();
    }

    async buttonChargeTypeDisplay(button) {
        await expect(this.textPleaseSelectNumber).toBeVisible();
        await expect(this.page.getByText(button)).toBeVisible();
    }

    async clickButtonNext() {
        await this.buttonNext.click();
    }
}