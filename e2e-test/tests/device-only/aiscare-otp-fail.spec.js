const { test } = require('@playwright/test');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { users } = require('../../data/data.json');

test.describe('AIS Shop Device Only Ais Care OTP Fail', async () => {
    test.beforeEach(async ({ page }) => {
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.aisshop1.username, users.aisshop1.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await validateCustomer.clickButtonSkip();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand('APPLE');
        await handsetList.selectModel('iPhone 12 Pro Max');
        await handsetList.selectProduct('iPhone 12 Pro Max 512GB');
        await handsetList.clickButtonNEXT('NEXT');
    });
    test('ลูกค้าเลือกซื้อ iphone 12 pro max 512GB พร้อม AIS CARE กดปุ่ม Send OTP โดยไม่กรอกเบอร์', async ({ page }) => {
        const productSelling = new ProductSellingPage(page);
        await test.step('ผู้ใช้งานกดปุ่ม Send OTP', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
            await productSelling.clickTradeByNumber('TP23085207');
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAISCarePlus('0');
            await productSelling.buttonSendOtpDisabled();
        });
    });
    test('ลูกค้าเลือกซื้อ iphone 12 pro max 512GB พร้อม AIS CARE กรอกเบอร์ที่ไม่ใช่เบอร์ AIS', async ({ page }) => {
        const productSelling = new ProductSellingPage(page);
        await test.step('กรอกเบอร์ ที่ไม่ใช่เบอร์ AIS', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
            await productSelling.clickTradeByNumber('TP23085207');
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAISCarePlus('0');
            await productSelling.inputFieldTextMobileNoForOtp('0900000090');
            await productSelling.clickButtonSendOtp();
            await productSelling.clickButtonOK();
            await productSelling.buttonAddToCartDisabled();
        });
    });
    test('ลูกค้าเลือกซื้อ iphone 12 pro max 512GB พร้อม AIS CARE กรอกเลข OTP ไม่ถูกต้อง', async ({ page }) => {
        const productSelling = new ProductSellingPage(page);
        await test.step('กรอกเลข OTP ไม่ถูกต้อง', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
            await productSelling.clickTradeByNumber('TP23085207');
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAISCarePlus('1');
            await productSelling.inputFieldTextMobileNoForOtp('0934009891');
            await productSelling.clickButtonSendOtp();
            await productSelling.inputTextOtpCode('4321');
            await productSelling.clickButtonVerifyOtp();
            await productSelling.clickButtonOK();
            await productSelling.buttonAddToCartDisabled();
        });
    });
    test('ลูกค้าเลือกซื้อ iphone 12 pro max 512GB พร้อม AIS CARE กรอกเบอร์ AIS ที่มี 2 สิทธิ์', async ({ page }) => {
        const productSelling = new ProductSellingPage(page);
        await test.step('สิทธิ์ในการสมัคร AIS Care เต็ม', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
            await productSelling.clickTradeByNumber('TP23085207');
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAISCarePlus('0');
            await productSelling.inputFieldTextMobileNoForOtp('0934009896');
            await productSelling.clickButtonSendOtp();
            await productSelling.inputTextOtpCode('0000');
            await productSelling.clickButtonVerifyOtp();
            await productSelling.clickButtonClose();
            await productSelling.inputTextEmail('unicorn@test.team');
            await productSelling.buttonAddToCartDisabled();
        });
    });
});