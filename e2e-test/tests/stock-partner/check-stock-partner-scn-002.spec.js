const { test } = require("@playwright/test");
const { MyChannelLoginPage } = require("../../pages/mychannel-login-page");
const { MyChannelLandingPage } = require("../../pages/mychannel-landing-page");
const { ValidateCustomerPage } = require("../../pages/validate-customer-page");
const { NavBarpage } = require("../../pages/nav-bar-page");
const { HandSetListPage } = require("../../pages/handset-list-page");
const { ProductSellingPage } = require("../../pages/product-selling-page");
const { users } = require("../../data/data.json");

test.describe("Easy plus Device Sale Only ", async () => {
  test.only("ลูกค้าเข้ามาหน้า Product selling กรณีโชว์ stock สินค้า ( มีค่า subStockCode เป็น BRN)", async ({
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
        users.asp.username,
        users.asp.password
      );
    await mcLanding.clickButtonHandsetAndAccessory();
    await validateCustomer.clickButtonSkip();
    await handsetList.selectIconBrand('APPLE'); 
    await handsetList.iconBrandIsSelected('APPLE');  
    await handsetList.selectModel('iPhone 11'); 
    await handsetList.selectProduct('iPhone 11 256GB');
    await handsetList.productImageDisplay('iPhone 11 256GB');
    await handsetList.clickButtonNEXT('NEXT');    
    await productSelling.clickButtonOK();
    await productSelling.clickButtonColor('BLACK');
    await productSelling.checkStockColorDisplay('BLACK');

    await productSelling.checkStockColorDisplay("GREEN","0");
    await productSelling.checkTextOutofStock('GREEN');
    await productSelling.checkTextStockOnline('GREEN');

    await productSelling.checkStockColorDisplay("BLACK01","0");
    await productSelling.checkTextOutofStock('BLACK01');
    await productSelling.checkTextStockOnline('BLACK01');
    
    await productSelling.checkStockColorDisplay("PURPLE","0");
    await productSelling.checkTextOutofStock('PURPLE');
    await productSelling.checkTextStockOnline('PURPLE');

    await productSelling.checkStockColorDisplay("RED","0");
    await productSelling.checkTextOutofStock('RED');
    await productSelling.checkTextStockOnline('RED');

    await productSelling.checkStockColorDisplay("WHITE","0");
    await productSelling.checkTextOutofStock('WHITE');
    await productSelling.checkTextStockOnline('WHITE');
    
    await productSelling.checkStockColorDisplay("YELLOW","0");
    await productSelling.checkTextOutofStock('YELLOW');
    await productSelling.checkTextStockOnline('YELLOW');
  });
});
