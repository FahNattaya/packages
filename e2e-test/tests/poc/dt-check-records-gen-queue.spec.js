const { test } = require("@playwright/test");
const { DtCheckRecordsGenQue } = require("../../pages/dt-check-records-gen-queue");

test.describe("Check records when finish Gen Queue", async () => {
  test('ผู้ใช้งานเข้าสู่ระบบจากหน้า Digital Trading', async ({ page }) => {
    const dtPage = new DtCheckRecordsGenQue(page);

    await test.step("ผู้ใช้งานเข้าสู่ระบบ", async () => {
      await dtPage.gotoDigitalTrading();
      await dtPage.loginDigitalTrading("kanyr505", "1");
    });

    await test.step('Device Sale Update Material Code', async () => {
      await dtPage.clickButtonSaleOrder();
      await dtPage.clickButtonDeviceSaleUpdateMaterialCode();
      await dtPage.inputMobileNo('0970694486');
      await dtPage.clickButtonQuery();
    });
  });
});