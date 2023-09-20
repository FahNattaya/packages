const { test } = require('@playwright/test');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { StockPage } = require('../../pages/stock-page');
const { users } = require('../../data/data.json');

test.describe('AIS SHOP Device Sale Check Stock My Shop Other Shop AIS Online Store', async () => {
    test.beforeEach(async ({ page }) => {
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.asp.username,users.asp.password);
        await mcLanding.clickButtonStock();
    });
    test('ผู้ใช้งานตรวจสอบ Stock ของ Brand / Model / รุ่นที่เลือก ใน AIS Online Store', async ({ page }) => {
        const stock = new StockPage(page);
        await test.step('ผู้ใช้ตรวจสอบ location code แสดงถูกต้อง', async () => {
            await stock.textTitleStockPageDispaly();
            await stock.buttonCategoryIsSelected('handset');
            await stock.barLocationNameDisplay('97439')
        });
        await test.step('เลือก Brand Apple Model iPhone 8', async () => {
            await stock.textTitleStockPageDispaly();
            await stock.buttonCategoryIsSelected('handset');
            await stock.selectIconBrand('APPLE');
            await stock.selectModel('iPhone 8');
        });
        await test.step('เลือกแทบ AIS Online Store', async () => {
            await stock.selectTabOnlineStock();
            await stock.textTitleAISShopDisplay('AIS Online Store');
        });
        await test.step('ตรวจสอบสินค้าในแทบ AIS Online Store', async () => {
            await stock.textHeaderTableDisplay('Brand/Model');
            await stock.textHeaderTableDisplay('Color');
            await stock.textHeaderTableDisplay('QTY');
            await stock.textBrandModelDisplay('APPLE IPHONE864')
            await stock.textQTYDisplay()
        });
    });
    test('ผู้ใช้งานกลับไปที่หน้า Sale Portal', async ({ page })=> {
        const stock = new StockPage(page);
        await test.step('ผู้ใช้งานกดปุ่ม Back กลับไปที่หน้าเลือก menu', async () => {
            await stock.textTitleStockPageDispaly();
            await stock.clickButtonBlack();
            await stock.textMenuSalePilotTestDisplay();
        });
    });
});