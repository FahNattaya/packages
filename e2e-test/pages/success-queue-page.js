const { expect } = require('@playwright/test');

exports.SuccessQueuePage = class SuccessQueuePage {
  constructor(page) {
    this.page = page;
    this.textSuccessTitle = page.getByTestId('text-success')
    this.textQueueNoTitle = page.getByTestId('text-queue');
    this.textQueueNo = page.getByTestId('queue-number');
  }

  async titleSuccessDisplay(success) {
    await expect(this.textSuccessTitle).toContainText(success);
  }

  async queueTitleDisplay(title) {
    await expect(this.textQueueNoTitle).toContainText(title);
  }
  
  async queueNoDisplay(queue) {
    await expect(this.textQueueNo).toContainText(queue);
  }
}