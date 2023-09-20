const { test } = require('@playwright/test');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { users } = require('../../data/data.json');

test.beforeEach(async ({ page }) => {
    const mcLogin = new MyChannelLoginPage(page);
    const mcLanding = new MyChannelLandingPage(page);
    const validateCustomer = new ValidateCustomerPage(page);

    await mcLogin.gotoLoginPage();
    await mcLogin.loginMyChannel(users.aisshop2.username, users.aisshop2.password);
    await mcLanding.clickButtonHandsetAndAccessory();
});


test('Userพิมพ์ชื่อสินค้าด้วยตัวพิมพ์เล็กและพิมพ์ใหญ่และกดแว่นขยาย', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.clickSearchModel('iPhone 12');
    await handsetList.selectProduct('iPhone 12 Pro Max 128GB');
  
});
test('Userพิมพ์ชื่อสินค้าแบบไม่มีช่องว่างในช่องค้นหาและกดแว่นขยาย', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.clickSearchModel('12Pro');
    await handsetList.selectProduct('IPHONE12PRO512');
});
test('Userพิมพ์ชื่อสินค้าด้วยตัวพิมพ์เล็กทั้งหมดในช่องค้นหาและกดแว่นขยาย', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.clickSearchModel('v5s');
    await handsetList.selectProduct('VIVO V5s');
});
test('Userพิมพ์ชื่อสินค้าด้วยตัวพิมพ์ใหญ่ทั้งหมดในช่องค้นหาและกดแว่นขยาย', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.searchModel('IPHONE 11');
    await handsetList.selectProduct('iPhone 11 256GB');
});
test('Userพิมพ์ชื่อสินค้าด้วยตัวพิมพ์เล็กและพิมพ์ใหญ่และกดEnter', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.searchModel('Galaxy S8');
    await handsetList.selectProduct('Galaxy S8 Plus');
});
test('Userพิมพ์ชื่อสินค้าด้วยตัวพิมพ์เล็กทั้งหมดและกดEnter', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.searchModel('galaxy s6');
    await handsetList.selectProduct('SAMSUNG Galaxy S6 32GB');
});
test('Userพิมพ์ชื่อสินค้าด้วยตัวพิมพ์ใหญ่ทั้งหมดและกดEnter', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.searchModel('IPHONE 11');
    await handsetList.selectProduct('iPhone 11 64GB');
});
test('Userกดสัญลักษณ์X clearคำในช่องว่าง', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.clickSearchModel('12 Pro Max');
    await handsetList.clickClearFiledSearch ();
        
});
test('Userกดลบคำในช่องค้นหาแล้วกด Enter', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.clickSearchModel('iPhone 12 Pro Max');
    await handsetList.enterClearFiledSearch();

});
test('Userกดลบคำในช่องค้นหาแล้วกดแว่นขยาย', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.clickSearchModel('iPhone 12 Pro Max');
    await handsetList.clickClearFiledSearch();
});
test('Userค้นหาโดยการกดเลือกแบรนด์', async ({ page }) => {
    const handsetList = new HandSetListPage (page);
    await handsetList.selectIconBrand('APPLE');
    await handsetList.selectModel('iPhone 11');
    await handsetList.selectProduct('iPhone 11 256GB');
    
});