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

test.beforeEach(async ({ page }) => {
    const mcLogin = new MyChannelLoginPage(page);
    const mcLanding = new MyChannelLandingPage(page);
    const validateCustomer = new ValidateCustomerPage(page);

    await mcLogin.gotoLoginPage();
    await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
    await mcLanding.clickButtonHandsetAndAccessory();
    await validateCustomer.clickButtonSkip();
});
test.describe('AIS Shop Handset Only', async () => {
    test('ลูกค้าเลือกซื้อสินค้า VIVO V5 สี CROWN GOLD และผู้ใช้งาน Scan IMEI เครื่อง AIS รุ่น VIVO V5 สี CROWN GOLD  ในหน้าตะกร้าได้สำเร็จ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const scanImei = new ScanImeiPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        

        const data = {
            mobileNo: '0934009886',
            imei: '710271546240342',
            brand: 'VIVO',
            model: 'V5',
            product: 'VIVO V5',
            color: 'CROWN GOLD',
            price: 'ราคา 12,990 บาท',
            campaign: 'Handset Only(Redesign No Discount)',
            trade: 'TP23085209',
        }

        await test.step('ผู้ใช้งานเลือกซื้อเครื่อง VIVO V5', async () => {
            await navBar.navbarDisplay();

            await handsetList.selectIconBrand(data.brand);
            await handsetList.selectModel(data.model);
            await handsetList.selectProduct(data.product);
            await handsetList.clickButtonNEXT('NEXT');
        });
        await test.step('ผู้ใช้งานตรวจสอบข้อมูลรุ่นที่เลือกมาในหน้า Product-selling', async () => {
            await productSelling.clickButtonOK();
            await productSelling.selectCustomerCriteria('ONLY');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay(data.product);
            await productSelling.textProductPriceDisplay(data.price);
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
        await test.step('ผู้ใช้งานเข้าสู้หน้า Cart', async () => {
            await navBar.clickButtonCart();
            await cart.textCampaignNameDisplay(0,data.campaign);
            await cart.textProductNameDisplay(0,data.color);
            await scanImei.inputProductDisable();
            await scanImei.buttonConfirmIMEIDisable();
            await cart.buttonPayNowIsDisabled();
        });
        await test.step('ตรวจสอบการ keyin IMEI', async () => {
            await scanImei.keyInIMEI(data.imei);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIMEISuccessDisplay();
            await scanImei.clickDialogOKButton();
            await cart.buttonPayNowIsEnabled();
        });
    });
    test('005 ลูกค้าเลือกซื้อสินค้า iPhone 12 128GB สี GREEN และผู้ใช้งาน Scan IMEI ในหน้า Cart เครื่อง iPhone 12 128GB สี RED ไม่สำเร็จ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const scanImei = new ScanImeiPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        
        const iPhoneGreen = {
            mobileNo: '0934009886',
            imei: '904251555460081',
            imeiRed: '427080602023018',
            brand: 'APPLE',
            model: 'iPhone 12',
            product: 'iPhone 12 128GB',
            color: 'GREEN',
            price: 'ราคา 31,900 บาท',
            campaign: 'Handset Only(Redesign Discount)',
            trade: 'TP23085207',
        }

        await test.step('ผู้ใช้งานเลือกซื้อเครื่อง iPhone 12 128GB GREEN', async () => {
            await navBar.navbarDisplay();

            await handsetList.selectIconBrand(iPhoneGreen.brand);
            await handsetList.selectModel(iPhoneGreen.model);
            await handsetList.selectProduct(iPhoneGreen.product);
            await handsetList.clickButtonNEXT('NEXT');
        });
        await test.step('ผู้ใช้งานตรวจสอบข้อมูลรุ่นที่เลือกมาในหน้า Product-selling', async () => {
            await productSelling.clickButtonOK();
            await productSelling.selectCustomerCriteria('ONLY');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay(iPhoneGreen.product);
            await productSelling.textProductPriceDisplay(iPhoneGreen.price);
            await productSelling.clickButtonColor(iPhoneGreen.color);
        });
        await test.step('ผู้ใช้งานสามารถเลือก Campaign และ Trade ได้', async () => {
            await productSelling.clickCampaignByName(iPhoneGreen.campaign);
            await productSelling.checkTradeByNumber(iPhoneGreen.trade);
            await productSelling.clickRadioNotInterest();
            await productSelling.selectReason('ยังไม่ตัดสินใจ');
            await productSelling.clickButtonAddToCart();
            await productSelling.inputMobileModal(iPhoneGreen.mobileNo);
            await productSelling.clickOKButtonOnDialog();
        });
        await test.step('ผู้ใช้งานเข้าสู้หน้า Cart', async () => {
            await navBar.clickButtonCart();
            await cart.textCampaignNameDisplay(0,iPhoneGreen.campaign);
            await cart.textProductNameDisplay(0,iPhoneGreen.product);
            await scanImei.inputProductDisable();
            await scanImei.buttonConfirmIMEIDisable();
        });
        await test.step('ตรวจสอบการ keyin IMEI', async () => {
            await scanImei.keyInIMEI(iPhoneGreen.imeiRed);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIncorrectIMEIDisplay();
            await scanImei.clickDialogOKButton();
            await scanImei.inputImeiCartIsEmpty();
        });
    });
    test('ลูกค้าเลือกซื้อสินค้า iPhone 12 128GB สี GREEN กรณี ผู้ใช้งาน Scan IMEI ในหน้า Product-Selling และ Cart ที่ไม่มีใน DT/SFF ระบบแสดง ไม่พบ IMEI', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const scanImei = new ScanImeiPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        
        const data = {
            mobileNo: '0934009886',
            imeinotfoundDT: '904251555460000',
            imeinotfoundSFF: '904251555460028',
            brand: 'APPLE',
            model: 'iPhone 12',
            product: 'iPhone 12 128GB',
            color: 'GREEN',
            price: 'ราคา 31,900 บาท',
            campaign: 'Handset Only(Redesign Discount)',
            trade: 'TP23085207',
        }

        await test.step('ผู้ใช้งานเลือกซื้อเครื่อง iPhone 12 128GB GREEN', async () => {
            await navBar.navbarDisplay();

            await handsetList.selectIconBrand(data.brand);
            await handsetList.selectModel(data.model);
            await handsetList.selectProduct(data.product);
            await handsetList.clickButtonNEXT('NEXT');
        });
        await test.step('ผู้ใช้งานตรวจสอบข้อมูลรุ่นที่เลือกมาในหน้า Product selling', async () => {
            await productSelling.clickButtonOK();
            await productSelling.selectCustomerCriteria('ONLY');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay(data.product);
            await productSelling.textProductPriceDisplay(data.price);
            await productSelling.clickButtonColor(data.color);
        });
        await test.step('ผู้ใช้งาน Scan IMEI ที่ไม่พบใน DT ในหน้า Product Selling', async () => {
            await scanImei.clickButtonScanIMEI();
            await scanImei.inputProductDisable();
            await scanImei.keyInIMEI(data.imeinotfoundDT);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIMEINotFoundDTDisplay();
            await scanImei.clickDialogOKButton();   
            await scanImei.inputImeiModalIsEmpty();
        });
        await test.step('ผู้ใช้งาน Scan IMEI ที่ไม่พบใน SFF ในหน้า Product Selling', async () => {
            await scanImei.keyInIMEI(data.imeinotfoundSFF);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIMEINotFoundSFFDisplay();
            await scanImei.clickDialogOKButton();  
            await scanImei.inputImeiModalIsEmpty();
            await scanImei.clickButtonCloseIMEI();
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
        await test.step('ผู้ใช้งานเข้าสู้หน้า Cart', async () => {
            await navBar.clickButtonCart();
            await cart.textCampaignNameDisplay(0,data.campaign);
            await cart.textProductNameDisplay(0,data.product);
            await scanImei.inputProductDisable();
            await scanImei.buttonConfirmIMEIDisable();
        });
        await test.step('ตรวจสอบการ keyin IMEI ที่ไม่พบใน DT / SFF ในหน้า Cart', async () => {
            await scanImei.keyInIMEI(data.imeinotfoundDT);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIMEINotFoundDTDisplay();
            await scanImei.clickDialogOKButton();  
            await scanImei.inputImeiCartIsEmpty();
            await cart.buttonPayNowIsDisabled();

            await scanImei.keyInIMEI(data.imeinotfoundSFF);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIMEINotFoundSFFDisplay();
            await scanImei.clickDialogOKButton();
            await cart.buttonPayNowIsDisabled();
        });
    });
    test('ลูกค้าเลือกซื้อสินค้า Samsung A115L3/32 สี BLACK กรณี ผู้ใช้งาน Scan IMEI ในหน้า Cart ที่ IMEI ถูกใช้ไปแล้ว', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const scanImei = new ScanImeiPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        
        const data = {
            mobileNo: '0934009886',
            imeiRegistered: '974390108221138',
            brand: 'SAMSUNG',
            model: 'A115L3/32',
            product: 'A115L3/32',
            color: 'BLACK',
            price: 'ราคา 17,000 บาท',
            campaign: 'Handset Only(Redesign No Discount)',
            trade: 'TP23085209',
        }

        await test.step('ผู้ใช้งานเลือกซื้อเครื่อง Samsung A115L3/32 สี BLACK', async () => {
            await navBar.navbarDisplay();

            await handsetList.selectIconBrand(data.brand);
            await handsetList.selectModel(data.model);
            await handsetList.selectProduct(data.product);
            await handsetList.clickButtonNEXT('NEXT');
        });
        await test.step('ผู้ใช้งานตรวจสอบข้อมูลรุ่นที่เลือกมาในหน้า Product-selling', async () => {
            await productSelling.clickButtonOK();
            await productSelling.selectCustomerCriteria('ONLY');
            await productSelling.textProductNameDisplay(data.product);
            await productSelling.textProductPriceDisplay(data.price);
            await productSelling.clickButtonColor(data.color);
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
        await test.step('ผู้ใช้งานเข้าสู้หน้า Cart', async () => {
            await navBar.clickButtonCart();
            await cart.textCampaignNameDisplay(0,data.campaign);
            await cart.textProductNameDisplay(0,data.product);
            await cart.buttonPayNowIsDisabled();
            await scanImei.inputProductDisable();
            await scanImei.buttonConfirmIMEIDisable();
        });
        await test.step('ตรวจสอบการ keyin IMEI', async () => {
            await scanImei.keyInIMEI(data.imeiRegistered);
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.dialogIMEINStatusIncorrectDisplay();
            await scanImei.clickDialogOKButton();
            await cart.buttonPayNowIsDisabled();
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