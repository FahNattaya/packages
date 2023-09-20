const { expect } = require('@playwright/test');

exports.SignContractPage = class SignContractPage {
  constructor(page) {
    this.page = page;
    this.signpad = page.getByTestId('inputSignPad');
    this.buttonClearSign = page.getByTestId('buttonClearSign');
    this.buttonNext = page.getByTestId('buttonNext');
    this.buttonBack = page.getByTestId('buttonBack');
  }

  async signContract() {
    const signPad = await this.signpad.boundingBox();
    const padX = signPad.x + signPad.width / 2
    const padY = signPad.y + signPad.height / 2

    await this.page.mouse.move(padX,padY);
    await this.page.mouse.down();
    await this.page.mouse.move(padX,padY+50);
    await this.page.mouse.move(padX+100,padY+50);
  }

  async clickNext() {
    await this.buttonNext.click();
  }

  async buttonNextIsDisabled() {
    const parent = await this.page.locator('app-button-next',  { has: this.buttonNext })
    const status = await parent.getAttribute('class');
    expect(status).toContain('disabled');
  }

  async clickButtonClearSign() {
    await this.buttonClearSign.click();
  }
}