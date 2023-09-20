const { expect } = require('@playwright/test');

exports.CustomerEligiblePage = class CustomerEligiblePage {
  constructor(page) {
    this.page = page;
    this.expendDetailIcon = page.getByTestId('expendDetailIcon');
    this.customerName = page.getByTestId('customerName');
    this.serviceYearMessage = page.getByTestId('serviceYearMessage');
    this.backListMessage = page.getByTestId('backListMessage');
    this.textLoading = page.getByTestId('textLoading');
    this.oneIdTwoContactMessage = page.getByTestId('oneIdTwoContactMessage');
    this.nextButton = page.getByTestId('buttonNext');
  }

  async clickExpandIcon() {
    await this.expendDetailIcon.click();
  }

  async textCustomerNameDisplay(){
    await expect(this.customerName).toBeVisible();
  }

  async customerServiceYearDisplay() {
    await expect(this.serviceYearMessage).toBeVisible();
  }

  async customerContractDisplay() {
    await this.textLoading.waitFor({state: "hidden"})
    await expect(this.oneIdTwoContactMessage).toBeVisible();
  }
}