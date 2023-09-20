const { test } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { ScanImeiPage } = require('../../pages/scan-imei-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { CartPage } = require('../../pages/cart-page');
const { users } = require('../../data/data.json');

test.describe('AIS Shop Handset Only', async () => {
    test.beforeEach(async ({ page }) => {
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.telewiz.username, users.telewiz.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await validateCustomer.clickButtonSkip();
    });
    test('ผู้ใช้งาน Scan IMEI เครื่อง iPhone 12 Pro Max 128GB สี SILVER  ในหน้าตะกร้าได้สำเร็จ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const scanImei = new ScanImeiPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        

        const data = {
            mobileNo: '0934009886',
            imeiHandset: '203101329030010',
            imeiProductselling: '803101328320006',
            imeiCart: '803101328320007',
            brand: 'APPLE',
            model: 'iPhone 12 Pro Max',
            product: 'iPhone 12 Pro Max 128GB',
            color: 'SILVER',
            price: 'ราคา 39,900 บาท',
            campaign: 'Handset Only(Redesign Discount)',
            trade: 'TP23085207',
        }
        await test.step('iPhone 12 Pro Max 128GB', async () => {
            await navBar.navbarDisplay();

            await scanImei.clickButtonScanIMEI();
            await scanImei.inputProductDisable();
            await scanImei.keyInIMEI(data.imeiHandset);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.clickButtonNextIMEI();
        });
        await test.step('ผู้ใช้งานตรวจสอบข้อมูลรุ่นที่เลือกมาในหน้า Product-selling', async () => {
            await productSelling.clickButtonOK();
            await productSelling.imeiCodeDisplay(data.imeiHandset);
            await productSelling.selectCustomerCriteria('ONLY');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay(data.product);
            await productSelling.textProductPriceDisplay(data.price);

            await scanImei.clickButtonScanIMEI();
            await scanImei.inputProductDisable();
            await scanImei.keyInIMEI(data.imeiProductselling);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.clickButtonNextIMEI();

        });
        await test.step('ผู้ใช้งานสามารถเลือก Campaign และ Trade ได้', async () => {
            await productSelling.clickCampaignByName(data.campaign);
            await productSelling.checkTradeByNumber(data.trade);
            await productSelling.clickRadioNotInterest();
            await productSelling.selectReason('ยังไม่ตัดสินใจ');
            await productSelling.clickButtonAddToCart();
            await productSelling.inputMobileModal(data.mobileNo);            
            await productSelling.clickOKButtonOnDialog()
            
        });
        await test.step('ผู้ใช้งานเข้าสู้หน้า Cart', async () => {
            await navBar.clickButtonCart();
            await scanImei.inputImeiDisplay(data.imeiProductselling)
            await cart.textCampaignNameDisplay(0,data.campaign);
            await cart.textProductNameDisplay(0,data.color);
            await scanImei.inputProductDisable();

        });
        await test.step('ตรวจสอบการ keyin IMEI', async () => {
            await scanImei.keyInIMEI(data.imeiCart);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIMEISuccessDisplay();
            await scanImei.clickDialogOKButton();
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