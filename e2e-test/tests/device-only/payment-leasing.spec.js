const { test } = require('@playwright/test');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { CartPage } = require('../../pages/cart-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { PaymentMethodPage } = require('../../pages/payment-method-page');
const { ScanImeiPage } = require('../../pages/scan-imei-page');
const { users } = require('../../data/data.json');
const { ServiceCarePage } = require('../../pages/service-care');

test.describe('AIS Mobile Shop Device Sale Only Payment Leasing', async () => {
  test.beforeEach(async ({ page }) => {
    const mcLogin = new MyChannelLoginPage(page);
    const mcLanding = new MyChannelLandingPage(page);
    const validateCustomer = new ValidateCustomerPage(page);
    const navBar = new NavBarpage(page);
    const cart = new CartPage(page);
    const handsetList = new HandSetListPage(page);
    const productSelling = new ProductSellingPage(page);
    const scanImei = new ScanImeiPage(page);
    const serviceCare = new ServiceCarePage(page);

    await mcLogin.gotoLoginPage();
    await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
    await mcLanding.clickButtonHandsetAndAccessory();
    await handsetList.buttonCategoryIsSelected('handset');
    await handsetList.selectIconBrand('APPLE');
    await handsetList.selectModel('iPhone 12 Pro Max');
    await handsetList.selectProduct('iPhone 12 Pro Max 512GB');
    await handsetList.clickButtonNEXT('NEXT');
    await productSelling.clickButtonOK();
    await productSelling.selectCustomerCriteria('ONLY');
    await productSelling.clickButtonColor("GRAPHITE");
    await productSelling.clickCampaignByName('Handset Only(Redesign Discount)');
    await productSelling.clickTradeByNumber('TP23085207');
    await productSelling.clickButtonAddToCart();
    await validateCustomer.inputfieldKeyIn('0934000805');
    await validateCustomer.clickButtonNext();
    await productSelling.clickRadioNotInterest();
    await productSelling.selectReason('ยังไม่ตัดสินใจ');
    await serviceCare.clickButtonNext();
    await scanImei.buttonConfirmIMEIDisable();
    await scanImei.keyInIMEI('711202125550009');
    await scanImei.clickButtonConfirmIMEI();
    await scanImei.dialogIMEISuccessDisplay();
    await scanImei.clickDialogOKButton();
    await cart.clickButtonPayNow();
  });
  test('7.เลือกจ่ายด้วยสินเชื่อ แบบผ่อน กรอกเลขสินเชื่อถูก และไม่กรอกหมายเหตุ', async ({ page }) => {
    const paymentMethod = new PaymentMethodPage(page);
    await paymentMethod.clickProductListExpand();
    await paymentMethod.stepCartStatusSuccess("ตะกร้าสินค้า");
    await paymentMethod.stepPaymentStatusWaiting("จ่ายเงิน");
    await paymentMethod.stepCompleteStatusDefault("เสร็จสิ้น");
    await paymentMethod.selectRadioPayment("LS");
    await paymentMethod.selectRadioInstallmentType();
    await paymentMethod.selectRadioInstallBankLS('0');
    await paymentMethod.selectRadioInstallmentChoiceLS("0");
    await paymentMethod.inputConractText("SF01234568910111213119");
    await paymentMethod.textContractDisplay("ข้อมูลครบถ้วน");
    await paymentMethod.buttonNextIsEnable();
  });

  test('8.เลือกจ่ายด้วยสินเชื่อ แบบผ่อน ไม่กรอกเลขสินเชื่อ และกรอกหมายเหตุ', async ({ page }) => {
    const paymentMethod = new PaymentMethodPage(page);
    await paymentMethod.clickProductListExpand();
    await paymentMethod.stepCartStatusSuccess("ตะกร้าสินค้า");
    await paymentMethod.stepPaymentStatusWaiting("จ่ายเงิน");
    await paymentMethod.stepCompleteStatusDefault("เสร็จสิ้น");
    await paymentMethod.selectRadioPayment("LS");
    await paymentMethod.selectRadioInstallmentType();
    await paymentMethod.selectRadioInstallBankLS('2');
    await paymentMethod.selectRadioInstallmentChoiceLS("0");
    await paymentMethod.inputremarkContract("ssesefef");
    await paymentMethod.textContractDisplay("เลขที่สัญญา");
    await paymentMethod.textContractDisplay("กรุณากรอกเลขสัญญา 21 ตัว (0)");
    await paymentMethod.inputremarkContract("sefsf");
    await paymentMethod.buttonNextIsDisabled();
  });

  test('9.เลือกจ่ายด้วยสินเชื่อ แบบผ่อน กรอกเลขสินเชื่อผิด และกรอกหมายเหตุ', async ({ page }) => {
    const paymentMethod = new PaymentMethodPage(page);
    await paymentMethod.clickProductListExpand();
    await paymentMethod.stepCartStatusSuccess("ตะกร้าสินค้า");
    await paymentMethod.stepPaymentStatusWaiting("จ่ายเงิน");
    await paymentMethod.stepCompleteStatusDefault("เสร็จสิ้น");
    await paymentMethod.selectRadioPayment("LS");
    await paymentMethod.selectRadioInstallmentType();
    await paymentMethod.selectRadioInstallBankLS('2');
    await paymentMethod.selectRadioInstallmentChoiceLS("0");
    await paymentMethod.inputConractText("SF0123456891011121311");
    await paymentMethod.textContractDisplay("ข้อมูลครบถ้วน");
    await paymentMethod.inputremarkContract("ssesefef");
    await paymentMethod.buttonNextIsEnable();
  });

  test('10.เลือกจ่ายด้วยสินเชื่อ แบบผ่อน กรอกเลขสินเชื่อไม่ครบ และกรอกหมายเหตุ', async ({ page }) => {
    const paymentMethod = new PaymentMethodPage(page);
    await paymentMethod.stepCartStatusSuccess("ตะกร้าสินค้า");
    await paymentMethod.stepPaymentStatusWaiting("จ่ายเงิน");
    await paymentMethod.stepCompleteStatusDefault("เสร็จสิ้น");
    await paymentMethod.selectRadioPayment("LS");
    await paymentMethod.selectRadioInstallmentType();
    await paymentMethod.selectRadioInstallBankLS('2');
    await paymentMethod.selectRadioInstallmentChoiceLS("0");
    await paymentMethod.inputConractText("SF012345689101112131");
    await paymentMethod.textContractDisplay("กรุณากรอกเลขสัญญา 21 ตัว (20)");
    await paymentMethod.inputremarkContract("ssesefef");
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