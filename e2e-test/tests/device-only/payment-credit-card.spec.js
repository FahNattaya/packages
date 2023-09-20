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
const { ServiceCarePage } = require('../../pages/service-care');

test.describe('Payment credit card for partner', async () => {
    test('1.เลือกจ่ายด้วยเงินสดเต็มจำนวน และไม่กรอกหมายเหตุ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const serviceCare = new ServiceCarePage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand('APPLE');
        await handsetList.selectModel('iPhone 12');
        await handsetList.selectProduct('iPhone 12 128GB');
        await handsetList.clickButtonNEXT('NEXT');
        await handsetList.fieldSearchBarDisplay();
        await productSelling.clickButtonOK();
        await productSelling.clickButtonColor('GREEN');
        await productSelling.selectCustomerCriteria('ONLY');
        await productSelling.clickCampaignByName('Handset Only(Redesign Discount)');
        await productSelling.clickTradeByNumber('TP23085207');
        await productSelling.clickButtonAddToCart();
        await validateCustomer.inputfieldKeyIn('0934000806');
        await validateCustomer.clickButtonNext();
        await productSelling.clickRadioNotInterest();
        await productSelling.selectReason('ยังไม่ตัดสินใจ');
        await serviceCare.clickButtonNext();
        // await scanImei.inputProductDisable();
        await scanImei.buttonConfirmIMEIDisable();
        await scanImei.keyInIMEI('904251555460012');
        await scanImei.clickButtonConfirmIMEI();
        // await scanImei.dialogIMEISuccessDisplay();
        await scanImei.clickDialogOKButton();
        await cart.clickButtonPayNow();
        await paymentMethod.counterDisplay();
        await paymentMethod.selectRadioPayment('CA');
        await paymentMethod.inputremarkContract('จ่ายด้วยเงินสด');
        await paymentMethod.clickiconAddress();
        await paymentMethod.buttonNextIsEnable();

    });

    test('2.เลือกจ่ายด้วยบัตรเครดิต แบบผ่อน กรอกเลขบัตรถูก และไม่กรอกหมายเหตุ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const serviceCare = new ServiceCarePage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);


        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand('APPLE');
        await handsetList.selectModel('iPhone 12');
        await handsetList.selectProduct('iPhone 12 128GB');
        await handsetList.clickButtonNEXT('NEXT');
        await handsetList.fieldSearchBarDisplay();
        await productSelling.clickButtonOK();
        await productSelling.clickButtonColor('GREEN');
        await productSelling.selectCustomerCriteria('ONLY');
        await productSelling.clickCampaignByName('Handset Only(Redesign Discount)');
        await productSelling.clickTradeByNumber('TP23085207');
        await productSelling.clickButtonAddToCart();
        await validateCustomer.inputfieldKeyIn('0934000806');
        await validateCustomer.clickButtonNext();
        await productSelling.clickRadioNotInterest();
        await productSelling.selectReason('ยังไม่ตัดสินใจ');
        await serviceCare.clickButtonNext();
        // await scanImei.inputProductDisable();
        await scanImei.buttonConfirmIMEIDisable();
        await scanImei.keyInIMEI('904251555460012');
        await scanImei.clickButtonConfirmIMEI();
        // await scanImei.dialogIMEISuccessDisplay();
        await scanImei.clickDialogOKButton();
        await cart.clickButtonPayNow();
        await paymentMethod.counterDisplay();
        await paymentMethod.selectRadioPayment('CC');
        await paymentMethod.selectRadioInstallmentType();
        await paymentMethod.selectBank('KBNK');
        await paymentMethod.validateNameBankDisplay('KBNK');
        await paymentMethod.selectRadioInstallmentChoice(0);
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
        await paymentMethod.validateTextBankMatch('KBNK');
        await paymentMethod.clickiconAddress();
        await paymentMethod.buttonNextIsEnable();
    });

    test('3.เลือกจ่ายด้วยบัตรเครดิต แบบผ่อน ไม่กรอกเลขบัตร และกรอกหมายเหตุ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const serviceCare = new ServiceCarePage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);


        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand('APPLE');
        await handsetList.selectModel('iPhone 12');
        await handsetList.selectProduct('iPhone 12 128GB');
        await handsetList.clickButtonNEXT('NEXT');
        await handsetList.fieldSearchBarDisplay();
        await productSelling.clickButtonOK();
        await productSelling.clickButtonColor('GREEN');
        await productSelling.selectCustomerCriteria('ONLY');
        await productSelling.clickCampaignByName('Handset Only(Redesign Discount)');
        await productSelling.clickTradeByNumber('TP23085207');
        await productSelling.clickButtonAddToCart();
        await validateCustomer.inputfieldKeyIn('0934000806');
        await validateCustomer.clickButtonNext();
        await productSelling.clickRadioNotInterest();
        await productSelling.selectReason('ยังไม่ตัดสินใจ');
        await serviceCare.clickButtonNext();
        // await scanImei.inputProductDisable();
        await scanImei.buttonConfirmIMEIDisable();
        await scanImei.keyInIMEI('904251555460012');
        await scanImei.clickButtonConfirmIMEI();
        // await scanImei.dialogIMEISuccessDisplay();
        await scanImei.clickDialogOKButton();
        await cart.clickButtonPayNow();
        await paymentMethod.counterDisplay();
        await paymentMethod.selectRadioPayment('CC');
        await paymentMethod.selectRadioInstallmentType();
        await paymentMethod.selectBank('KBNK');
        await paymentMethod.selectRadioInstallmentChoice(0);
        await paymentMethod.inputremarkContract('เครดิตผ่อน');
        await paymentMethod.clickiconAddress();
        await paymentMethod.buttonNextIsDisabled();
    });

    test('4.เลือกจ่ายด้วยบัตรเครดิต แบบผ่อน กรอกเลขบัตรไม่ถูก และกรอกหมายเหตุ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const serviceCare = new ServiceCarePage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);


        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand('APPLE');
        await handsetList.selectModel('iPhone 12');
        await handsetList.selectProduct('iPhone 12 128GB');
        await handsetList.clickButtonNEXT('NEXT');
        await handsetList.fieldSearchBarDisplay();
        await productSelling.clickButtonOK();
        await productSelling.clickButtonColor('GREEN');
        await productSelling.selectCustomerCriteria('ONLY');
        await productSelling.clickCampaignByName('Handset Only(Redesign Discount)');
        await productSelling.clickTradeByNumber('TP23085207');
        await productSelling.clickButtonAddToCart();
        await validateCustomer.inputfieldKeyIn('0934000806');
        await validateCustomer.clickButtonNext();
        await productSelling.clickRadioNotInterest();
        await productSelling.selectReason('ยังไม่ตัดสินใจ');
        await serviceCare.clickButtonNext();
        // await scanImei.inputProductDisable();
        await scanImei.buttonConfirmIMEIDisable();
        await scanImei.keyInIMEI('904251555460012');
        await scanImei.clickButtonConfirmIMEI();
        // await scanImei.dialogIMEISuccessDisplay();
        await scanImei.clickDialogOKButton();
        await cart.clickButtonPayNow();
        await paymentMethod.counterDisplay();
        await paymentMethod.selectRadioPayment('CC');
        await paymentMethod.selectRadioInstallmentType();
        await paymentMethod.selectBank('KBNK');
        await paymentMethod.selectRadioInstallmentChoice(0);
        await paymentMethod.inputNumberCreditCard1('5');
        await paymentMethod.inputNumberCreditCard2('0');
        await paymentMethod.inputNumberCreditCard3('2');
        await paymentMethod.inputNumberCreditCard4('3');
        await paymentMethod.inputNumberCreditCard5('3');
        await paymentMethod.inputNumberCreditCard6('9');
        await paymentMethod.inputNumberCreditCard13('4');
        await paymentMethod.inputNumberCreditCard14('5');
        await paymentMethod.inputNumberCreditCard15('6');
        await paymentMethod.inputNumberCreditCard16('0');
        await paymentMethod.validateTextBankErrorDisplay('เลขที่บัตรเครดิตไม่ตรงกับธนาคารที่เลือก');
        await paymentMethod.inputremarkContract('เครดิตผ่อน');
        await paymentMethod.clickiconAddress();
        await paymentMethod.buttonNextIsDisabled();
    });

    test('5.เลือกจ่ายด้วยบัตรเครดิต แบบผ่อน กรอกเลขบัตรไม่ครบ และกรอกหมายเหตุ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const serviceCare = new ServiceCarePage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);


        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand('APPLE');
        await handsetList.selectModel('iPhone 12');
        await handsetList.selectProduct('iPhone 12 128GB');
        await handsetList.clickButtonNEXT('NEXT');
        await handsetList.fieldSearchBarDisplay();
        await productSelling.clickButtonOK();
        await productSelling.clickButtonColor('GREEN');
        await productSelling.selectCustomerCriteria('ONLY');
        await productSelling.clickCampaignByName('Handset Only(Redesign Discount)');
        await productSelling.clickTradeByNumber('TP23085207');
        await productSelling.clickButtonAddToCart();
        await validateCustomer.inputfieldKeyIn('0934000806');
        await validateCustomer.clickButtonNext();
        await productSelling.clickRadioNotInterest();
        await productSelling.selectReason('ยังไม่ตัดสินใจ');
        await serviceCare.clickButtonNext();
        // await scanImei.inputProductDisable();
        await scanImei.buttonConfirmIMEIDisable();
        await scanImei.keyInIMEI('904251555460012');
        await scanImei.clickButtonConfirmIMEI();
        // await scanImei.dialogIMEISuccessDisplay();
        await scanImei.clickDialogOKButton();
        await cart.clickButtonPayNow();
        await paymentMethod.counterDisplay();
        await paymentMethod.selectRadioPayment('CC');
        await paymentMethod.selectRadioInstallmentType();
        await paymentMethod.selectBank('KBNK');
        await paymentMethod.selectRadioInstallmentChoice(0);
        await paymentMethod.inputNumberCreditCard1('4');
        await paymentMethod.inputNumberCreditCard2('0');
        await paymentMethod.inputNumberCreditCard3('2');
        await paymentMethod.inputNumberCreditCard4('3');
        await paymentMethod.inputNumberCreditCard5('3');
        await paymentMethod.inputNumberCreditCard6('9');
        await paymentMethod.inputNumberCreditCard13('4');
        await paymentMethod.inputremarkContract('เครดิตผ่อน');
        await paymentMethod.clickiconAddress();
        await paymentMethod.buttonNextIsDisabled();
    });

    test('6.เลือกจ่ายด้วยบัตรเครดิต แบบเต็มจำนวน กรอกเลขบัตรถูก และไม่กรอกหมายเหตุ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const serviceCare = new ServiceCarePage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);


        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand('APPLE');
        await handsetList.selectModel('iPhone 12 Pro Max');
        await handsetList.selectProduct('iPhone 12 Pro Max 512GB');
        await handsetList.clickButtonNEXT('NEXT');
        await productSelling.clickButtonOK();
        await productSelling.selectCustomerCriteria('ONLY');
        await productSelling.clickButtonColor("GRAPHITE");
        await productSelling.clickCampaignByName('Handset Only(Redesign No Discount)');
        await productSelling.clickTradeByNumber('TP23095218');
        await productSelling.clickButtonAddToCart();
        await validateCustomer.inputfieldKeyIn('0934000806');
        await validateCustomer.clickButtonNext();
        await productSelling.clickRadioNotInterest();
        await productSelling.selectReason('ยังไม่ตัดสินใจ');
        await serviceCare.clickButtonNext();
        // await scanImei.inputProductDisable();
        await scanImei.buttonConfirmIMEIDisable();
        await scanImei.keyInIMEI('711202125550009');
        await scanImei.clickButtonConfirmIMEI();
        // await scanImei.dialogIMEISuccessDisplay();
        await scanImei.clickDialogOKButton();
        await cart.clickButtonPayNow();
        await paymentMethod.counterDisplay();
        await paymentMethod.validatePaymentDisplay('CA');
        await paymentMethod.validatePaymentNoDisplay('LS');
        await paymentMethod.selectRadioPayment('CC');
        await paymentMethod.validatePaymentCreditInstallmentNoDisplay('ผ่อนชำระ');
        await paymentMethod.selectRadioFullpaidType();
        await paymentMethod.selectBank('KBNK');
        await paymentMethod.inputNumberCreditCard1('4');
        await paymentMethod.inputNumberCreditCard2('0');
        await paymentMethod.inputNumberCreditCard3('2');
        await paymentMethod.inputNumberCreditCard4('3');
        await paymentMethod.inputNumberCreditCard5('3');
        await paymentMethod.inputNumberCreditCard6('9');
        await paymentMethod.inputNumberCreditCard13('4');
        await paymentMethod.inputNumberCreditCard14('5');
        await paymentMethod.inputNumberCreditCard15('6');
        await paymentMethod.inputNumberCreditCard16('0');
        await paymentMethod.clickiconAddress();
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