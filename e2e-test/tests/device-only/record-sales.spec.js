const { test } = require('@playwright/test');
const { NavBarpage } = require('../../pages/nav-bar-page');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { ValidateCustomerPage } = require('../../pages/validate-customer-page');
const { HandSetListPage } = require('../../pages/handset-list-page');
const { ProductSellingPage } = require('../../pages/product-selling-page');
const { CartPage } = require('../../pages/cart-page');
const { ScanImeiPage } = require('../../pages/scan-imei-page');
const { PaymentMethodPage } = require('../../pages/payment-method-page');
const { RecordedSalesPage } = require('../../pages/recorded-sales.page');
const { DtCheckRecordsGenQue } = require("../../pages/dt-check-records-gen-queue");
const { users } = require('../../data/data.json');

test.describe('AIS Shop Device Only Gen Receipt', async () => {
    const data = {
        iconBrand: 'APPLE',
        model: 'iPhone 12 Pro Max',
        product: 'iPhone 12 Pro Max 128GB',
        campaignName: 'Handset Only(Redesign Discount)',
        tradeNumber: 'TP23085207',
        color: 'GREEN',
        email: 'dvs-redesign@test.team',
        customerName: 'Redesign Is Real',
        mobileNumber: '0934000623',
    }
    test('เทสหน้าบันทึกข้อมูลารขาย', async ({page}) => {
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const handsetList = new HandSetListPage(page);
        const navBar = new NavBarpage(page);
        const productSelling = new ProductSellingPage(page);
        const cart = new CartPage(page);
        const scanImei = new ScanImeiPage(page);
        const paymentMethod = new PaymentMethodPage(page);
        const recordSale = new RecordedSalesPage(page);
        const dtPage = new DtCheckRecordsGenQue(page);

        await test.step('ผู้ใช้งานเข้าสู้ระบบและเลือกปุ่ม skip', async () => {
            await mcLogin.gotoLoginPage();
            await mcLogin.loginMyChannel(users.asp.username, users.asp.password);
            await mcLanding.clickButtonHandsetAndAccessory();
            await validateCustomer.clickButtonSkip();
        });

        await test.step('ผู้ใช้งานเลือกซื้อเครื่องiPhone 12 Pro Max 128GB', async () => {
            await handsetList.clickButtonScanIMEI();
            await scanImei.inputProductDisable();
            await scanImei.inputProductDisable();
            await scanImei.keyInIMEI('904251555460081');
            await scanImei.clickButtonConfirmIMEI();
            await scanImei.clickButtonNextIMEI();
        });

        await test.step('ผู้ใช้งานตรวจสอบข้อมูลรุ่นที่เลือกมาในหน้า Product-selling', async () => {
            await productSelling.clickButtonOK();
            await productSelling.clickButtonColor(data.color);
            await productSelling.selectCustomerCriteria('ONLY');
        });

        await test.step('ผู้ใช้งานสามารถเลือก Campaign และ Trade ได้', async () => {
            await productSelling.clickCampaignByName(data.campaignName);
            await productSelling.clickTradeByNumber(data.tradeNumber);
            await productSelling.clickButtonServiceCare();
            await productSelling.selectAISCarePlus('1');
            await productSelling.inputFieldTextMobileNoForOtp('0934009892');
            await productSelling.clickButtonSendOtp();
            await productSelling.inputTextOtpCode('0000');
            await productSelling.clickButtonVerifyOtp();
            await productSelling.clickButtonOK();
            await productSelling.inputTextEmail(data.email);
            await productSelling.clickButtonAddToCart();
            await productSelling.clickButtonOK();
            await navBar.clickButtonCart();
        });

        await test.step('ผู้ใช้งานเข้าสู้หน้า Cart', async () => {
            await cart.textQuantityDisplay('จำนวน');
            await cart.textPirceDisplay('ราคา');
            await cart.textOrderSummaryDisplay('สรุปรายการสั่งซื้อ')
            await cart.clickButtonPayNow();
        });

        await test.step("ลูกค้าเลือกรูปแบบการชำระเงิน", async () => {
            await paymentMethod.stepCartStatusSuccess('ตะกร้าสินค้า');
            await paymentMethod.stepPaymentStatusWaiting('จ่ายเงิน');
            await paymentMethod.stepCompleteStatusDefault('เสร็จสิ้น');
            await paymentMethod.selectRadioPayment('CC');
        });

        await test.step("ลูกค้าเลือกที่อยู่ตามบิล", async () => {
            await paymentMethod.clickReceiptAddressTitle();
            await paymentMethod.selectRadioAddress('billing');
            await paymentMethod.clickButtonNext('NEXT');
        });

        await test.step("ผู้ใช้งานตรวจสอบข้อมูลการทำรายการสำเร็จ", async () => {
            await recordSale.validateTextDisplay();
            await recordSale.buttonMainMenu();
            await mcLanding.buttonSalePilotNotDisplay();
            await browser.close();
        });
        
        test.afterEach(async ({ page }) => {
            await test.step("login DT clear imei", async () => {
                await dtPage.gotoDigitalTrading();
                await dtPage.loginDigitalTrading("kanyr505", "1");
            });

            await test.step('change location', async () => {
                await page.getByRole('button', { name: 'Login' }).click();
                await page.getByRole('link', { name: 'Setup' }).click();
                await page.getByText('Change Location Code').click();
                await page.locator('#listLocationCodeInput').click();
                await page.locator('#listLocationCodeInput').fill('97439');
                await page.getByRole('button', { name: 'Change All' }).click();
            });

            await test.step('change imei', async () => {
                await page.getByRole('link', { name: 'Sale & Order' }).click();
                await page.getByText('Monitor & Approve Transaction').click();
                await page.locator('#collapseQueryResult').getByText('IMEI').click();
                await page.locator('#collapseQueryResult').getByText('IMEI').click();
                await page.locator('#serialList').click();
                await page.locator('#serialList').fill('904251555460081');
                await page.getByRole('button', { name: 'OK' }).click();
                await page.locator('#imei_1 div').first().click();
                await page.getByTitle('Delete').click();
                await page.getByRole('button', { name: 'ยืนยัน' }).click();
            });
        });
    });
});