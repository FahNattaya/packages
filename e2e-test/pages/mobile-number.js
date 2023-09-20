const { expect } = require('@playwright/test');

exports.ListNumberPage = class ListNumberPage {
    constructor(page) {
        this.page = page;
        this.inputSearchBar = page.getByTestId('mobileNumber');
    }
    
    async inputMobileNumber(number) {
        await this.fieldMobileNumber.click();
        await this.fieldMobileNumber.type(number);
    }

}