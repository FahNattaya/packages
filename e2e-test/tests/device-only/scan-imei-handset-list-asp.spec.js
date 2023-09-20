const { test } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { ScanImeiPage } = require('../../pages/scan-imei-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { CartPage } = require('../../pages/cart-page');
const { users } = require('../../data/data.json');

test.beforeEach(async ({ page }) => {
    const mcLogin = new MyChannelLoginPage(page);
    const mcLanding = new MyChannelLandingPage(page);
    const validateCustomer = new ValidateCustomerPage(page);

    await mcLogin.gotoLoginPage();
    await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
    await mcLanding.clickButtonHandsetAndAccessory();
    await validateCustomer.clickButtonSkip();
});
test.describe('AIS Shop Handset Only Scan IMEI', async () => {  
    test('ผู้ใช้งาน Scan IMEI เครื่อง AIS รุ่น iPhone 12 128GB ในหน้า Handset List และแสดง Brand/Model/Campaign ในหน้า Product Selling ได้ถูกต้อง', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const scanImei = new ScanImeiPage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);

        const data = {
            mobileNo: '0934009887',
            imei_no_dt: '904251555460000',
            imei_no_sff: '904251555460028',
            campaign: 'Handset Only(Redesign Discount)',
            trade: 'TP23085207',
        }
        const iphone = {
            imei: '904251555460081',
            product: 'iPhone 12 128GB',
            productFull: 'APPLE IP12_128GB GREEN',
            price: '31,900',
        }
        const vivo = {
            imei: '710271546240342',
            product: 'VIVO V5',
            productFull: 'VIVO V5 CROWN GOLD',
            price: '12,990',
        }

        await test.step('ผู้ใช้งาน Scan IMEI ที่ไม่พบใน DT ในหน้า Handset List', async () => {
            await navBar.navbarDisplay();

            await scanImei.clickButtonScanIMEI();
            await scanImei.inputImeiModalIsEmpty();
            await scanImei.keyInIMEI(data.imei_no_dt);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIMEINotFoundDTDisplay();
            await scanImei.clickDialogOKButton();   
        });
        await test.step('ผู้ใช้งาน Scan IMEI ที่ไม่พบใน SFF ในหน้า Handset List', async () => {
            await scanImei.keyInIMEI(data.imei_no_sff);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIMEINotFoundSFFDisplay();
            await scanImei.clickDialogOKButton();
        });
        await test.step('ผู้ใช้งาน Scan IMEI เครื่อง VIVO V5 ได้', async () => {
            await navBar.navbarDisplay();

            await scanImei.keyInIMEI(vivo.imei);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.inputProductDisplay(vivo.productFull);
            await scanImei.inputPriceDisplay(vivo.price);
            await scanImei.clickButtonNextIMEI();
        });
        await test.step('ผู้ใช้งานตรวจสอบข้อมูลรุ่นที่เลือกมาในหน้า Product-selling', async () => {
            await productSelling.clickButtonOK();
            await productSelling.selectCustomerCriteria('ONLY');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay(vivo.product);
            await productSelling.textProductPriceDisplay(vivo.price);
        });
        await test.step('ผู้ใช้งาน Scan IMEI เครื่อง iPhone 12 128GB GREEN ในหน้า Product-selling ได้', async () => {
            await navBar.navbarDisplay();

            await scanImei.clickButtonScanIMEI();
            await scanImei.keyInIMEI(iphone.imei);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.inputProductDisplay(iphone.productFull);
            await scanImei.inputPriceDisplay(iphone.price);
            await scanImei.clickButtonNextIMEI();

            await productSelling.textProductNameDisplay(iphone.product);
            await productSelling.textProductPriceDisplay(iphone.price);
            await productSelling.buttonAppleCareDisplay();
        });
        await test.step('ผู้ใช้งานสามารถเลือก Campaign และ Trade ได้', async () => {
            await productSelling.clickCampaignByName(data.campaign);
            await productSelling.checkTradeByNumber(data.trade);
            await productSelling.clickRadioNotInterest();
            await productSelling.selectReason('ยังไม่ตัดสินใจ');
            await productSelling.clickButtonAddToCart();
            await productSelling.inputMobileModal(data.mobileNo);
            await productSelling.clickOKButtonOnDialog();
        });
        await test.step('ผู้ใช้งานตรวจสอบสินค้าที่เลือกมาในหน้า Cart ', async () => {
            await navBar.clickButtonCart();

            await cart.textCampaignNameDisplay(0,data.campaign);
            await cart.textProductNameDisplay(0,iphone.product);
            await scanImei.inputImeiDisplay(iphone.imei);
            await cart.buttonPayNowIsEnabled();
        });
        await test.step('ผู้ใช้งาน Scan IMEI รุ่น iPhone 12 128GB สี GREEN ตรงกับที่เลือกมา', async () => {
            await scanImei.keyInIMEI(iphone.imei);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIMEISuccessDisplay();
            await scanImei.clickDialogOKButton();
            await scanImei.inputImeiDisplay(iphone.imei);
        });
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
});