const { test } = require("@playwright/test");
const { MyChannelLoginPage } = require("../../pages/mychannel-login-page");
const { MyChannelLandingPage } = require('../../pages/mychannel-landing-page');
const { users } = require("../../data/data.json");

test.describe("AIS Shop Device Sale Access Token No Access Token and Incompleted Token", async () => {
  test("ผู้ใช้งานเข้า Device Sale โดยไม่ได้ทำการ Login", async ({ page }) => {
    const mcLogin = new MyChannelLoginPage(page);

    await test.step("ผู้ใช้งานเข้าสู่ระบบ", async () => {
      await page.goto('/device-sales');
      await mcLogin.dropdownOptionDisplay();
    });
  });
  test("ผู้ใช้งานเข้า Validate Customer โดยไม่ได้ทำการ Login", async ({ page }) => {
    const mcLogin = new MyChannelLoginPage(page);

    await test.step("ผู้ใช้งานเข้าสู่ระบบ", async () => {
      await page.goto('/device-sales/validate-customer');
      await mcLogin.dropdownOptionDisplay();
    });
  });
  test('ผู้ใช้งานเข้าสู่ระบบสำเร็จ และ ไม่สามารถเข้า Menu Sale (Pilot) ได้', async ({ page }) => {
    const mcLogin = new MyChannelLoginPage(page);
    const mcLanding = new MyChannelLandingPage(page);

    await test.step('ผู้ใช้งานไม่สามารถเข้า menu Sale (pilot) ได้ เนื่องจาก location code เป็น TELEWIZ', async () => {
      await mcLogin.gotoLoginPage();
      await mcLogin.loginMyChannel(users.telewiz.username,users.telewiz.password);
      await mcLanding.textLocationCodeDisplay('');
    });
    await test.step('ผู้ใช้ตรวจสอบปุ่ม Sale (Pilot) ไม่แสดงบนหน้าจอ', async () => {
      await mcLanding.buttonSalePilotNotDisplay();
    });
  });
});
