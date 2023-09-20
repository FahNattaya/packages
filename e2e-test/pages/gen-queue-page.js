const { expect } = require('@playwright/test');

exports.GenQueuePage = class GenQueuePage {
  constructor(page) {
    this.page = page;
    this.fieldCustMobile = page.getByTestId('genQueueByMobileNo');
    this.fieldCustQueue = page.getByTestId('genqueueqyqueue');
    this.textSuccess = page.getByTestId('text-success');
    this.iconSuccess = page.getByTestId('icon-success');
    this.nextButton = page.getByTestId('buttonNext');
  }

  async inputQueue(queue) {
    await this.fieldCustQueue.click();
    await this.fieldCustQueue.fill(queue);
  }

  async textSuccessDisplay() {
    await expect(this.textSuccess).toBeVisible();
  }

  async iconSuccessDisplay() {
    await expect(this.iconSuccess).toBeVisible();
  }

  async clickButtonNext() {
    await this.nextButton.click();
  }
}