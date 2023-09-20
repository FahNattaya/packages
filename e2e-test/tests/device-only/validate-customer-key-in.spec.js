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
const { users } = require('../../data/data.json');
const { ServiceCarePage } = require('../../pages/service-care');
const { ListNumberPage } = require('../../pages/list-number-page');


test.describe('Payment credit card for partner', async () => {
    test.beforeEach(async ({ page }) => {
        const navBar = new NavBarpage(page);
        const mcLogin = new MyChannelLoginPage(page);
        const mcLanding = new MyChannelLandingPage(page);
        const handsetList = new HandSetListPage(page);
        const productSelling = new ProductSellingPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.aisshop1.username, users.aisshop1.password);
        await mcLanding.clickButtonHandsetAndAccessory();
        await handsetList.fieldSearchBarDisplay();
        await handsetList.buttonCategoryIsSelected('handset');
        await handsetList.selectIconBrand('APPLE');
        await handsetList.selectModel('iPhone 12');
        await handsetList.selectProduct('iPhone 12 128GB');
        await handsetList.clickButtonNEXT('NEXT');
        await handsetList.fieldSearchBarDisplay();
        await productSelling.clickButtonOK();
        await productSelling.clickButtonColor('GREEN');
        await productSelling.selectCustomerCriteria('ONLY');
        await productSelling.clickCampaignByName('Handset Only(Redesign Discount)');
        await productSelling.clickTradeByNumber('TP23085207');
        await productSelling.clickButtonAddToCart();
    });
    test('6.ลูกค้า AIS เลือกตรวจสอบสิทธิด้วยการกรอกเบอร์มือถือ', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const serviceCare = new ServiceCarePage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ผู้ใช้งานตรวจสอบหน้า Validate Customer', async () => {
            await validateCustomer.buttonNextIsDisabled();
        });
        await test.step('ผู้ใช้งานกรอกเบอร์มือถือ 10 หลัก และกดปุ่ม "Next"', async () => {
            await validateCustomer.inputfieldKeyIn('0934000803');
            await validateCustomer.buttonNextIsEnable();
            await validateCustomer.clickButtonNext();
        });
        await test.step('ผู้ใช้งานตรวจสอบหน้า Service Care', async () => {
            await navBar.navbarCustomerNameDisplay(' นายนุเทส เทสรีดีไชน ');
            await navBar.navbarMobileNoDisplay('0934000803');
            await productSelling.clickRadioNotInterest();
            await serviceCare.buttonNextIsDisabled();
        });

    });
    test('8.ลูกค้า AIS เลือกตรวจสอบสิทธิด้วยการกรอกเบอร์ FBB', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const serviceCare = new ServiceCarePage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ผู้ใช้งานตรวจสอบหน้า Validate Customer', async () => {
            await validateCustomer.buttonNextIsDisabled();
        });
        await test.step('ผู้ใช้งานกรอกเบอร์ FBB และกดปุ่ม "Next"', async () => {
            await validateCustomer.inputfieldKeyIn('8850094767');
            await validateCustomer.buttonNextIsEnable();
            await validateCustomer.clickButtonNext();
        });
        await test.step('ผู้ใช้งานตรวจสอบหน้า Service Care', async () => {
            await navBar.navbarCustomerNameDisplay(' บะหมี่น้ำ ต้มยำ ');
            await navBar.navbarMobileNoDisplay('8850094767');
            await productSelling.clickRadioNotInterest();
            await serviceCare.buttonNextIsDisabled();
        });
    });
    test('10.ลูกค้า AIS เลือกตรวจสอบสิทธิด้วยการกรอกเลข Passport', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const serviceCare = new ServiceCarePage(page);
        const productSelling = new ProductSellingPage(page);
        const listNumber = new ListNumberPage(page);

        await test.step('ผู้ใช้งานตรวจสอบหน้า Validate Customer', async () => {
            await validateCustomer.buttonNextIsDisabled();
        });
        await test.step('ผู้ใช้งานกรอกเลข Passport และกดปุ่ม "Next"', async () => {
            await validateCustomer.inputfieldKeyIn('2022111117257');
            await validateCustomer.buttonNextIsEnable();
            await validateCustomer.clickButtonNext();
        });
        await test.step('ลูกค้าเลือกเบอร์มือถือในการทำรายการ', async () => {
            await navBar.navbarCustomerNameDisplay(' Mr.Mc Testredesign ');
            await listNumber.selectChargeType('Postpaid ');
            await listNumber.selectNumber('0934009897');
            await listNumber.clickButtonNext();
        });
        await test.step('ผู้ใช้งานตรวจสอบหน้า Service Care', async () => {
            await navBar.navbarCustomerNameDisplay(' Mr.Mc Testredesign ');
            await navBar.navbarMobileNoDisplay('0934009897');
            await productSelling.clickRadioNotInterest();
            await serviceCare.buttonNextIsDisabled();
        });
    });
    test('12.ลูกค้า AIS เลือกตรวจสอบสิทธิด้วยการกรอกเลข Alien', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const serviceCare = new ServiceCarePage(page);
        const productSelling = new ProductSellingPage(page);
        const listNumber = new ListNumberPage(page);

        await test.step('ผู้ใช้งานตรวจสอบหน้า Validate Customer', async () => {
            await validateCustomer.buttonNextIsDisabled();
        });
        await test.step('ผู้ใช้งานกรอกเลข Alien และกดปุ่ม "Next"', async () => {
            await validateCustomer.inputfieldKeyIn('7364788416136');
            await validateCustomer.buttonNextIsEnable();
            await validateCustomer.clickButtonNext();
        });
        await test.step('ลูกค้าเลือกเบอร์มือถือในการทำรายการ', async () => {
            await navBar.navbarCustomerNameDisplay(' คุณDevice sale ');
            await listNumber.selectChargeType('Postpaid ');
            await listNumber.selectNumber('0934009899');
            await listNumber.clickButtonNext();
        });
        await test.step('ผู้ใช้งานตรวจสอบหน้า Service Care', async () => {
            await navBar.navbarCustomerNameDisplay(' คุณDevice sale ');
            await navBar.navbarMobileNoDisplay('0934009899');
            await productSelling.clickRadioNotInterest();
            await serviceCare.buttonNextIsDisabled();
        });
    });
    test('14.ลูกค้าเลือกตรวจสอบเบอร์ด้วยการกรอกข้อมูล CID ผิด', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const serviceCare = new ServiceCarePage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ผู้ใช้งานตรวจสอบหน้า Validate Customer', async () => {
            await validateCustomer.buttonNextIsDisabled();
        });
        await test.step('ผู้ใช้งานกรอกเลขบัตรประชาชน 12 หลัก และกดปุ่ม "NEXT"', async () => {
            await validateCustomer.inputfieldKeyIn('110020111671');
            await validateCustomer.clickButtonNext();
            await validateCustomer.validateKeyInErrorDisplay('*กรุณากรอกรูปแบบให้ถูกต้อง');
        });
        await test.step('ผู้ใช้งานกรอกเลขบัตรประชาชนไม่ถูกหลัก และกดปุ่ม "NEXT"', async () => {
            await validateCustomer.clearfieldKeyIn();
            await validateCustomer.inputfieldKeyIn('2100201116712');
            await validateCustomer.clickButtonNext();
            await validateCustomer.validateKeyInErrorDisplay('*กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง');
        });
        await test.step('ผู้ใช้งานกรอกเลขบัตรประชาชนไม่ถูกหลัก และกดปุ่ม "NEXT"', async () => {
            await validateCustomer.clearfieldKeyIn();
            await validateCustomer.inputfieldKeyIn('0100201116712');
            await validateCustomer.clickButtonNext();
            await validateCustomer.validateKeyInErrorDisplay('*กรุณากรอกเลขบัตรประจำตัวคนต่างด้าวให้ถูกต้อง');
        });
    });
    test('15.ลูกค้าเลือกตรวจสอบเบอร์ด้วยการกรอกข้อมูล Mobile No. ผิด', async ({ page }) => {
        const navBar = new NavBarpage(page);
        const validateCustomer = new ValidateCustomerPage(page);
        const serviceCare = new ServiceCarePage(page);
        const productSelling = new ProductSellingPage(page);

        await test.step('ผู้ใช้งานตรวจสอบหน้า Validate Customer', async () => {
            await validateCustomer.buttonNextIsDisabled();
        });
        await test.step('ลูกค้ากรอกเบอร์ที่ไม่ใช่ของ AIS และกดปุ่ม "NEXT"', async () => {
            await validateCustomer.inputfieldKeyIn('0800477040');
            await validateCustomer.clickButtonNext();
            //await validateCustomer.dialogErrorMobileNoIncorrect();
        });
        await test.step('ผู้ใช้งานกรอกเลขบัตรประชาชนไม่ถูกหลัก และกดปุ่ม "NEXT"', async () => {
            await validateCustomer.clickDialogOKButton();
            await validateCustomer.clearfieldKeyIn();
            await validateCustomer.inputfieldKeyIn('66800477040');
            await validateCustomer.clickButtonNext();
            await validateCustomer.validateKeyInErrorDisplay('*กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง');
        });
        test('16.ลูกค้าเลือกตรวจสอบเบอร์ด้วยการกรอกข้อมูล FBB ผิด', async ({ page }) => {
            const navBar = new NavBarpage(page);
            const validateCustomer = new ValidateCustomerPage(page);
            const serviceCare = new ServiceCarePage(page);
            const productSelling = new ProductSellingPage(page);

            await test.step('ผู้ใช้งานตรวจสอบหน้า Validate Customer', async () => {
                await validateCustomer.buttonNextIsDisabled();
            });
            await test.step('ลูกค้ากรอกเบอร์ที่ไม่ใช่ของ AIS และกดปุ่ม "NEXT"', async () => {
                await validateCustomer.inputfieldKeyIn('0800477040');
                await validateCustomer.clickButtonNext();
                //await validateCustomer.dialogErrorMobileNoIncorrect();
                await validateCustomer.clickDialogOKButton();
                await validateCustomer.clearfieldKeyIn();
            });
            await test.step('ผู้ใช้งานกรอกเลขบัตรประชาชนไม่ถูกหลัก และกดปุ่ม "NEXT"', async () => {
                await validateCustomer.inputfieldKeyIn('66800477040');
                await validateCustomer.clickButtonNext();
                await validateCustomer.validateKeyInErrorDisplay('*กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง');
            });
        });
        test('17.ลูกค้าเลือกตรวจสอบเบอร์ด้วยการกรอกข้อมูล Passport ผิด', async ({ page }) => {
            const navBar = new NavBarpage(page);
            const validateCustomer = new ValidateCustomerPage(page);
            const serviceCare = new ServiceCarePage(page);
            const productSelling = new ProductSellingPage(page);

            await test.step('ผู้ใช้งานตรวจสอบหน้า Validate Customer', async () => {
                await validateCustomer.buttonNextIsDisabled();
            });
            await test.step('ลูกค้ากรอกเลข Passport ภาษาไทยไม่ได้/อักษขระ และกดปุ่ม "NEXT"', async () => {
                await validateCustomer.inputfieldKeyIn('A0066210');
                await validateCustomer.clickButtonNext();
                await validateCustomer.validateKeyInErrorDisplay('*กรุณากรอกรูปแบบให้ถูกต้อง');
                await validateCustomer.clearfieldKeyIn();
            });
            await test.step('ลูกค้ากรอกเลข Passport ผิดหลัก และกดปุ่ม "NEXT"', async () => {
                await validateCustomer.inputfieldKeyIn('A1234567');
                await validateCustomer.clickButtonNext();
                await validateCustomer.validateKeyInErrorDisplay('*กรุณากรอกเลขบัตรหนังสือเดินทางให้ถูกต้อง');
            });
        });
        test('18.ลูกค้าเลือกตรวจสอบเบอร์ด้วยการกรอกข้อมูล Alien ผิด', async ({ page }) => {
            const navBar = new NavBarpage(page);
            const validateCustomer = new ValidateCustomerPage(page);
            const serviceCare = new ServiceCarePage(page);
            const productSelling = new ProductSellingPage(page);

            await test.step('ผู้ใช้งานตรวจสอบหน้า Validate Customer', async () => {
                await validateCustomer.buttonNextIsDisabled();
            });
            await test.step('ลูกค้ากรอกเลข Alien 12 หลัก  และกดปุ่ม "NEXT"', async () => {
                await validateCustomer.inputfieldKeyIn('610020111671');
                await validateCustomer.clickButtonNext();
                await validateCustomer.validateKeyInErrorDisplay('*กรุณากรอกรูปแบบให้ถูกต้อง');
                await validateCustomer.clearfieldKeyIn();
            });
            await test.step('ลูกค้ากรอกเลข Alien ขึ้นต้นด้วย 0 6 7 และกดปุ่ม "NEXT"', async () => {
                await validateCustomer.inputfieldKeyIn('6100201116712');
                await validateCustomer.clickButtonNext();
                await validateCustomer.validateKeyInErrorDisplay('*กรุณากรอกเลขบัตรประจำตัวคนต่างด้าวให้ถูกต้อง');
            });
        });


        // test.afterEach(async ({ page }) => {
        //     const navBar = new NavBarpage(page);
        //     const cart = new CartPage(page);

        //     await navBar.clickButtonCart();
        //     await cart.clickDeleteAll();
        //     await cart.dialogDeleteConfirmDisplay();
        //     await cart.clickConfirmDelete();
        //     await cart.dialogDeleteSuccessDisplay();
        // });
    });
});