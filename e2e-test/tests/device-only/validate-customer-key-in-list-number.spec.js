const { test, expect } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { ListNumberPage } = require('../../pages/list-number-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { ServiceCarePage } = require('../../pages/service-care');
const { CartPage } = require('../../pages/cart-page');
const { PaymentMethodPage } = require('../../pages/payment-method-page');
const { users } = require('../../data/data.json');

test.only('test validate input by number', async ({ page }) => {
    const navBar = new NavBarpage(page);
    const mcLogin = new MyChannelLoginPage(page);
    const mcLanding = new MyChannelLandingPage(page);
    const validateCustomer = new ValidateCustomerPage(page);
    const listNumber = new ListNumberPage(page);
    const handsetList = new HandSetListPage(page);
    const serviceCare = new ServiceCarePage(page);
    const productSelling = new ProductSellingPage(page);
    const cart = new CartPage(page);
    const paymentMethod = new PaymentMethodPage(page);

    const data = {
        iconBrand: 'APPLE',
        model: 'iPhone 12 Pro Max',
        product: 'iPhone 12 Pro Max 128GB',
        campaign: 'Handset Only(Redesign Discount)',
        trade: 'TP23085207',
        color: 'GOLD',
        email: 'dvs-redesign@test.team',
    }
    await test.step('ผู้ใช้งานเข้าสู่ระบบ device sales เลือก menu handset & accessory', async () => {
        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.aisshop2.username, users.aisshop2.password);
        await mcLanding.clickButtonHandsetAndAccessory();
    });

    await test.step('ผู้ใช้งานเลือกซื้อเครื่องiPhone 12 Pro Max 128GB', async () => {
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand(data.iconBrand);
        await handsetList.selectModel(data.model);
        await handsetList.selectProduct(data.product);
        await handsetList.clickButtonNEXT('NEXT');
    });

    await test.step('ผู้ใช้งานตรวจสอบข้อมูลรุ่นที่เลือกมาในหน้า Product-selling', async () => {
        await productSelling.clickButtonOK();
        await productSelling.clickButtonColor(data.color);
        await productSelling.selectCustomerCriteria('ONLY');
    });

    await test.step('ผู้ใช้งานสามารถเลือก Campaign และ Trade ได้', async () => {
        await productSelling.clickCampaignByName(data.campaign);
        await productSelling.clickTradeByNumber(data.trade);
        await productSelling.clickButtonAddToCart();
    });

    await test.step('ผู้ใช้งานกรอกเบอร์ลูกค้า', async () => {
        await validateCustomer.inputfieldKeyIn('2022111117231');
        await validateCustomer.clickButtonNext();
    });

    await test.step('ลูกค้าเลือกเบอร์มือถือในการทำรายการ', async () => {
        await listNumber.selectChargeType('Prepaid ');
        await listNumber.selectNumber('0937055400');
        await listNumber.clickButtonNext();
    });

    await test.step('ลูกค้าไม่สนใจซื้อบริการ', async () => {
        await productSelling.clickButtonServiceCare();
        await productSelling.clickRadioNotInterest();
        await productSelling.selectReason("ราคาเครื่องถูกอยู่แล้ว");
        await serviceCare.clickButtonNext();
    });

    await test.step('ลูกค้าตรวจสอบสินค้าในหน้าตะกร้า', async () => {
        await cart.textCampaignNameDisplay(0,data.campaign);
        await cart.textProductNameDisplay(0,data.color);
    });

    await test.step('ลบของในตะกร้า', async () => {
        await cart.clickDeleteAll();
        await cart.dialogDeleteConfirmDisplay();
        await cart.clickConfirmDelete();
        await cart.dialogDeleteSuccessDisplay();
    });
});