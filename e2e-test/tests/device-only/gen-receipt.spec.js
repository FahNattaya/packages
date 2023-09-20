const { test } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { CartPage } = require('../../pages/cart-page');
const { PaymentMethodPage } = require('../../pages/payment-method-page');
const { users } = require('../../data/data.json');

test.describe('AIS Shop Device Only Gen Receipt', async () => {
    const data = {
        iconBrand: 'APPLE',
        model: 'iPhone 12 Pro Max',
        product: 'iPhone 12 Pro Max 128GB',
        campaignName: 'Handset Only(Redesign Discount)',
        tradeNumber: 'TP23085207',
        color: 'GOLD',
        email: 'dvs-redesign@test.team',
    }
    const addressData = {
        idCard: '2345456038595',
        customerName: 'นายมาซื้อของ ที่ช้อป',
        homeNo: '88/8',
        moo: '8',
        mooBan: 'รักเธอทุกวัน',
        buildingName: 'ตึก8',
        floor: '8',
        room: '8',
        provinceName: 'กรุงเทพ',
        amphurName: 'สายไหม',
        tumbolName: 'สายไหม',
        zipCode: 'สายไหม (10220)',
        emailCustomer: '-',
        otherMobileNo: '0934005555',
    }
    test.beforeEach(async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.aisshop2.username, users.aisshop2.password);
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
        await productSelling.clickButtonServiceCare();
        await productSelling.selectAISCarePlus('1');
        await productSelling.inputFieldTextMobileNoForOtp('0934009897');
        await productSelling.clickButtonSendOtp();
        await productSelling.inputTextOtpCode('0000');
        await productSelling.clickButtonVerifyOtp();
        await productSelling.clickButtonOK();
        await productSelling.inputTextEmail('dvs-redesign@test.team');
        await productSelling.clickButtonAddToCart();
        await productSelling.clickButtonOK();
        await navBar.clickButtonCart();
        await cart.textQuantityDisplay('จำนวน');
        await cart.textPirceDisplay('ราคา');
        await cart.textOrderSummaryDisplay('สรุปรายการสั่งซื้อ')
        await cart.clickButtonPayNow();
    });
    test('ลูกค้าเลือกที่อยู่ตามบัตรประชาชน', async ({ page }) => {
        const paymentMethod = new PaymentMethodPage(page);
        await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
        await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
        await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
        await paymentMethod.selectRadioPayment('CA');
        await paymentMethod.clickReceiptAddressTitle();
        await paymentMethod.selectRadioAddress('customer');
        await paymentMethod.buttonNextIsEnable();
    });
    test('ลูกค้าเลือกที่อยู่ตามใบแจ้งค่าชำระบริการ', async ({ page }) => {
        const paymentMethod = new PaymentMethodPage(page);
        await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
        await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
        await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
        await paymentMethod.selectRadioPayment('CA');
        await paymentMethod.clickReceiptAddressTitle();
        await paymentMethod.selectRadioAddress('billing');
        await paymentMethod.buttonNextIsEnable();
    });
    test('ลูกค้าเลือกที่อยู่ใหม่', async ({ page }) => {
        const paymentMethod = new PaymentMethodPage(page);
        await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
        await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
        await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
        await paymentMethod.selectRadioPayment('LS');
        await paymentMethod.clickReceiptAddressTitle();
        await paymentMethod.clickNewAddressButton();
        await paymentMethod.inputCustomerName(addressData.idCard, addressData.customerName);
        await paymentMethod.inputAddressCustomerName(addressData.homeNo,
            addressData.moo, addressData.mooBan, addressData.buildingName,
            addressData.floor, addressData.room, addressData.provinceName,
            addressData.amphurName, addressData.tumbolName, addressData.zipCode);
        await paymentMethod.inputEmailCustomer(addressData.emailCustomer);
        await paymentMethod.inputOtherMobileNo(addressData.otherMobileNo);
        await paymentMethod.clickButtonConfirm();
        await paymentMethod.selectRadioNewAddress('0');
        await paymentMethod.buttonNextIsEnable();
    });
    test('ลูกค้ากรอกเบอร์ที่ไม่ใช่เบอร์ AIS ในหน้าข้อมูลใบเสร็จรับเงิน', async ({ page }) => {
        const paymentMethod = new PaymentMethodPage(page);
        await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
        await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
        await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
        await paymentMethod.selectRadioPayment('CA');
        await paymentMethod.clickReceiptAddressTitle();
        await paymentMethod.clearfieldAddressPhoneNumberInput('0912112123');
        await paymentMethod.clickNewAddressButton();
        await paymentMethod.inputCustomerName(addressData.idCard, addressData.customerName);
        await paymentMethod.inputAddressCustomerName(addressData.homeNo,
            addressData.moo, addressData.mooBan, addressData.buildingName,
            addressData.floor, addressData.room, addressData.provinceName,
            addressData.amphurName, addressData.tumbolName, addressData.zipCode);
        await paymentMethod.inputEmailCustomer(addressData.emailCustomer);
        await paymentMethod.inputOtherMobileNo(addressData.otherMobileNo);
        await paymentMethod.clickButtonConfirm();
        await paymentMethod.selectRadioNewAddress('0');
        await paymentMethod.buttonNextIsEnable();
    });
    test('ลูกค้ากรอกเบอร์ AIS และแก้ไขเบอร์ในหน้าใบเสร็จรับเงินเป็นเบอร์ AIS เบอร์อื่น', async ({ page }) => {
        const paymentMethod = new PaymentMethodPage(page);
        await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
        await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
        await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
        await paymentMethod.selectRadioPayment('CA');
        await paymentMethod.clickReceiptAddressTitle();
        await paymentMethod.clearfieldAddressPhoneNumberInput('0934000624');
        await paymentMethod.selectRadioAddress('billing');
        await paymentMethod.buttonNextIsEnable();
    });
    test('ลูกค้าสมัครบริการ AIS Care+ และกรอกเบอร์ AIS และแก้ไขเบอร์ในหน้าใบเสร็จรับเงินเป็นเบอร์ NON AIS', async ({ page }) => {
        const paymentMethod = new PaymentMethodPage(page);
        await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
        await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
        await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
        await paymentMethod.selectRadioPayment('CA');
        await paymentMethod.clickReceiptAddressTitle();
        await paymentMethod.clearfieldAddressPhoneNumberInput('0886888866');
        await paymentMethod.clickNewAddressButton();
        await paymentMethod.inputCustomerName(addressData.idCard, addressData.customerName);
        await paymentMethod.inputAddressCustomerName(addressData.homeNo,
            addressData.moo, addressData.mooBan, addressData.buildingName,
            addressData.floor, addressData.room, addressData.provinceName,
            addressData.amphurName, addressData.tumbolName, addressData.zipCode);
        await paymentMethod.inputEmailCustomer(addressData.emailCustomer);
        await paymentMethod.inputOtherMobileNo(addressData.otherMobileNo);
        await paymentMethod.clickButtonConfirm();
        await paymentMethod.selectRadioNewAddress('0');
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