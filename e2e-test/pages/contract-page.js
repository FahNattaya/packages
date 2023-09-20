const { expect } = require("@playwright/test");

exports.ContractPage = class ContractPage {
  constructor(page) {
    this.page = page;
    this.confirmCheckbox = page.getByTestId("confirmCheck");
    this.contractImage = page.getByTestId("contractImage");
    this.nextButton = page.getByTestId("buttonNext");
    this.backButton = page.getByTestId("buttonBack");
  }

  async confirmContract() {
    await expect(this.contractImage).toBeVisible();
    await this.confirmCheckbox.click();
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async clickBack() {
    await this.backButton.click();
  }

  async buttonNextIsDisabled() {
    const parent = await this.page.locator('app-button-next', { has: this.buttonNext })
    const status = await parent.getAttribute('class');
    expect(status).toContain('disabled');
  }
}
