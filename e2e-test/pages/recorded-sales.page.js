const { expect } = require('@playwright/test');

exports.RecordedSalesPage = class RecordedSalesPage {
    constructor(page) {
        this.page = page;
        this.buttonMainMenu = page.getByTestId('buttonMainMenu');
    }

    async validateTextDisplay(){
        await this.page.getByText(' บันทึกข้อมูลการขาย ');
        await this.page.getByText('หมายเลข ');
        await this.page.getByText('ทำรายการสำเร็จและบันทึกข้อมูลการขายเรียบร้อยแล้ว');
        await this.page.getByText(' ระบบจัดส่ง SMS แจ้งรายละเอียดการทำรายการทำรายการข้อตกลงและเงื่อนไขบริการโทรศัพท์เคลื่อนที่ ไปที่เบอร์  ขอบคุณที่เลือกใช้บริการ AIS ');
        await this.page.getByText('พิมพ์เอกสารการทำธุรกรรม/สัญญาซื้อเครื่อง');
        await this.page.getByText(' ( เฉพาะกรณีลูกค้าแสดงตวามจำนงขอเอกสารเท่านั้น !! ) ');
        await this.page.getByText(' พิมพ์ใบเสร็จ ');
    }

    async clickButtonMainMenu(){
        await this.buttonMainMenu.click();
    }
}