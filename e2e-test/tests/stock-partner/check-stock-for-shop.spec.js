const { test } = require("@playwright/test");
const { MyChannelLoginPage } = require("../../pages/mychannel-login-page");
const { MyChannelLandingPage } = require("../../pages/mychannel-landing-page");
const { ValidateCustomerPage } = require("../../pages/validate-customer-page");
const { NavBarpage } = require("../../pages/nav-bar-page");
const { HandSetListPage } = require("../../pages/handset-list-page");
const { ProductSellingPage } = require("../../pages/product-selling-page");
const { users } = require("../../data/data.json");

test.describe("Easy plus Device Sale Only ", async () => {
  test("ผู้ใช้งาน Login ด้วย User : Ais Shop  แสดง Trade xxxx", async ({
    page,
  }) => {
    const mcLogin = new MyChannelLoginPage(page);
    const mcLanding = new MyChannelLandingPage(page);
    const validateCustomer = new ValidateCustomerPage(page);
    const navBar = new NavBarpage(page);
    const handsetList = new HandSetListPage(page);
    const productSelling = new ProductSellingPage(page);


      await mcLogin.gotoLoginPage();
      await mcLogin.loginMyChannel(
        users.aisshop1.username,
        users.aisshop1.password
      );

    await mcLanding.clickButtonHandsetAndAccessory();
    await validateCustomer.clickButtonSkip();
    await handsetList.selectIconBrand('APPLE'); 
    await handsetList.iconBrandIsSelected('APPLE');  
    await handsetList.selectModel('iPhone 12 Pro Max'); 
    await handsetList.selectProduct('iPhone 12 Pro Max 512GB');
    await handsetList.productImageDisplay('iPhone 12 Pro Max 512GB');
    await handsetList.clickButtonNEXT('NEXT');
    await productSelling.clickButtonOK();
    await productSelling.clickButtonColor('GRAPHITE');
    await productSelling.selectCustomerCriteria('ONLY');
    await productSelling.clickCampaignByName('Handset Only(Redesign Discount)');
    await productSelling.clickTradeByNumber('TP23085207');
    await productSelling.checkTradeNember('TP23085207');
    await productSelling.clickCampaignByName('Handset Only(Redesign No Discount)');
    await productSelling.clickTradeByNumber('TP23095222');
    await productSelling.checkTradeNember('TP23095222');
  });
});
