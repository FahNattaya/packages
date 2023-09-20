const { test } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { CartPage } = require('../../pages/cart-page');
const { ScanImeiPage } = require('../../pages/scan-imei-page');
const { PaymentMethodPage } = require('../../pages/payment-method-page');
const { users } = require('../../data/data.json');

test.describe('AIS Partner Flow Device Only Gen Receipt', async () => {
    const data = {
        iconBrand: 'APPLE',
        model: 'iPhone 12 Pro Max',
        product: 'iPhone 12 Pro Max 128GB',
        campaignName: 'Handset Only(Redesign Discount)',
        tradeNumber: 'TP23085207',
        color: 'GOLD',
        email: 'dvs-redesign@test.team',
        customerName: 'Redesign Is Real',
        mobileNumber: '0934000623',
        imei: '711121418280008',
    }
    test.beforeEach(async ({ page }) => {
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await validateCustomer.clickButtonSkip();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand(data.iconBrand);
        await handsetList.selectModel(data.model);
        await handsetList.selectProduct(data.product);
        await handsetList.clickButtonNEXT('NEXT');
        await productSelling.clickButtonOK();
        await productSelling.clickButtonColor(data.color);
        await productSelling.selectCustomerCriteria('ONLY');
        await productSelling.clickCampaignByName(data.campaignName);
        await productSelling.clickTradeByNumber(data.tradeNumber);
    });
    test('ลูกค้าเลือกไม่สนใจสมัครรับบริการ และกรอกเบอร์ในหน้าใบเสร็จรับเงินที่ไม่ใช่เบอร์ AIS', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);
        await productSelling.clickButtonServiceCare();
        await productSelling.clickRadioNotInterest();
        await productSelling.selectReason('ยังไม่ตัดสินใจ');
        await productSelling.clickButtonAddToCart();
        await productSelling.inputMobileModal('0934009891');
        await productSelling.clickButtonOK();
        await navBar.clickButtonCart();
        await cart.textQuantityDisplay('จำนวน');
        await cart.textPirceDisplay('ราคา');
        await cart.textOrderSummaryDisplay('สรุปรายการสั่งซื้อ');
        await scanImei.inputProductDisable();
        await scanImei.buttonConfirmIMEIDisable();
        await scanImei.keyInIMEI(data.imei);
        await scanImei.clickButtonConfirmIMEI();
        await scanImei.dialogIMEISuccessDisplay();
        await scanImei.clickDialogOKButton();
        await cart.clickButtonPayNow();

        await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
        await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
        await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
        await paymentMethod.selectRadioPayment('CC');
        await paymentMethod.selectRadioFullpaidType();
        await page.getByRole('radio', { name: 'KBNK' }).click();
        await paymentMethod.inputNumberCreditCard1('4');
        await paymentMethod.inputNumberCreditCard2('0');
        await paymentMethod.inputNumberCreditCard3('2');
        await paymentMethod.inputNumberCreditCard4('3');
        await paymentMethod.inputNumberCreditCard5('3');
        await paymentMethod.inputNumberCreditCard6('9');
        await paymentMethod.inputNumberCreditCard13('5');
        await paymentMethod.inputNumberCreditCard14('5');
        await paymentMethod.inputNumberCreditCard15('5');
        await paymentMethod.inputNumberCreditCard16('5');
        await paymentMethod.clickReceiptAddressTitle();
        await paymentMethod.clickNewAddressButton();
        await paymentMethod.inputCustomerNamePartner(data.customerName);
        await paymentMethod.inputEmailCustomerAISPartner(data.email);
        await paymentMethod.inputMobileNoPartnerForm(data.mobileNumber);
        await paymentMethod.clickButtonConfirmPartner();
        await paymentMethod.selectRadioNewAddress('0');
        await paymentMethod.buttonNextIsEnable();
    });
    test('ลูกค้าสมัครบริการ AIS Care+ และกรอกเบอร์ AIS เพิ่มที่อยู่ใหม่สำหรับออกใบเสร็จรับเงิน', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);
        await productSelling.clickButtonServiceCare();
        await productSelling.selectAISCarePlus('1');
        await productSelling.inputFieldTextMobileNoForOtp('0934009893');
        await productSelling.clickButtonSendOtp();
        await productSelling.inputTextOtpCode('0000');
        await productSelling.clickButtonVerifyOtp();
        await productSelling.clickButtonOK();
        await productSelling.inputTextEmail(data.email);
        await productSelling.clickButtonAddToCart();
        await productSelling.clickButtonOK();
        await navBar.clickButtonCart();
        await cart.textQuantityDisplay('จำนวน');
        await cart.textPirceDisplay('ราคา');
        await cart.textOrderSummaryDisplay('สรุปรายการสั่งซื้อ');
        await scanImei.inputProductDisable();
        await scanImei.buttonConfirmIMEIDisable();
        await scanImei.keyInIMEI(data.imei);
        await scanImei.clickButtonConfirmIMEI();
        await scanImei.dialogIMEISuccessDisplay();
        await scanImei.clickDialogOKButton();
        await cart.clickButtonPayNow();

        await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
        await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
        await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
        await paymentMethod.selectRadioPayment('CC');
        await paymentMethod.selectRadioFullpaidType();
        await page.getByRole('radio', { name: 'KBNK' }).click();
        await paymentMethod.inputNumberCreditCard1('4');
        await paymentMethod.inputNumberCreditCard2('0');
        await paymentMethod.inputNumberCreditCard3('2');
        await paymentMethod.inputNumberCreditCard4('3');
        await paymentMethod.inputNumberCreditCard5('3');
        await paymentMethod.inputNumberCreditCard6('9');
        await paymentMethod.inputNumberCreditCard13('5');
        await paymentMethod.inputNumberCreditCard14('5');
        await paymentMethod.inputNumberCreditCard15('5');
        await paymentMethod.inputNumberCreditCard16('5');
        await paymentMethod.clickReceiptAddressTitle();
        await paymentMethod.clickNewAddressButton();
        await paymentMethod.inputCustomerNamePartner(data.customerName);
        await paymentMethod.inputEmailCustomerAISPartner(data.email);
        await paymentMethod.inputMobileNoPartnerForm(data.mobileNumber);
        await paymentMethod.clickButtonConfirmPartner();
        await paymentMethod.selectRadioAddress('0');
        await paymentMethod.buttonNextIsEnable();
    });
    test('ลูกค้าเลือกสมัครบริการ AIS Care+ และกรอกเบอร์ AIS เลือกที่อยู่ใบเสร็จตามข้อมูลที่อยู่ตามใบแจ้งค่าชำระบริการ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);
        await productSelling.clickButtonServiceCare();
        await productSelling.selectAISCarePlus('1');
        await productSelling.inputFieldTextMobileNoForOtp('0934009892');
        await productSelling.clickButtonSendOtp();
        await productSelling.inputTextOtpCode('0000');
        await productSelling.clickButtonVerifyOtp();
        await productSelling.clickButtonOK();
        await productSelling.inputTextEmail(data.email);
        await productSelling.clickButtonAddToCart();
        await productSelling.clickButtonOK();
        await navBar.clickButtonCart();
        await cart.textQuantityDisplay('จำนวน');
        await cart.textPirceDisplay('ราคา');
        await cart.textOrderSummaryDisplay('สรุปรายการสั่งซื้อ');
        await scanImei.inputProductDisable();
        await scanImei.buttonConfirmIMEIDisable();
        await scanImei.keyInIMEI(data.imei);
        await scanImei.clickButtonConfirmIMEI();
        await scanImei.dialogIMEISuccessDisplay();
        await scanImei.clickDialogOKButton();
        await cart.clickButtonPayNow();

        await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
        await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
        await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
        await paymentMethod.selectRadioPayment('CA');
        await paymentMethod.clickReceiptAddressTitle();
        await paymentMethod.selectRadioAddress('billing');
        await paymentMethod.buttonNextIsEnable();
    });
    test('ลูกค้าเลือกสมัครบริการ AIS Care+ กรอกเบอร์โทรศัพท์ เลือกการชำระเงินเป็นสินเชื่อแสดงที่อยู่ของสินเชื่อ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);
        await productSelling.clickButtonServiceCare();
        await productSelling.selectAISCarePlus('1');
        await productSelling.inputFieldTextMobileNoForOtp('0934009892');
        await productSelling.clickButtonSendOtp();
        await productSelling.inputTextOtpCode('0000');
        await productSelling.clickButtonVerifyOtp();
        await productSelling.clickButtonOK();
        await productSelling.inputTextEmail(data.email);
        await productSelling.clickButtonAddToCart();
        await productSelling.clickButtonOK();
        await navBar.clickButtonCart();
        await cart.textQuantityDisplay('จำนวน');
        await cart.textPirceDisplay('ราคา');
        await cart.textOrderSummaryDisplay('สรุปรายการสั่งซื้อ');
        await scanImei.inputProductDisable();
        await scanImei.buttonConfirmIMEIDisable();
        await scanImei.keyInIMEI(data.imei);
        await scanImei.clickButtonConfirmIMEI();
        await scanImei.dialogIMEISuccessDisplay();
        await scanImei.clickDialogOKButton();
        await cart.clickButtonPayNow();

        await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
        await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
        await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
        await paymentMethod.selectRadioPayment('LS');
        await paymentMethod.selectRadioInstallmentType();
        await paymentMethod.selectRadioInstallBankLS('0')
        await paymentMethod.selectRadioInstallmentChoiceLS('2');
        await paymentMethod.inputConractText('324434323413454343');
        await paymentMethod.clickReceiptAddressTitle();
        await paymentMethod.selectRadioAddress('billing');
        await paymentMethod.buttonNextIsEnable();
    });
    test.afterEach(async ({ page }) => {
        const navBar = new NavBarpage(page);
        const cart = new CartPage(page);

        await navBar.clickButtonCart();
        await cart.clickDeleteAll();
        await cart.dialogDeleteConfirmDisplay();
        await cart.clickConfirmDelete();
        await cart.dialogDeleteSuccessDisplay();
    });
});