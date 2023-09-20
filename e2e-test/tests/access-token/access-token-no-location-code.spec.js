const { test } = require('@playwright/test');
const { MyChannelLoginPage } = require('../../pages/mychannel-login-page');
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { users } = require('../../data/data.json');

test.describe('AIS Shop Device Sale Access Token 005 No Location Code Token', async () => {
    test.beforeEach(async ({ page }) => {
        const mcLogin = new MyChannelLoginPage(page);

        await mcLogin.gotoLoginPage();
        await mcLogin.loginMyChannel(users.nolocation.username,users.nolocation.password);
    });
    test('ผู้ใช้งานเข้าสู่ระบบสำเร็จ และ ไม่สามารถเข้า Menu Handset & Accessory ได้', async ({ page }) => {
        const mcLanding = new MyChannelLandingPage(page);

        await test.step('ผู้ใช้งานไม่สามารถเข้า menu Handset & Accessoriy ได้ เนื่องจากไม่มี location code', async () => {
            await mcLanding.textLocationCodeDisplay('');
            await mcLanding.clickButtonHandsetAndAccessory();
        });
        await test.step('ผู้ใช้ตรวจสอบ pop up แจ้งเตือน No Location Code', async () => {
            await mcLanding.dialogErrorTitleDisplay('No Location Code');
            await mcLanding.dialogErrorDescDisplay('Cannot found location code in access token.');
            await mcLanding.clickDialogButtonOK();
        });
    });
    test('ผู้ใช้งานเข้าสู่ระบบสำเร็จ และ ไม่สามารถเข้า Menu Stock ได้', async ({ page }) => {
        const mcLanding = new MyChannelLandingPage(page);

        await test.step('ผู้ใช้งานไม่สามารถเข้า menu Handset & Accessoriy ได้ เนื่องจากไม่มี location code', async () => {
            await mcLanding.textLocationCodeDisplay('');
            await mcLanding.clickButtonStock();
        });
        await test.step('ผู้ใช้ตรวจสอบปุ่ม Sale (Pilot) ไม่แสดงบนหน้าจอ', async () => {
            
            await mcLanding.dialogErrorTitleDisplay('No Location Code');
            await mcLanding.dialogErrorDescDisplay('Cannot found location code in access token.');
            await mcLanding.clickDialogButtonOK();
        });
    });
});