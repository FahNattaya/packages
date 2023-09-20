const { test } = require("@playwright/test");
const { MyChannelLoginPage } = require("../../pages/mychannel-login-page");
const { MyChannelLandingPage } = require("../../pages/mychannel-landing-page");
const { ValidateCustomerPage } = require("../../pages/validate-customer-page");
const { NavBarpage } = require('../../pages/nav-bar-page');
const { CustomerNavbarPage } = require('../../pages/customer-nav-bar-page');
const { ListNumberPage } = require("../../pages/list-number-page");
const { HandSetListPage } = require("../../pages/handset-list-page");
const { ProductSellingPage } = require("../../pages/product-selling-page");


test.describe("AIS Mobile Shop Device Sale Check Show Stock Product SCN 001 ระบบแสดงสี Cream , Green , Lavender , Phantom Black ลูกค้าเลือกสีที่ต้องการ", async () => {
  test("ระบบแสดง สี Cream , Green , Lavender , Phantom Black ลูกค้าเลือกสีที่ต้องการ", async ({ page }) => {
    const mcLogin = new MyChannelLoginPage(page);
    const mcLanding = new MyChannelLandingPage(page);
    const validateCustomer = new ValidateCustomerPage(page);
    const navBar = new NavBarpage(page);
    const customerNavBar = new CustomerNavbarPage(page);
    const listNumber = new ListNumberPage(page);
    const handsetList = new HandSetListPage(page);
    const productSelling = new ProductSellingPage(page);

    await test.step("ผู้ใช้งานเข้าสู่ระบบ", async () => {
      await mcLogin.gotoLoginPage();
      await mcLogin.loginMyChannel("chiraphr", "MyChannel#Aug23");
    });
    await test.step("ตรวจสอบหน้า Sale (Pilot Test)", async () => {
      await mcLanding.clickButtonHandsetAndAccessory();
    });
    await test.step("ผู้ใช้งานกรอกเบอร์โทรศัพท์ลูกค้าที่ต้องการทำรายการ", async () => {
      await validateCustomer.inputMobileNumber("0934000623");
      await validateCustomer.clickButtonNext();
    });
    await test.step("ผู้ใช้งานเลือกเบอร์โทรศัทพ์ Status : Active", async () => {
      await navBar.navbarDisplay();
      await customerNavBar.customerNavbarDisplay();

      await listNumber.pillChargeTypeDisplay("Postpaid");
      await listNumber.clickRadioNumber();
      await listNumber.clickButtonNext();
    });
    await test.step("ผู้ใช้งานเลือกสินค้าที่ต้องการซื้อ", async () => {
      await navBar.navbarDisplay();
      await customerNavBar.customerNavbarDisplay();

      await handsetList.fieldSearchBarDisplay();
      await handsetList.barFilterDisplay();
      await handsetList.pillCategoryIsSelected('handset');
      await handsetList.clickButtonMore();
      await handsetList.selectBrandName('APPLE iPad Air 64GB');
      await handsetList.clickButtonNEXT('NEXT');
    });
    await test.step("ผู้ใช้งานตรวจสอบ product-selling เลือก Campaign และ Trade แล้ว กดปุ่ม ADD TO CART", async () => {
      await navBar.navbarDisplay();
      await customerNavBar.customerNavbarDisplay();

      await handsetList.pillCategoryIsSelected("handset");
      await productSelling.clickButtonColor("SPACE GRAY");
      await productSelling.checkColorDisplay("SPACE GRAY");
      await productSelling.checkStockColorDisplay("SPACE GRAY","96");

      await productSelling.clickButtonColor("SILVER");
      await productSelling.checkColorDisplay("SILVER");
      await productSelling.checkStockColorDisplay("SILVER","12");
    });

  });
});
