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

test.describe('AIS Shop Handset Only', async () => {
    const product1 = {
        brand: 'VIVO',
        model: 'V5',
        product: 'VIVO V5',
    }
    const product2 = {
        brand: 'APPLE',
        model: 'iPhone 12 Pro Max',
        product: 'iPhone 12 Pro Max 512GB',
    }
    const testData = {
        mobileNo: '0934009882',
        campaign: 'Handset Only (Redesign)',
        trade: 'TP23085207',
    }
    test('ลูกค้าเลือกซื้อค้าเครื่องเปล่าราคาปกติ', async ({ page }) => {
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
            await validateCustomer.inputMobileNumber(testData.mobileNo)
            await validateCustomer.clickButtonNext();
        });
        await test.step('ผู้ใช้งานไม่สามารถเห็นรายการ Model Group ได้เนื่องจากยังไม่ได้เลือก Brand', async () => {
            await navBar.navbarDisplay();

            await handsetList.fieldSearchBarDisplay();
            await handsetList.buttonCategoryIsSelected('handset');
            await handsetList.emptyStateBrandDisplay();
            await handsetList.modelContinuousListNotDisplay();
            await handsetList.buttonNextIsDisabled();
        });
        await test.step('ผู้ใช้งานไม่สามารถเห็นรายการ Model ได้เนื่องจากยังไม่ได้เลือก Model Group', async () => {
            await handsetList.selectIconBrand(product1.brand);
            await handsetList.emptyStateModelDisplay();
            await handsetList.buttonNextIsDisabled();
        });
        await test.step('ผู้ใช้งานเลือกสินค้า Vivo V5 ได้', async () => {
            await handsetList.iconBrandIsSelected(product1.brand);
            await handsetList.modelContinuousListDisplay();
            await handsetList.selectModel(product1.model);
            await handsetList.selectProduct(product1.product);
            await handsetList.productImageDisplay(product1.product);
        });
        await test.step('ผู้ใช้งานสามารถยกเลิกการเลือกแบรนด์ได้', async () => {
            await handsetList.iconBrandIsSelected(product1.brand);
            await handsetList.selectIconBrand(product1.brand);
            await handsetList.iconBrandIsNotSelected(product1.brand);
            await handsetList.emptyStateBrandDisplay();
            await handsetList.buttonNextIsDisabled(); 
        });
        await test.step('ผู้ใช้งานเลือกสินค้า APPLE iPhone 12 Pro Max 512 GBได้', async () => {
            await handsetList.selectIconBrand(product2.brand);
            await handsetList.iconBrandIsSelected(product2.brand);
            await handsetList.selectModel(product2.model);
            await handsetList.selectProduct(product2.product);
            await handsetList.productImageDisplay(product2.product);
            await handsetList.clickButtonNEXT('NEXT');
        });
        await test.step('ผู้ใช้งานตรวจสอบ Stock ของสินค้า', async () => {
            await navBar.navbarDisplay();

            await handsetList.buttonCategoryIsSelected('handset');
            await productSelling.checkTextOutofStock('GOLD');
            await productSelling.checkTextOutofStock('PACIFIC BLUE');
            await productSelling.checkTextOutofStock('SILVER');
        });
        await test.step('ผู้ใช้งานตรวจสอบเลือก Campaign และ Trade', async () => {
            await productSelling.clickCampaignByName(testData.campaign);
            await productSelling.clickTradeByNumber(testData.trade);
        });
        await test.step('ผู้ใช้งานตรวจสอบเลือกไม่สนใจความคุ้มครอง', async () => {
            await productSelling.clickRadioNotInterest();
            await productSelling.selectReason('ยังไม่ตัดสินใจ');
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