const { test } = require("@playwright/test");
const { MyChannelLoginPage } = require("../../pages/mychannel-login-page");
const { MyChannelLandingPage } = require("../../pages/mychannel-landing-page");
const { ValidateCustomerPage } = require("../../pages/validate-customer-page");
const { NavBarpage } = require("../../pages/nav-bar-page");
const { CustomerNavbarPage } = require("../../pages/customer-nav-bar-page");
const { ListNumberPage } = require("../../pages/list-number-page");
const { HandSetListPage } = require("../../pages/handset-list-page");
const { ProductSellingPage } = require("../../pages/product-selling-page");
const { CartPage } = require("../../pages/cart-page");
const { PaymentMethodPage } = require("../../pages/payment-method-page");
const { CaptureIdCardPage } = require("../../pages/capture-id-card-page");
const { ContractPage } = require('../../pages/contract-page');


test.describe("AIS Mobile Shop Device Sale Check Contract SCN 002 ไม่ยอมรับสัญญา ไม่ยอมกด checkbox ปุ่ม next disable ", async () => {
  test("ผู้ใช้งาน ไม่ยอมรับสัญญา ไม่ยอมกด checkbox ปุ่ม next disable ", async ({ page }) => {
    const mcLogin = new MyChannelLoginPage(page);
    const mcLanding = new MyChannelLandingPage(page);
    const validateCustomer = new ValidateCustomerPage(page);
    const navBar = new NavBarpage(page);
    const customerNavBar = new CustomerNavbarPage(page);
    const listNumber = new ListNumberPage(page);
    const handsetList = new HandSetListPage(page);
    const productSelling = new ProductSellingPage(page);
    const cart = new CartPage(page);
    const paymentMethod = new PaymentMethodPage(page);
    const captureIdCard = new CaptureIdCardPage(page);
    const contract = new ContractPage(page);

    await test.step("ผู้ใช้งานเข้าหน้าเช็คสิทธิ์ของลูกค้า", async () => {
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
      await handsetList.selectBrandName('iPhone 12 Pro Max 128GB');
      await handsetList.clickButtonNEXT('NEXT');
    });
    await test.step("ผู้ใช้งานตรวจสอบ product-selling เลือก Campaign และ Trade แล้ว กดปุ่ม ADD TO CART", async () => {
      await navBar.navbarDisplay();
      await customerNavBar.customerNavbarDisplay();

      await handsetList.pillCategoryIsSelected('handset');
      await productSelling.pillCustomerTypeIsSelected('Existing');
      await productSelling.clickButtonColor("GRAPHITE");
      await productSelling.pillCustomerTypeIsSelected('Existing');
      await productSelling.clickCampaignByIndex('0');
      await productSelling.clickTradeByIndex('0');
      await productSelling.clickRadioNotInterest();
      await productSelling.selectReason("ยังไม่ตัดสินใจ");
      await productSelling.clickButtonAddToCart();
    });

    await test.step("ผู้ใช้งานตรวจสอบ ตระกร้าสินค้า กดปุ่ม PAY NOW", async () => {
        await navBar.navbarDisplay();
        await customerNavBar.customerNavbarDisplay();
    
        await cart.textQuantityDisplay('จำนวน');
        await cart.textPirceDisplay('ราคา');
        await cart.textOrderSummaryDisplay("สรุปรายการสั่งซื้อ")
        await cart.clickButtonPayNow();
      });
      await test.step("ผู้ใช้งานตรวจสอบหน้า payment-method เลือกเงินสด (เต็มจำนวน) กดปุุ่่ม NEXT", async () => {
        await navBar.navbarDisplay();
        await customerNavBar.customerNavbarDisplay();

        await paymentMethod.textPaymentDisplay('เลือกช่องทางการชำระเงิน');
        await paymentMethod.clickIconOrderList();
        await paymentMethod.clickcounTer();
        await paymentMethod.clickPayMentCash();
        await paymentMethod.clickButtonNext();
      });
      await test.step("ผู้ใช้งานตรวจสอบหน้า capture-id-card กดปุ่ม ถ่ายรูป แล้ว กดปุ่ม NEXT", async () => {

        await captureIdCard.cameraIdCardDisplay();
        await captureIdCard.buttonNextIsDisabled();
        await captureIdCard.clickButtonCapture();
        await captureIdCard.clickButtonNext();
      });
      await test.step("ผู้ใช้งานตรวจสอบหน้า contract User ไม่ยอมรับสัญญา ไม่ยอมกด checkbox ปุ่ม next disable ", async () => {
        await navBar.navbarDisplay();
        await customerNavBar.customerNavbarDisplay();

        await contract.contractImageDisplay();
        await captureIdCard.buttonNextIsDisabled();
      });
  });
});
