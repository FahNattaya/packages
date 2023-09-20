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
        await mcLogin.loginMyChannel(users.aisshop1.username,users.aisshop1.password);
        await mcLanding.clickButtonStock();
    });
    test('ผู้ใช้งานตรวจสอบ Stock ของ Brand / Model / รุ่นที่เลือก ภายใน My Shop', async ({ page }) => {
        const stock = new StockPage(page);
        await test.step('ผู้ใช้ตรวจสอบ location code แสดงถูกต้อง', async () => {
            await stock.textTitleStockPageDispaly();
            await stock.buttonCategoryIsSelected('handset');
            await stock.barLocationNameDisplay('1100')
        });
        await test.step('ผู้ใช้งานเลือก Brand Apple Model iPhone 12 Pro 128GB', async () => {
            await stock.textTitleStockPageDispaly();
            await stock.buttonCategoryIsSelected('handset');
            await stock.selectIconBrand('APPLE');
            await stock.selectModel('iPhone 12 Pro Max');
        });
        await test.step('ผู้ใช้งานตรวจสอบข้อมูล Stock ที่ Tab Myshop', async () => {
            await stock.tabLocationIsSelected('MyShop');
            await stock.textTitleAISShopDisplay('1100 : AIS Shop');
            await stock.textHeaderTableDisplay('Brand/Model');
            await stock.textHeaderTableDisplay('Color');
            await stock.textHeaderTableDisplay('QTY');
            await stock.textBrandModelDisplay(' APPLE IP12PM_512GB ');
            await stock.textQTYDisplay();
        });
    });
    test('ผู้ใช้งานตรวจสอบ Stock ของ Brand / Model /รุ่นที่เลือก ในสาขาภายในแขวง/ตำบลเดียวกัน', async ({ page }) => {
        const stock = new StockPage(page);
        await test.step('ผู้ใช้งานเลือก Brand Apple Model iPhone 5S', async () => {
            await stock.textTitleStockPageDispaly();
            await stock.buttonCategoryIsSelected('handset');
            await stock.selectIconBrand('APPLE');
            await stock.swipeToModel('IPHONE 5S');
            await stock.selectModel('IPHONE 5S');
        });
        await test.step('ผู้ใช้งานตรวจสอบข้อมูล Stock ที่ Tab สาขาอื่น', async () => {
            await stock.selectTabOther();
            await stock.selectButtonFilterTumbol();
            await stock.selectCheckboxCart(' สาขาอาคารเอไอเอส 1 ');
            await stock.clickButtonSearchLocation();
            await stock.selectButtonShop();
            await stock.textHeaderTableDisplay('Brand/Model');
            await stock.textHeaderTableDisplay('Color');
            await stock.textHeaderTableDisplay('QTY');
            await stock.textBrandModelDisplay('APPLE IPHONE5S 64GB');
            await stock.textQTYDisplay();
        });
    });
    test('ผู้ใช้งานตรวจสอบ Stock ของ Brand / Model / รุ่นที่เลือก ในสาขาภายในเขต/อำเภอเดียวกัน', async ({ page })=> {
        const stock = new StockPage(page);
        await test.step('ผู้ใช้งานเลือก Brand Apple Model iPhone 12 Pro', async () => {
            await stock.textTitleStockPageDispaly();
            await stock.buttonCategoryIsSelected('handset');
            await stock.selectIconBrand('SAMSUNG');
            await stock.selectIconBrand('APPLE');
            await stock.selectModel('iPhone 12 Pro');
        });
        await test.step('ผู้ใช้งานตรวจสอบข้อมูล Stock สาขาภายในเขต/อำเภอเดียวกัน ', async () => {
            await stock.selectTabOther();
            await stock.selectButtonFilterAmphur();
            await stock.selectCheckboxCart(' สาขาอาคารเอไอเอส 1 ');
            await stock.clickButtonSearchLocation();
        });
    });
    test('ผู้ใช้งานตรวจสอบ Stock ของ Brand / Model / รุ่นที่เลือก ในสาขาภายในจังหวัดเดียวกัน', async ({ page })=> {
        const stock = new StockPage(page);
        await test.step('ผู้ใช้งานเลือก Brand Apple Model iPhone 12 Pro', async () => {
            await stock.textTitleStockPageDispaly();
            await stock.buttonCategoryIsSelected('handset');
            await stock.selectIconBrand('APPLE');
            await stock.selectModel('AIR3256GB');
        });
        await test.step('ผู้ใช้งานเลือกจังหวัดเดียวกันในแทบสาขาอื่น', async () => {
            await stock.selectTabOther();
            await stock.selectButtonFilterProvince();
            await stock.selectCheckboxCart(' สาขาอาคารเอไอเอส 1 ');
            await stock.clickButtonSearchLocation();
        });
        await test.step('ผู้ใช้งานเลือกสาขาที่ต้องการตรวจสอบสินค้า', async () => {
            await stock.selectCheckboxCart(' สาขาอาคารเอไอเอส 1 ');
            await stock.selectCheckboxCart(' สาขาเซ็นทรัล ปิ่นเกล้า ');
            await stock.selectCheckboxCart(' สาขา Flag Ship เซ็นทรัลเวิลด์ ');
            await stock.selectCheckboxCart(' สาขาเซ็นทรัลซิตี้บางนา ');
            await stock.selectCheckboxCart(' สาขาแฟชั่นไอร์แลนด์ ');
            await stock.clickButtonSearchLocation();
            await stock.selectButtonShop();
        });
        await test.step('ผู้ใช้ต้องการตรวจสอบสินค้าในสาขาที่เลือก', async () => {
            await stock.textHeaderTableDisplay('Brand/Model');
            await stock.textHeaderTableDisplay('Color');
            await stock.textHeaderTableDisplay('QTY');
            await stock.textBrandModelDisplay('APPLE AIR3256GB');
        });
    });
});