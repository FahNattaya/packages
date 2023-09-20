const { expect } = require('@playwright/test');

exports.PaymentMethodPage = class PaymentMethodPage {
    constructor(page) {
        this.page = page;

        this.productListTitle = page.getByTestId('productListTitle');
        this.stepCart = page.getByTestId('stepCart');
        this.stepPayment = page.getByTestId('stepPayment');
        this.stepComplete = page.getByTestId('stepComplete');
        this.textTitlePageName = page.getByTestId('textTitlePageName');
        this.iconOrderList = page.getByTestId('icon-order-list');
        this.iconPayment = page.getByTestId('icon-payment');
        this.counter = page.getByTestId('creditCardButton');
        this.clickCounter = page.getByTestId("icon-payment-couter")
        this.radioFullpaidType = page.getByTestId('rdo-fullpaid-type');
        this.radioInstallmentType = page.getByTestId('rdo-installment-type');
        this.productListTitle = page.getByTestId('productListTitle');
        this.paymentListSub = page.getByTestId('payment-list');
        this.receiptAddressTitle = page.getByTestId('receiptAddressTitle');
        this.buttonNext = page.getByTestId('buttonNext');
        this.fieldInputCreditCard1 = page.getByTestId('otpInput-0');
        this.fieldInputCreditCard2 = page.getByTestId('otpInput-1');
        this.fieldInputCreditCard3 = page.getByTestId('otpInput-2');
        this.fieldInputCreditCard4 = page.getByTestId('otpInput-3');
        this.fieldInputCreditCard5 = page.getByTestId('otpInput-4');
        this.fieldInputCreditCard6 = page.getByTestId('otpInput-5');
        this.fieldInputCreditCard13 = page.getByTestId('otpInput-12');
        this.fieldInputCreditCard14 = page.getByTestId('otpInput-13');
        this.fieldInputCreditCard15 = page.getByTestId('otpInput-14');
        this.fieldInputCreditCard16 = page.getByTestId('otpInput-15');
        this.TaxBar = page.getByTestId('paymentListTitle');
        this.TaxBarIcon = page.getByTestId('icon-address');
        this.fieldAddressPhoneNumberInput = page.getByTestId('addressPhoneNumberInput');
        this.buttonAddressPhoneNumberConfirm = page.getByTestId('addressPhoneNumberConfirm');
        this.newAddressButton = page.getByTestId('newAddressButton');
        this.fieldConractText = page.getByTestId('contractNumberInput');
        this.fieldremarkContractInputText = page.getByTestId('remarkContractNumberInput');
        this.cliclIconAddress = page.getByTestId('icon-address');
        this.clickIconCustomer = page.getByTestId('customer');
        this.clicAddresscustomer = page.getByTestId('addresscustomer');
        this.clickBillingcddress = page.getByTestId('billing-address');
        this.buttonErrorOk = page.getByText('OK');
        this.buttonConfirm = page.getByTestId('buttonConfirm');
        this.fieldidCard = page.getByTestId('id-card');
        this.fieldCustomerName = page.getByTestId('customer-name');
        this.fieldCustomerNamePartner = page.getByTestId('customer-name-partner');
        this.fieldHomeNo = page.getByTestId('home-no');
        this.fieldMoo = page.getByTestId('moo');
        this.fieldMooBan = page.getByTestId('mooBan');
        this.fieldBuildingName = page.getByTestId('building-name');
        this.fieldFloor = page.getByTestId('floor');
        this.fieldRoom = page.getByTestId('room');
        this.fieldProvince = page.getByTestId('province');
        this.fieldAmphur = page.getByTestId('amphur').getByPlaceholder('อำเภอ');
        this.fieldTumbol = page.getByTestId('tumbol').getByPlaceholder('ตำบล');
        this.fieldEmailCustomer = page.getByTestId('email');
        this.fieldEmailPartnerForm = page.getByTestId('email-partner-form');
        this.fieldOtherMobileNo = page.getByTestId('otherMobileNo');
        this.fieldMobileNoPartnerForm = page.getByTestId('mobile-no-partner-form');
        this.radioInstallmentLS = page.getByTestId('rdo-installment-choice');
        this.buttonErrorOk = page.getByText('OK');
    }

    async selectRadioInstallmentChoiceLS(index) {
        await this.page.locator(`id=rdoInstallChoiceLS${index}`).click();
    }

    async textContractDisplay(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async clickButtonErrorOk() {
        await this.buttonErrorOk.click()
    }

    async productListTitleDisplay(title) {
        await expect(this.productListTitle).toContainText(title);
    }

    async stepCompleteStatusDefault(title) {
        const status = await this.stepComplete.getAttribute('class');
        expect(status).toContain('default');
        await expect(this.stepComplete).toContainText(title);
    }

    async stepPaymentStatusWaiting(title) {
        const status = await this.stepPayment.getAttribute('class');
        expect(status).toContain('waiting');
        await expect(this.stepPayment).toContainText(title);
    }

    async stepCartStatusSuccess(title) {
        const status = await this.stepCart.getAttribute('class');
        expect(status).toContain('success');
        await expect(this.stepCart).toContainText(title);
    }

    async textTitlePageNameDisplay(title) {
        await expect(this.textTitlePageName).toContainText(title);
    }

    async textPaymentDisplay(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async clickIconOrderList() {
        await this.iconOrderList.click();
    }

    async counterDisplay() {
        await expect(this.counter).toBeVisible();
    }

    async clickCounter() {
        await this.clickCounter.click();
    }

    async clickReceiptAddressTitle() {
        await this.receiptAddressTitle.click();
    }

    async clickPayMentCash() {
        await this.payMentCash.click();
    }

    async clickPaymentCreditCard() {
        await this.radioCreditCard.click();
    }

    async selectRadioPayment(paymentname) {
        await this.page.getByTestId(`rdoPaymentMethod-${paymentname}`).click();
    }

    async selectRadioFullpaidType() {
        await this.radioFullpaidType.click();
    }

    async selectRadioFullPaidBank(index) {
        await this.page.locator(`id=rdoFullPaidBankCC${index}`).click();
    }

    async selectRadioInstallmentChoice(index) {
        await this.page.locator(`id=rdoInstallChoiceCC${index}`).click();
    }

    async selectRadioInstallBank(index) {
        await this.page.locator(`id=rdoInstallBankCC${index}`).click();
    }

    async validateNameBankDisplay(nameBank) {
        await expect(this.page.getByRole('radio', { name: `${nameBank}` })).toBeVisible();
    }

    async selectBank(nameBank){
        await this.page.getByRole('radio', { name: `${nameBank}` }).click();
    }

    async selectRadioInstallmentType() {
        await this.radioInstallmentType.click();
    }

    async selectRadioAddress(address) {
        await this.page.getByTestId(`address${address}`).click();

    }

    async selectRadioNewAddress(index) {
        await this.page.getByTestId(`New${index}`).click();
    }

    async inputAddressCustomerName(homeNo, moo, mooBan, buildingName, floor, room, provinceName, amphurName, tumbolName, zipCode) {
        await this.fieldHomeNo.click();
        await this.fieldHomeNo.fill(homeNo);
        await this.fieldMoo.click();
        await this.fieldMoo.fill(moo);
        await this.fieldMooBan.click();
        await this.fieldMooBan.fill(mooBan);
        await this.fieldBuildingName.click();
        await this.fieldBuildingName.fill(buildingName);
        await this.fieldFloor.click();
        await this.fieldFloor.fill(floor);
        await this.fieldRoom.click();
        await this.fieldRoom.fill(room);
        await this.fieldProvince.getByPlaceholder('จังหวัด').click();
        await this.fieldProvince.getByPlaceholder('จังหวัด').fill(provinceName);
        await this.fieldProvince.getByText(provinceName).click();
        await this.fieldAmphur.click();
        await this.fieldAmphur.fill(amphurName);
        await this.page.getByText((amphurName), { exact: true }).click();
        await this.fieldTumbol.click();
        await this.fieldTumbol.fill(tumbolName);
        await this.page.getByText((zipCode)).click();
    }

    async inputCustomerName(idCard, customerName) {
        await this.fieldidCard.click();
        await this.fieldidCard.fill(idCard);
        await this.fieldCustomerName.click();
        await this.fieldCustomerName.fill(customerName);
    }

    async inputCustomerNamePartner(customerNamePartner) {
        await this.fieldCustomerNamePartner.click();
        await this.fieldCustomerNamePartner.fill(customerNamePartner);
    }

    async inputEmailCustomer(emailCustomer) {
        await this.fieldEmailCustomer.click();
        await this.fieldEmailCustomer.fill(emailCustomer);
    }

    async inputEmailCustomerAISPartner(emailCusPartner) {
        await this.fieldEmailPartnerForm.click();
        await this.fieldEmailPartnerForm.fill(emailCusPartner);
    }

    async inputOtherMobileNo(otherMobileNo) {
        await this.fieldOtherMobileNo.click();
        await this.fieldOtherMobileNo.fill(otherMobileNo);
    }

    async inputMobileNoPartnerForm(mobileNoPartner) {
        await this.fieldMobileNoPartnerForm.click();
        await this.fieldMobileNoPartnerForm.fill(mobileNoPartner);
    }

    async clickProductListExpand() {
        await this.productListTitle.click();
    }

    async clickPaymentListExpand() {
        await this.paymentListTitle.click();
    }

    async clickPaymentListSubExpand(index) {
        await this.page.getByTestId(`collapse-payment-${index}`).click();
    }

    async radioBankIsSelected(bankName) {
        const status = await this.page.getByTestId('rdo-fullpaid-bank').getAttribute('alt');
        expect(status).toContain(`${bankName}`);
    }

    async clickNewAddressButton() {
        await this.newAddressButton.click();
    }

    async inputNumberCreditCard1(text) {
        await this.fieldInputCreditCard1.click();
        await this.fieldInputCreditCard1.type(text);

    }

    async inputNumberCreditCard2(text) {
        await this.fieldInputCreditCard2.click();
        await this.fieldInputCreditCard2.type(text);
    }

    async inputNumberCreditCard3(text) {
        await this.fieldInputCreditCard3.click();
        await this.fieldInputCreditCard3.type(text);
    }

    async inputNumberCreditCard4(text) {
        await this.fieldInputCreditCard4.click();
        await this.fieldInputCreditCard4.type(text);
    }

    async inputNumberCreditCard5(text) {
        await this.fieldInputCreditCard5.click();
        await this.fieldInputCreditCard5.type(text);
    }

    async inputNumberCreditCard6(text) {
        await this.fieldInputCreditCard6.click();
        await this.fieldInputCreditCard6.type(text);
    }

    async inputNumberCreditCard13(text) {
        await this.fieldInputCreditCard13.click();
        await this.fieldInputCreditCard13.type(text);
    }

    async clickNumberCreditCard13(text) {
        await this.fieldInputCreditCard13.click();
    }

    async inputNumberCreditCard14(text) {
        await this.fieldInputCreditCard14.click();
        await this.fieldInputCreditCard14.type(text);
    }

    async inputNumberCreditCard15(text) {
        await this.fieldInputCreditCard15.click();
        await this.fieldInputCreditCard15.type(text);
    }

    async inputNumberCreditCard16(text) {
        await this.fieldInputCreditCard16.click();
        await this.fieldInputCreditCard16.type(text);
    }

    async validateNameBankDisplay(nameBank) {
        await expect(this.page.getByRole('radio', { name: `${nameBank}` })).toBeVisible();
    }

    async validateTextBankErrorDisplay(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async validateTextBankMatch(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async validatePaymentDisplay(paymentName) {
        await expect(this.page.locator(`id=rdoPayment-${paymentName}`)).toBeVisible({delay : 3000});
    }

    async validatePaymentNoDisplay(paymentName) {
        await expect(this.page.locator(`id=rdoPayment-${paymentName}`)).not.toBeVisible();
    }

    async validatePaymentCreditInstallmentNoDisplay(text) {
        await expect(this.page.getByText(text)).not.toBeVisible();
    }

    async clickTaxBar() {
        await this.TaxBar.click();
    }

    async clickTaxBarIcon() {
        await this.TaxBarIcon.click();
    }

    async clearfieldAddressPhoneNumberInput(text) {
        await this.fieldAddressPhoneNumberInput.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await this.fieldAddressPhoneNumberInput.fill(text);
        await this.buttonAddressPhoneNumberConfirm.click();

    }

    async clickButtonNext(title) {
        await expect(this.buttonNext).toContainText(title);
        await this.buttonNext.click();
    }

    async buttonNextIsDisabled() {
        const parent = await this.page.locator('app-button-next', { has: this.buttonNext })
        const status = await parent.getAttribute('class');
        expect(status).toContain('disabled');
    }

    async buttonNextIsEnable() {
        const parent = await this.page.locator('app-button-next', { has: this.buttonNext })
        const status = await parent.getAttribute('class');
        expect(status).not.toContain('disabled');
    }

    async inputConractText(text) {
        await this.fieldConractText.click();
        await this.fieldConractText.type(text);
    }

    async inputremarkContract(text) {
        await this.fieldremarkContractInputText.click();
        await this.fieldremarkContractInputText.type(text);
    }

    async clickiconAddress() {
        await this.cliclIconAddress.click();
    }

    async clickiconCustomerAddress() {
        await this.clickIconCustomer.click();
    }

    async selectRadioInstallBankLS(index) {
        await this.page.locator(`id=rdoInstallBankLS${index}`).click();
    }

    async clicAddressCusomer() {
        await this.clickAddresscustomer.click();
    }

    async clickBillingAdBress() {
        await this.clickBillingaddress.click();
    }

    async clickButtonConfirm() {
        await this.buttonConfirm.click();
    }

    async clickButtonConfirmPartner() {
        await this.page.getByTestId('partner-address-form').getByTestId('buttonConfirm').click();
    }
}