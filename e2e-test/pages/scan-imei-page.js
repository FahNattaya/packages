const { expect } = require('@playwright/test');

exports.ScanImeiPage = class ScanImeiPage {
    constructor(page) {
        this.page = page;
        this.buttonScanImei = page.getByTestId('scanImeiButton');
        this.closeModelImei = page.getByTestId('closeModelImei');
        this.inputIMEI = page.getByTestId('inputImei');
        this.iconScanIMEI = page.getByTestId('iconScanImei');
        this.buttonConfirmIMEI = page.getByTestId('buttonConfirm');
        this.buttonNextIMEI = page.getByTestId('buttonNextImei');
        this.textProduct = page.getByTestId('textProduct');
        this.inputProduct = page.getByTestId('inputProduct');
        this.inputPrice = page.getByTestId('inputPrice');
        this.scanSucces = page.getByText('แสกน IMEI สำเร็จ', { exact: true });
        this.errorNotFoundInDT = page.getByText('ORA-20102: IMEI ไม่ถูกต้อง (Data Not found in WDS,AWN)', { exact: true });
        this.errorNotFoundInSFF = page.getByText('IMEI is not found in sff_handset', { exact: true });
        this.errorImeiIncorrect = page.getByText('ข้อมูล IMEI ไม่ถูกต้อง กรุณาตรวจสอบเครื่อง ยี่ห้อ/รุ่น/สี ที่เลือกมา', { exact: true });
        this.errorImeiStatusIncorrect = page.getByText(' IMEI is Registered', { exact: true });
    }

    async dialogIMEINStatusIncorrectDisplay() {
        await expect(this.errorImeiStatusIncorrect).toBeVisible();
    }

    async clickButtonScanIMEI() {
        await this.buttonScanImei.click();
    }

    async keyInIMEI(imeiNo) {
        await this.inputIMEI.clear();
        await this.inputIMEI.fill(imeiNo);
    }

    async inputImeiDisplay(imeiNo) {
        const data = await this.inputIMEI.getAttribute('data-in');
        expect(data).toContain(imeiNo);
    }

    async inputProductDisplay(productName) {
        const data = await this.inputProduct.getAttribute('data-in');
        expect(data).toContain(productName);
    }

    async inputPriceDisplay(price) {
        await expect(this.inputPrice).toContainText(price);
    }

    async clickButtonConfirmIMEI() {
        await this.buttonConfirmIMEI.click();
    }

    async clickButtonNextIMEI() {
        await this.buttonNextIMEI.click();
    }

    async clickButtonCloseIMEI() {
        await this.closeModelImei.click();
    }

    async dialogIMEISuccessDisplay() {
        await expect(this.scanSucces).toBeVisible();
    }

    async dialogIMEINotFoundDTDisplay() {
        await expect(this.errorNotFoundInDT).toBeVisible();
    }

    async dialogIMEINotFoundSFFDisplay() {
        await expect(this.errorNotFoundInSFF).toBeVisible();
    }

    async dialogIncorrectIMEIDisplay() {
        await expect(this.errorImeiIncorrect).toBeVisible();
    }

    async clickDialogOKButton() {
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async inputProductDisplay(productName) {
        const data = await this.inputProduct.getAttribute('data-in');
        expect(data).toContain(productName);
    }

    async buttonConfirmIMEIDisable() {
        const value = await this.buttonConfirmIMEI.getAttribute('disabled');
        expect(value).toContain('');
    }

    async inputProductDisable() {
        await expect(this.inputProduct).toHaveAttribute('readonly', '');
    }

    async inputPriceDisable() {
        await expect(this.inputPrice).toHaveAttribute('readonly', '');
    }

    async inputImeiModalIsEmpty() {
        await expect(this.inputIMEI).toHaveAttribute('data-in', '');
        await expect(this.inputProduct).toHaveAttribute('data-in', '');
        await expect(this.inputProduct).toHaveAttribute('readonly', '');
        await expect(this.inputPrice).toHaveAttribute('data-in', '');
        await expect(this.inputPrice).toHaveAttribute('readonly', '');
    }

    async inputImeiCartIsEmpty() {
        await expect(this.inputIMEI).toHaveAttribute('data-in', '');
        await expect(this.inputProduct).toHaveAttribute('data-in', '');
    }
}