const { test } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { CustomerNavbarPage } = require('../../pages/customer-nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { ListNumberPage } = require('../../pages/list-number-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');

test.describe('AIS Shop Device Sale Service Care SCN 004 Customer Select Brand Model And Select Service AIS Care', async () => {
    test('ผู้ใช้งานเลือก Brand ที่ไม่ใช่ Apple กรณีลูกค้าสนใจเลือกซื้อ Service AIS CARE', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const customerNavBar = new CustomerNavbarPage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const listNumber = new ListNumberPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ผู้ใช้งานเข้าหน้าเช็คสิทธิ์ของลูกค้า', async () => {
            await mcLogin.gotoLoginPage();
            await mcLogin.loginMyChannel("sasithth", "MyChannel#Aug23");
            await mcLanding.clickButtonHandsetAndAccessory();
        });
        await test.step('ผู้ใช้งานกรอกเบอร์ลูกค้าที่ต้องการทำรายการ', async () => {
            await validateCustomer.inputMobileNumber('0934000623');
            await validateCustomer.clickButtonNext();
        });
        await test.step('ผู้ใช้งานเลือกเบอร์โทรศัทพ์ของลูกค้า', async () => {
            await navBar.navbarDisplay();
            await customerNavBar.customerNavbarDisplay();

            await listNumber.fieldSearchBarDisplay();
            await listNumber.pillChargeTypeDisplay('Postpaid');
            await listNumber.clickRadioNumber();
            await listNumber.clickButtonNext();
        });
        await test.step('ผู้ใช้งานเลือกสินค้าที่ลูกค้าต้องการซื้อ', async () => {
            await navBar.navbarDisplay();
            await customerNavBar.customerNavbarDisplay();

            await handsetList.fieldSearchBarDisplay();
            await handsetList.barFilterDisplay();
            await handsetList.pillCategoryIsSelected('handset');
            await handsetList.selectIconBrand('OPPO');
            await handsetList.selectBrandName('A3S 16GB Sim Lock');
            await handsetList.clickButtonNEXT('NEXT');
        });
        await test.step('ผู้ใช้งานเลือก Campaign และ Trade', async () => {
            await navBar.navbarDisplay();
            await customerNavBar.customerNavbarDisplay();

            await handsetList.pillCategoryIsSelected('handset');
            await productSelling.pillCustomerTypeIsSelected('Existing');
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAISCarePlus('0');
            await productSelling.inputTextEmail('rajuinwza@ads.team');
            await productSelling.clickButtonAddToCart();
        });
    });
});