const { test } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { CartPage } = require('../../pages/cart-page');
const { PaymentMethodPage } = require('../../pages/payment-method-page');
const { GenQueuePage } = require('../../pages/gen-queue-page');
const { users } = require('../../data/data.json');

test.describe('AIS Shop Device Only Ais Care OTP PASS', async () => {
    test('ลูกค้าซื้อเครื่องเปล่า VIVO V5 ด้วย Trade ที่ไม่มีส่วนลด สนใจซื้อ AIS Care +', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        const paymentMethod = new PaymentMethodPage(page);
        const genQueue = new GenQueuePage(page);

        await test.step('ผู้ใช้งานเข้าสู่ระบบ device sales เลือก menu handset & accessory', async () => {
            await mcLogin.gotoLoginPage();
            await mcLogin.loginMyChannel(users.aisshop2.username, users.aisshop2.password);
            await mcLanding.clickButtonHandsetAndAccessory();
        });
        await test.step('ผู้ใช้งาน SKIP การเช็ึคสิทธิ์', async () => {
            await validateCustomer.clickButtonSkip();
        });
        await test.step('ผู้ใช้งานไม่สามารถเห็นรายการ Model Group ได้เนื่องจากยังไม่ได้เลือก Brand', async () => {
            await navBar.navbarDisplay();

            await handsetList.fieldSearchBarDisplay();
            await handsetList.buttonCategoryIsSelected('handset');
            await handsetList.emptyStateBrandDisplay();
            await handsetList.modelContinuousListNotDisplay();
            await handsetList.buttonNextIsDisabled();
        });
        await test.step('ผู้ใช้งานเลือกสินค้า Vivo V5 ได้', async () => {
            await handsetList.selectIconBrand('VIVO');
            await handsetList.selectModel('V5');
            await handsetList.selectProduct('VIVO V5');
            await handsetList.productImageDisplay('VIVO V5');
            await handsetList.clickButtonNEXT('NEXT');
        });
        await test.step('ผู้ใช้งานตรวจสอบ Stock ของสินค้า', async () => {
            await navBar.navbarDisplay();

            await handsetList.buttonCategoryIsSelected('handset');
            await productSelling.checkStockColorDisplay('CROWN GOLD');
        });
        await test.step('ผู้ใช้งานตรวจสอบเลือก Campaign และ Trade', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
            await productSelling.clickTradeByNumber('TP23085208');
        });
        await test.step('ผู้ใช้งานตรวจสอบเลือก Ais Care', async () => {
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAISCarePlus('1');
            await productSelling.inputFieldTextMobileNoForOtp('0934009885');
            await productSelling.clickButtonSendOtp();
            await productSelling.inputTextOtpCode('0000');
            await productSelling.clickButtonVerifyOtp();
            await productSelling.clickButtonOK();
            await productSelling.inputTextEmail('aiscare@test.team');
            await productSelling.clickButtonAddToCart();
            await productSelling.clickButtonOK();
        });
        await test.step('ผู้ใช้งานตรวจสอบสินค้าในตะกร้าสินค้า', async () => {
            await navBar.clickButtonCart();
            await cart.textQuantityDisplay('จำนวน');
            await cart.textPirceDisplay('ราคา');
            await cart.textOrderSummaryDisplay('สรุปรายการสั่งซื้อ')
            await cart.clickButtonPayNow();
        });
        await test.step('ผู้ใช้งานเลือกวิธีจ่ายเงิน', async () => {
            await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
            await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
            await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');

            await paymentMethod.clickPaymentListSubExpand();
            await paymentMethod.selectRadioPayment('Cash');
            await paymentMethod.clickButtonNext('NEXT');
        });
        await test.step('ผู้ใช้งานตรวจสอบหน้าจอในหน้า Gen Queue', async () => {
            await genQueue.textSuccessDisplay();
            await genQueue.iconSuccessDisplay();
        });
    });
    test.afterEach(async ({ page }) => {
        const navBar = new NavBarpage(page);
        const cart = new CartPage(page);

        await navBar.clickButtonCart();
        await cart.clickDeleteAll();
        await cart.dialogDeleteConfirmDisplay();
        await cart.clickConfirmDelete();
        await cart.dialogDeleteSuccessDisplay();
    })
});