const { test } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { CustomerNavbarPage } = require('../../pages/customer-nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { ListNumberPage } = require('../../pages/list-number-page');
const { CustomerEligiblePage } = require('../../pages/customer-eligible-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { CartPage } = require('../../pages/cart-page');
const { PaymentMethodPage } = require('../../pages/payment-method-page');
const { CaptureIdCardPage } = require('../../pages/capture-id-card-page');
const { ContractPage } = require('../../pages/contract-page');
const { SignContractPage } = require('../../pages/sign-contract-page');
const { GenQueuePage } = require('../../pages/gen-queue-page');
const { SuccessQueuePage } = require('../../pages/success-queue-page');
const { users } = require('../../data/data.json');

test.describe('AIS Shop DVS OCA BestBuy 12M Contract 001', async () => {
    test('ลูกค้าปัจจุบันเลือกซื้อสินค้า Handset พร้อม campaign Best Buy 12 M กับ AIS Best Buy 12M (Test E2E 1) แบบติดสัญญาและมีการแก้ไขลายเซ็น', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const customerNavBar = new CustomerNavbarPage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const customerEligible = new CustomerEligiblePage(page);
        const listNumber = new ListNumberPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        const paymentMethod = new PaymentMethodPage(page);
        const captureIdCard = new CaptureIdCardPage(page);
        const contract = new ContractPage(page);
        const signContract = new SignContractPage(page);
        const genQueue = new GenQueuePage(page);
        const successQueue = new SuccessQueuePage(page);

        await test.step('ผู้ใช้งานเข้าสู่ระบบ device sales เลือก menu handset & accessory', async () => {
            await mcLogin.gotoLoginPage();
            await mcLogin.loginMyChannel(users.aisshop1.username,users.aisshop1.password);
            await mcLanding.clickButtonHandsetAndAccessory();
        });
        await test.step('ผู้ใช้งานกรอกเบอร์โทรศัพท์ลูกค้าที่ต้องการทำรายการ', async () => {
            await validateCustomer.inputMobileNumber('0934000623');
            await validateCustomer.clickButtonNext();
        });
        await test.step('ตรวจสอบสิทธิ์ของลูกค้า', async () => {
            await customerEligible.clickExpandIcon();
            await customerEligible.textCustomerNameDisplay();
            await customerEligible.customerServiceYearDisplay();
            await customerEligible.customerContractDisplay();
            await customerEligible.clickExpandIcon();
        });
        await test.step('ผู้ใช้งานเลือกเบอร์โทรศัทพ์ที่ default มาให้', async () => {
            await navBar.navbarDisplay();
            await customerNavBar.customerNavbarDisplay();

            await listNumber.fieldSearchBarDisplay();
            await listNumber.pillChargeTypeDisplay('Postpaid');
            await listNumber.clickRadioNumber();
            await listNumber.clickButtonNext();
        });
        await test.step('ผู้ใช้งานเลือกสินค้าที่ต้องการซื้อ', async () => {
            await navBar.navbarDisplay();
            await customerNavBar.customerNavbarDisplay();

            await handsetList.fieldSearchBarDisplay();
            await handsetList.barFilterDisplay();
            await handsetList.buttonCategoryIsSelected('handset');
            await handsetList.selectModel(' iPhone 12 Pro Max 512GB ');
            await handsetList.clickButtonNEXT('NEXT');
        });
        await test.step('ผู้ใช้งานเลือก Campaign และ Trade', async () => {
            await navBar.navbarDisplay();
            await customerNavBar.customerNavbarDisplay();

            await handsetList.buttonCategoryIsSelected('handset');
            await productSelling.clickButtonColor('GRAPHITE');
            await productSelling.buttonCustomerGroupIsSelected('Existing');
            await productSelling.clickCampaignByIndex('0');
            await productSelling.clickTradeByIndex('0');
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAppleCare();
            await productSelling.inputTextEmail('rajuinwza@ads.team');
            await productSelling.clickButtonAddToCart();
        });
        await test.step('ผู้ใช้งานเลือก "ADD TO CART" เมื่อเลือก option ครบ', async () => {
            await navBar.navbarDisplay();
            await customerNavBar.customerNavbarDisplay();

            await cart.stepCartStatusIsWating();
            await cart.stepPaymentStatusIsDefault();
            await cart.stepCompleteStatusIsDefault();

            await cart.buttonTrashListtDisplay();
            await cart.buttonProductTashDisplay();
            await cart.textQuantityDisplay('จำนวน');
            await cart.textPirceDisplay('ราคา');
            await cart.textOrderSummaryDisplay('สรุปรายการสั่งซื้อ')
            await cart.clickButtonPayNow();
        });
        await test.step('ผู้ใช้งานเลือก "PAY NOW" เมื่อตรวจสอบข้อมูล และเลือกวิธีการชำระเงิน', async () => {
            await paymentMethod.textPaymentDisplay('เลือกช่องทางการชำระเงิน');
            await paymentMethod.clickIconOrderList();
            await paymentMethod.selectRadioPayment('Leasing');
            await paymentMethod.clickButtonNext();
        });
        await test.step('ผู้ใช้งานกดปุ่ม "ถ่ายรูป" และผู้ใช้งานกดปุ่ม "NEXT" เมื่อถ่ายรูปสำเร็จ', async () => {
            await captureIdCard.cameraIdCardDisplay();
            await captureIdCard.buttonNextIsDisabled();
            await captureIdCard.clickButtonCapture();
            await captureIdCard.clickButtonNext();
        });
        await test.step('ผู้ใช้งานเลือกยอมรับเงื่อนไขในหน้า contract', async () => {
            await contract.confirmContract();
            await contract.clickNext();
        });
        await test.step('ผู้ใช้งานกดปุ่ม แก้ไขลายเซ็น เมื่อเซ็นสำเร็จ', async () => {
            await signContract.buttonNextIsDisabled();
            await signContract.signContract();
            await signContract.clickButtonClearSign();
            await signContract.buttonNextIsDisabled();
        });
        await test.step('ผู้ใช้งานเซ็นลายเซ็นในหน้า sign contract และผู้ใช้งานกดปุ่ม "NEXT"', async () => {
            await signContract.signContract();
            await signContract.clickNext();
        });
        await test.step('ผู้ใช้งานกรอกหมายเลขบัตรคิว', async () => {
            await genQueue.inputQueue('P007');
            await genQueue.clickButtonNext();
        });
        await test.step('ผู้ใช้งานเลือก "NEXT" ในหน้า Generate Queue', async () => {
            await successQueue.titleSuccessDisplay('ทำรายการสำเร็จ');
        });
    });
});