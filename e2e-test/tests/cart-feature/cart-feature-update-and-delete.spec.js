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
const { PaymentMethodPage } = require('../../pages/payment-method-page');

test.describe('AIS Shop Device Sale Access Token 001 Completed Access Token', async () => {
    test.beforeEach(async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const listNumber = new ListNumberPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel("chiraphr", "MyChannel#Aug23");
        await mcLanding.textLocationCodeDisplay('1100');
        await mcLanding.clickButtonHandsetAndAccessory();
        await validateCustomer.inputMobileNumber('0934000624');
        await validateCustomer.clickButtonNext();
        await listNumber.clickRadioNumber();
        await listNumber.clickButtonNext();
        await handsetList.selectModel('iPhone 12 Pro Max 128GB');
        await handsetList.clickButtonNEXT('NEXT');
        await handsetList.buttonCategoryIsSelected('handset');
        await productSelling.buttonCustomerGroupIsSelected('Existing');
        await productSelling.clickCampaignByIndex('0');
        await productSelling.clickTradeByIndex('0');
        await productSelling.selectPackageList(' SME Big Talk ');
        await productSelling.clickListPackage('40');
        await productSelling.clickButtonServiceCare();
        await productSelling.selectAppleCare();
        await productSelling.inputTextEmail('name@gmail.com');
        await productSelling.clickButtonAddToCart();

        await productSelling.dialogAddToCartFinishDisplay();
        await productSelling.clickOKButtonOnFinishDialog();

        await navBar.clickButtonCart();
    });
    test('ลูกค้าเลือกรายการสินค้าเข้าตะกร้า และในหน้าตะกร้าเลือกสินค้าทั้งหมด สามารถ กดปุ่ม Pay Now ไปที่หน้า Payment ได้', async ({ page }) => {
        const cart = new CartPage(page);
        const navBar = new NavBarpage(page);
        const customerNavBar = new CustomerNavbarPage(page);
        const paymentMethod = new PaymentMethodPage(page);
        await test.step('ตรวจสอบหน้าจอตะกร้าแสดงผลถูกต้อง', async () => {
            await navBar.navbarDisplay();
            await customerNavBar.customerNavbarDisplay();

            await cart.stepCartStatusIsWating();
            await cart.stepPaymentStatusIsDefault();
            await cart.stepCompleteStatusIsDefault();
        });
        await test.step('ลูกสามารถค้ากดปุ่ม PAY NOW ได้', async () => {
            await cart.clickButtonPayNow();
            await paymentMethod.textTitlePageNameDisplay('รายการสั่งซื้อสินค้า');
        });
    });
    test('ผู้ใช้งานเข้าสู่ระบบสำเร็จ และเลือกซื้อสินค้า Handset พร้อม Campaign ได้จนถึงหน้า Success Queue กรณี Token', async ({ page }) => {
        const cart = new CartPage(page);
        const navBar = new NavBarpage(page);
        const customerNavBar = new CustomerNavbarPage(page);
        await test.step('test 2', async () => {
            await navBar.navbarDisplay();
            await customerNavBar.customerNavbarDisplay();

            await cart.stepCartStatusIsWating();
            await cart.stepPaymentStatusIsDefault();
            await cart.stepCompleteStatusIsDefault();
        });
    });
    test.afterEach(async ({ page }) => {
        const cart = new CartPage(page);
        const navBar = new NavBarpage(page);

        await navBar.clickButtonCart();
        await cart.clickDeleteAll();
        await cart.dialogDeleteConfirmDisplay();
        await cart.clickConfirmDelete();
        await cart.dialogDeleteSuccessDisplay();
    })
});