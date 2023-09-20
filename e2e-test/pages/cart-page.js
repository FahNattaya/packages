const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
        this.inputProduct = page.getByTestId('inputProduct').first();
        this.textProduct = page.getByTestId('textProduct');
        this.buttonCheckboxList = page.getByTestId('cartListCheckbox');
        this.buttonTrashList = page.getByTestId('cartListTrash');
        this.buttonProductTash = page.getByTestId('cartProductTash').first();
        this.buttonBuyMore = page.getByTestId('buttonBuyMore');
        this.buttonPayNow = page.getByTestId('buttonPayNow');
        this.stepBarCart = page.getByTestId('stepCart');
        this.stepBarPayment = page.getByTestId('stepPayment');
        this.stepBarComplete = page.getByTestId('stepComplete');
    }

    async textProductNameDisplay(index,productName) {
        await expect(this.page.getByTestId(`product${index}-name`)).toContainText(productName);
    }

    async textCampaignNameDisplay(index,campaignName) {
        await expect(this.page.getByTestId(`product${index}-campaignName`)).toContainText(campaignName);
    }

    async textProductDisplay(text) {
        await expect(this.textProduct).toContainText(text);
    }

    async buttonConfirmDisplay(text) {
        await expect(this.buttonConfirm).toContainText(text);
    }

    async buttonCheckboxtlistDisplay () {
        await this.buttonCheckboxList.click();
    }

    async buttonTrashListtDisplay () {
        await expect(this.buttonTrashList).toBeVisible();
    }

    async buttonProductTashDisplay () {
        await expect(this.buttonProductTash).toBeVisible();
    }

    async textQuantityDisplay(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async textSelectedProductDisplay(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async textSelectedCampaignDisplay(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async textPirceDisplay(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async textOrderSummaryDisplay(text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async stepCartStatusIsWating () {
        const status = await this.stepBarCart.getAttribute('class');
        expect(status).toContain('waiting');
    }

    async stepPaymentStatusIsDefault () {
        const status = await this.stepBarPayment.getAttribute('class');
        expect(status).toContain('default');
    }

    async stepCompleteStatusIsDefault () {
        const status = await this.stepBarComplete.getAttribute('class');
        expect(status).toContain('default');
    }

    async clickButtonBuyMore () {
        await this.buttonBuyMore.click();
    }

    async clickButtonPayNow () {
        await this.buttonPayNow.click();
    }

    async buttonPayNowIsDisabled () {
        const parent = await this.page.locator('app-button-next',  { has: this.buttonPayNow })
        const status = await parent.getAttribute('class');
        expect(status).toContain('disabled');
    }

    async buttonPayNowIsEnabled () {
        const parent = await this.page.locator('app-button-next',  { has: this.buttonPayNow })
        const status = await parent.getAttribute('class');
        expect(status).not.toContain('disabled');
    }

    async clickDeleteAll() {
        await expect(this.buttonTrashList).toBeVisible();
        await this.buttonTrashList.click();
    }

    async dialogDeleteConfirmDisplay () {
        await expect(this.page.getByRole('heading', { name: 'ต้องการลบรายการที่เลือกหรือไม่?' })).toBeVisible();
    }

    async dialogFinisfConfirmDisplay () {
        await expect(this.page.getByRole('heading', { name: 'เพิ่มสินค้าไปยังตะกร้าสำเร็จ!' })).toBeVisible();
    }

    async clickCancelDelete() {
        await this.page.getByRole('button', { name: 'ยกเลิก' }).click();
    }

    async clickConfirmDelete() {
        await expect(await this.page.getByRole('button', { name: 'ลบ' })).toBeVisible();
        await this.page.getByRole('button', { name: 'ลบ' }).click();
    }

    async clickDialogOKButton() {
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async dialogDeleteSuccessDisplay () {
        await expect(this.page.getByRole('heading', { name: 'ลบสำเร็จแล้ว' })).toBeVisible();
    }
}