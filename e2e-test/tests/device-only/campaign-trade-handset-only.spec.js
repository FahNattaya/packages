const { test } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { users } = require('../../data/data.json');

test.describe('AIS Shop Handset Only', async () => {
    test.beforeEach(async ({ page }) => {
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.aisshop2.username, users.aisshop2.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await validateCustomer.clickButtonSkip();

    });
    test('ลูกค้าซื้อ Apple iPhone 12 Pro 128GB ในหน้ารายละเอียดสินค้า สามารถแสดง Campaign และ Trade ที่มีส่วนลด Include Vat แสดงผลได้ถูกต้อง ', async ({ page }) => {
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ตรวจสอบหน้า รายละเอียดสินค้า เข้ามาครั้งแรก', async () => {
            await handsetList.buttonCategoryIsSelected('handset');
            await handsetList.selectIconBrand('APPLE');
            await handsetList.selectModel('iPhone 12 Pro');
            await handsetList.selectProduct('iPhone 12 Pro 128GB');
            await handsetList.clickButtonNEXT('NEXT');

            await handsetList.buttonCategoryIsSelected('handset');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay('iPhone 12 Pro 128GB');
            await productSelling.buttonCustomerGroupIsSelected('ONLY');
            await productSelling.textCampaignNameDisplay('Handset Only (Redesign)');
        });
        await test.step('ตรวจสอบการเลือก Campaign', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
            await productSelling.campaignFullPaymentDisplay('Handset Only (Redesign)');
            await productSelling.campaignInstallmentFlagDisplay('Handset Only (Redesign)');
            await productSelling.campaignMaximumContractDisplay('Handset Only (Redesign)');
        });
        await test.step('ตรวจสอบการเลือก Trade ที่มีส่วนลด Include vat By Baht', async () => {
            await productSelling.clickTradeByNumber('TP23085207');
            await productSelling.checkTradeByNumber('TP23085207');
            await productSelling.checkTradeDiscount('TP23085207', '(ส่วนลดพิเศษ 3,000 บาท)');
            await productSelling.buttonAddToCartDisabled();
        });
        await test.step('No FreeGoods', async () => {
            await productSelling.tradeFreeGoodsNoDisplay('TP23085207');
        });
        await test.step('Service Care', async () => {
            await productSelling.buttonAisCareDisplay();
            await productSelling.buttonAppleCareDisplay();
            await productSelling.clickButtonServiceCare();
        });
    });
    test('ลูกค้าซื้อ Apple iPhone 12 Pro Max 128 ในหน้ารายละเอียดสินค้า สามารถแสดง Campaign และ Trade ที่มีส่วนลด Include Vat แสดงผลได้ถูกต้อง ', async ({ page }) => {
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ตรวจสอบหน้า รายละเอียดสินค้า เข้ามาครั้งแรก', async () => {
            await handsetList.selectIconBrand('APPLE');
            await handsetList.selectModel('iPhone 12 Pro Max');
            await handsetList.selectProduct('iPhone 12 Pro Max 128GB');
            await handsetList.clickButtonNEXT('NEXT');  
        });
        await test.step('ตรวจสอบการเลือก Campaign', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
        });
        await test.step('ตรวจสอบการเลือก Trade ที่มีส่วนลด Include vat By Percent', async () => {
            await productSelling.clickTradeByNumber('TP23085207');
            await productSelling.checkTradeByNumber('TP23085207');
            await productSelling.checkTradeDiscount('TP23085207', '(ส่วนลดพิเศษ 1,197 บาท)');
            await productSelling.buttonAddToCartDisabled();
        });
        await test.step('Service Care', async () => {
            await productSelling.buttonAisCareDisplay();
            await productSelling.buttonAppleCareDisplay();
            await productSelling.clickButtonServiceCare();
        });
    });
    test('ลูกค้าซื้อ iPhone Xs 512GB  ในหน้ารายละเอียดสินค้า สามารถแสดง Campaign และ Trade ที่มีส่วนลด Exclude Vat แสดงผลได้ถูกต้อง ', async ({ page }) => {
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ตรวจสอบหน้า รายละเอียดสินค้า เข้ามาครั้งแรก', async () => {
            await handsetList.buttonCategoryIsSelected('handset');
            await handsetList.selectIconBrand('APPLE');
            await handsetList.selectModel('iPhone Xs');
            await handsetList.selectProduct('iPhone Xs 512GB');
            await handsetList.clickButtonNEXT('NEXT');

            await handsetList.buttonCategoryIsSelected('handset');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay('iPhone Xs 512GB');
            await productSelling.buttonCustomerGroupIsSelected('ONLY');
            await productSelling.textCampaignNameDisplay('Handset Only (Redesign)');

        });
        await test.step('ตรวจสอบการเลือก Campaign', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
            await productSelling.campaignFullPaymentDisplay('Handset Only (Redesign)');
            await productSelling.campaignInstallmentFlagDisplay('Handset Only (Redesign)');
            await productSelling.campaignMaximumContractDisplay('Handset Only (Redesign)');
        });
        await test.step('ตรวจสอบการเลือก Trade ที่มีส่วนลด Exclude vat By Baht', async () => {
            await productSelling.clickTradeByNumber('TP23085207');
            await productSelling.checkTradeByNumber('TP23085207');
            await productSelling.checkTradeDiscount('TP23085207', '(ส่วนลดพิเศษ 3,000 บาท)');
            await productSelling.buttonAddToCartDisabled();
        });
        await test.step('No FreeGoods', async () => {
            await productSelling.tradeFreeGoodsDisplay('TP23085207',0);
            await productSelling.tradeFreeGoodsDisplay('TP23085207',1);

        });
    });
    test('ลูกค้าซื้อ iPhone 12 Pro Max 512GB  ในหน้ารายละเอียดสินค้า สามารถแสดง Campaign และ Trade ที่มีส่วนลด Exclude Vat แสดงผลได้ถูกต้อง ', async ({ page }) => {
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ตรวจสอบหน้า รายละเอียดสินค้า เข้ามาครั้งแรก', async () => {
            await handsetList.buttonCategoryIsSelected('handset');
            await handsetList.selectIconBrand('APPLE');
            await handsetList.selectModel('iPhone 12 Pro Max');
            await handsetList.selectProduct('iPhone 12 Pro Max 512GB');
            await handsetList.clickButtonNEXT('NEXT');

            await handsetList.buttonCategoryIsSelected('handset');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay('iPhone 12 Pro Max 512GB');
            await productSelling.buttonCustomerGroupIsSelected('ONLY');
            await productSelling.textCampaignNameDisplay('Handset Only (Redesign)');
        });
        await test.step('ตรวจสอบการเลือก Campaign', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
            await productSelling.campaignFullPaymentDisplay('Handset Only (Redesign)');
            await productSelling.campaignInstallmentFlagDisplay('Handset Only (Redesign)');
            await productSelling.campaignMaximumContractDisplay('Handset Only (Redesign)');
        });
        await test.step('ตรวจสอบการเลือก Trade ที่มีส่วนลด Exclue vat By Percent', async () => {
            await productSelling.clickTradeByNumber('TP23085207');
            await productSelling.checkTradeByNumber('TP23085207');
            await productSelling.checkTradeDiscount('TP23085207', '(ส่วนลดพิเศษ 1,557 บาท)');
            await productSelling.buttonAddToCartDisabled();
        });
        await test.step('No FreeGoods', async () => {
            await productSelling.tradeFreeGoodsNoDisplay('TP23085207');
        });
    });
    test('ลูกค้าซื้อ Vivo V5  ในหน้ารายละเอียดสินค้า สามารถแสดง Campaign และ Trade ที่ไม่มีส่วนลด แสดงผลได้ถูกต้อง ', async ({ page }) => {
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ตรวจสอบหน้า รายละเอียดสินค้า เข้ามาครั้งแรก', async () => {
            await handsetList.buttonCategoryIsSelected('handset');
            await handsetList.selectIconBrand('VIVO');
            await handsetList.selectModel('V5');
            await handsetList.selectProduct('VIVO V5');
            await handsetList.clickButtonNEXT('NEXT');

            await handsetList.buttonCategoryIsSelected('handset');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay('VIVO V5');
            await productSelling.buttonCustomerGroupIsSelected('ONLY');
            await productSelling.textCampaignNameDisplay('Handset Only (Redesign)');
        });
        await test.step('ตรวจสอบการเลือก Campaign', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
            await productSelling.campaignFullPaymentDisplay('Handset Only (Redesign)');
            await productSelling.campaignInstallmentFlagDisplay('Handset Only (Redesign)');
            await productSelling.campaignMaximumNoContractDisplay('Handset Only (Redesign)');
        });
        await test.step('ตรวจสอบการเลือก Trade ที่มีส่วนลด Exclue vat By Baht', async () => {
            await productSelling.clickTradeByNumber('TP23085208');
            await productSelling.checkTradeByNumber('TP23085208');
            await productSelling.buttonAddToCartDisabled();
        });
        await test.step('No FreeGoods', async () => {
            await productSelling.tradeFreeGoodsDisplay('TP23085208',0);
        });
    });
    test('ลูกค้าซื้อ Apple iiPhone 11 256GB ในหน้ารายละเอียดสินค้า สามารถแสดง Campaign และ Trade ที่เป็น Installment No Discount แสดงผลได้ถูกต้อง ', async ({ page }) => {
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ตรวจสอบหน้า รายละเอียดสินค้า เข้ามาครั้งแรก', async () => {
            await handsetList.buttonCategoryIsSelected('handset');
            await handsetList.selectIconBrand('APPLE');
            await handsetList.selectModel('iPhone 11');
            await handsetList.selectProduct('iPhone 11 256GB');
            await handsetList.clickButtonNEXT('NEXT');

            await handsetList.buttonCategoryIsSelected('handset');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay('iPhone 11 256GB');
            await productSelling.buttonCustomerGroupIsSelected('ONLY');
            await productSelling.textCampaignNameDisplay('Handset Only (Redesign)');

        });
        await test.step('ตรวจสอบการเลือก Campaign', async () => {
            await productSelling.clickCampaignByName('Handset Only (Redesign)');
            await productSelling.campaignFullPaymentDisplay('Handset Only (Redesign)');
            await productSelling.campaignInstallmentFlagDisplay('Handset Only (Redesign)');
            await productSelling.campaignMaximumNoContractDisplay('Handset Only (Redesign)');
        });
        await test.step('ตรวจสอบการเลือก Trade ที่มีส่วนลด Exclue vat By Baht', async () => {
            await productSelling.clickTradeByNumber('TP23085208');
            await productSelling.checkTradeByNumber('TP23085208');
            await productSelling.checkTradeNoDiscount('TP23085208');
            await productSelling.buttonAddToCartDisabled();
        });
        await test.step('No FreeGoods', async () => {
            await productSelling.tradeFreeGoodsDisplay('TP23085208',0);
            await productSelling.tradeFreeGoodsDisplay('TP23085208',1);
        });
    });
    test('ลูกค้าซื้อ iPhone 11 256GB ในหน้ารายละเอียดสินค้า กรณีแสดง Campaign และ Trade ที่เป็น No Installment และ No Discount แสดงผลได้ถูกต้อง ', async ({ page }) => {
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ตรวจสอบหน้า รายละเอียดสินค้า เข้ามาครั้งแรก', async () => {
            await handsetList.buttonCategoryIsSelected('handset');
            await handsetList.selectIconBrand('APPLE');
            await handsetList.selectModel('iPhone 11');
            await handsetList.selectProduct('iPhone 11 256GB');
            await handsetList.clickButtonNEXT('NEXT');

            await handsetList.buttonCategoryIsSelected('handset');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay('iPhone 11 256GB');
            await productSelling.buttonCustomerGroupIsSelected('ONLY');
            await productSelling.textCampaignNameDisplay('Handset Only (No Installment)');
        });
        await test.step('ตรวจสอบการเลือก Campaign', async () => {
            await productSelling.clickCampaignByName('Handset Only (No Installment)');
            await productSelling.campaignFullPaymentDisplay('Handset Only (No Installment)');
            await productSelling.campaignNoInstallmentFlagDisplay('Handset Only (No Installment)');
            await productSelling.campaignMaximumNoContractDisplay('Handset Only (No Installment)');
        });
        await test.step('ตรวจสอบการเลือก Trade ที่มีส่วนลด Exclue vat By Baht', async () => {
            await productSelling.clickTradeByNumber('TP23085209');
            await productSelling.checkTradeByNumber('TP23085209');
            await productSelling.checkTradeNoDiscount('TP23085209');
            await productSelling.buttonAddToCartDisabled();
        });
        await test.step('No FreeGoods', async () => {
            await productSelling.tradeFreeGoodsDisplay('TP23085209',0);
            await productSelling.tradeFreeGoodsDisplay('TP23085209',1);
        });
    });
    test('ลูกค้าซื้อ Huawei Y7PRO2018 ในหน้ารายละเอียดสินค้า กรณีไม่มี Campaign ระบบแสดงข้อความ ไม่พบข้อมูล Campaign', async ({ page }) => {
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ตรวจสอบหน้า รายละเอียดสินค้า เข้ามาครั้งแรก', async () => {
            await handsetList.buttonCategoryIsSelected('handset');
            await handsetList.selectIconBrand('HUAWEI');
            await handsetList.selectModel('Y7PRO2018');
            await handsetList.selectProduct('Y7PRO2018');
            await handsetList.clickButtonNEXT('NEXT');

            await handsetList.buttonCategoryIsSelected('handset');
            await productSelling.coverImageProductDisplay();
            await productSelling.textProductNameDisplay('Y7PRO2018');
        });
        await test.step('ตรวจสอบการเลือก Campaign', async () => {
            await productSelling.showErrorCampaignDisplay('ไม่พบข้อมูลแคมเปญ');
        });  
    });
});
