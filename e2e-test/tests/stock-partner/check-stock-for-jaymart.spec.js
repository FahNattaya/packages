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

test.describe('Payment credit card for partner', async () => {
    test.beforeEach(async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.jaymart.username, users.jaymart.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await validateCustomer.clickButtonSkip();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand('APPLE');
        await handsetList.selectModel('iPhone 12 Pro Max');
        await handsetList.selectProduct('iPhone 12 Pro Max 512GB');
        await handsetList.clickButtonNEXT('NEXT');
        await handsetList.fieldSearchBarDisplay();


    });

    test.only('10.ผู้ใช้งาน Login ด้วย User : Jaymart(Retailchain) ไม่แสดง Trade xxxx', async ({ page }) => {
        const productSelling = new ProductSellingPage(page);

        await productSelling.clickButtonOK();
        await productSelling.clickButtonColor('GRAPHITE');
        await productSelling.selectCustomerCriteria('ONLY');
        await productSelling.clickCampaignByName('Handset Only(Redesign Discount)');
        await productSelling.clickTradeByNumber('TP23085207');
        await productSelling.checkTradeNember('TP23085207');
        await productSelling.clickCampaignByName('Handset Only(Redesign No Discount)');
        await productSelling.clickTradeByNumber('TP23095209');
        await productSelling.checkTradeNember('TP23095209');
        await productSelling.clickTradeByNumber('TP23095218');
        await productSelling.checkTradeNember('TP23095218');

    });
});