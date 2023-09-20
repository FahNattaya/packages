const { test } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { CustomerNavbarPage } = require('../../pages/customer-nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { ListNumberPage } = require('../../pages/list-number-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { CartPage } = require('../../pages/cart-page');
const { users } = require('../../data/data.json');

test.describe('AIS Shop Device Sale Check Package Minimum 001 Customer Use Old Package', async () => {
    test.beforeEach(async ({ page }) => {
        const navBar = new NavBarpage(page);
        const customerNavBar = new CustomerNavbarPage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const listNumber = new ListNumberPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.aisshop2.username,users.aisshop2.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await validateCustomer.inputMobileNumber('0934000623');
        await validateCustomer.clickButtonNext();
        await navBar.navbarDisplay();
        await customerNavBar.customerNavbarDisplay();
        await listNumber.fieldSearchBarDisplay();
        await listNumber.buttonChargeTypeDisplay('Postpaid');
        await listNumber.clickRadioNumber();
        await listNumber.clickButtonNext();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand('APPLE');
        await handsetList.selectModel('iPhone 12 Pro Max');
        await handsetList.selectProduct('iPhone 12 Pro Max 512GB');
        await handsetList.clickButtonNEXT('NEXT');
        await handsetList.buttonCategoryIsSelected('handset');
        await productSelling.clickButtonColor('GRAPHITE');
        await productSelling.buttonCustomerTypeIsSelected('Existing');
        await productSelling.clickCampaignByIndex('0');
        await productSelling.clickTradeByIndex('0');
    });
    test('ลูกค้าปัจจุบันใช้แพ็คเกจ 699 บาท เลือกซื้อโครงการ AIS Best Buy 12M แพ็กเกจขั้นต่ำ 699 เลือกใช้แพ็กเกจเดิม', async ({ page }) => {
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        const navBar = new NavBarpage(page);
        await test.step('ผู้ใช้งานเลือก package เดิม ไม่เปลี่ยน package', async () => {
            await productSelling.checkInfoWordPackageDisble();
            await productSelling.clickRadioCurrentPackage();
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAppleCare();
            await productSelling.inputTextEmail('mcdvs@redesign.team');
            await productSelling.clickButtonAddToCart();
            await navBar.clickButtonCart();
            await cart.clickDialogOKButton();
        });
    });
    test('ลูกค้าปัจจุบันใช้แพ็กเกจ 699 บาท เลือกซื้อโครงการ AIS Best Buy 12M แพ็กเกจขั้นต่ำ 899 เลือกเปลี่ยนแพ็กเกจ', async ({ page }) => {
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        const navBar = new NavBarpage(page);
        await test.step('ผู้ใช้งานเลือก package เดิม ไม่เปลี่ยน package', async () => {
            await productSelling.checkInfoWordPackageDisble();
            await productSelling.clickButtonTextPackage('แพ็กเกจโทรและเน็ต');
            await productSelling.clickListPackage('4G Max Speed UNLIMITED');
            await productSelling.clickRadioTitleListPackage('02');
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAppleCare();
            await productSelling.inputTextEmail('mcdvs@redesign.team');
            await productSelling.clickButtonAddToCart();
            await navBar.clickButtonCart();
            await cart.clickDialogOKButton();
        });
    });
    test('ลูกค้าตรวจสอบ package ปัจจุบัน ของตัวเอง และลูกค้าเลือกใช้แพ็คเกจเดิม (pakeage 699)', async () => {
        const productSelling = new ProductSellingPage(page);
        await test.step('ผู้ใช้งานเลือก Campaign และ Trade ไม่เลือกแพ็กเกจ', async () => {
            await productSelling.clickButtonColor('GRAPHITE');
            await productSelling.buttonCustomerTypeIsSelected('Existing');
            await productSelling.clickCampaignByIndex('0');
            await productSelling.clickTradeByIndex('0');
            await productSelling.checkInfoWordPackageDisble();
            await productSelling.buttonAddToCartDisabled();
        });
    });
    test('ลูกค้าปัจจุบันใช้แพ็กเกจ 699 บาทเลือกซื้อโครงการ AIS Best Buy 12M แพ็กเกจขั้นต่ำ 1099 ต้องเลือกเปลี่ยนแพ็กเกจใหม่', async () => {
        const productSelling = new ProductSellingPage(page);
        await test.step('ผู้ใช้งานเลือก Campaign และ Trade', async () => {
            await productSelling.clickButtonColor('GRAPHITE');
            await productSelling.buttonCustomerTypeIsSelected('Existing');
            await productSelling.clickCampaignByIndex('0');
            await productSelling.clickTradeByIndex('0');
            await productSelling.checkInfoWordPackageDisble();
            await productSelling.clickButtonTextPackage('แพ็กเกจโทรและเน็ต');
            await productSelling.clickListPackage('4G Max Speed UNLIMITED');
            await productSelling.clickRadioTitleListPackage('01');
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAppleCare();
            await productSelling.inputTextEmail('mintdekinw@ads.team');
            await productSelling.clickButtonAddToCart();
        });
    })
    test.afterEach(async ({ page }) => {
        const cart = new CartPage(page);
        const navBar = new NavBarpage(page);

        await navBar.clickButtonCart();
        await cart.clickDeleteAll();
        await cart.dialogDeleteConfirmDisplay();
        await cart.clickConfirmDelete();
        await cart.dialogDeleteSuccessDisplay();
    });
});