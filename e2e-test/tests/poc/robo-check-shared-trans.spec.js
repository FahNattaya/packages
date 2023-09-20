const { test } = require('@playwright/test');
const { RoboCheckSharedTrans } = require('../../pages/robo-check-shared-trans-page');

test.describe("Robo Check SharedTrans", async () => {
    test('ผู้ใช้งานเข้าสู่ระบบจากหน้า Mc Admin', async ({ page }) => {
        const mcAdmPage = new RoboCheckSharedTrans(page);

        await test.step("ผู้ใช้งานเข้าสู่ระบบ Mc Admin", async () => {
            await mcAdmPage.gotoMcAdmin();
            await mcAdmPage.loginMcAdmin("test", "test");
        });

        await test.step('สามารถเลือกรายการที่ต้องการตรวจสอบข้อมูลได้', async () => {
            await mcAdmPage.clickButtonDB();
            await mcAdmPage.inputSearch("sharedtransactions");
            await mcAdmPage.clickSharedTransactions();
            await mcAdmPage.inputfieldTextBox("DATA.sim_card.mobileNo");
            await mcAdmPage.selectRadioButton("Equals");
            await mcAdmPage.specifyYourSearchTerm("0910030854");
            await mcAdmPage.clickButtonSearch();
        });
    });
});