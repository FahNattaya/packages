const { expect } = require('@playwright/test');

exports.ProductSellingPage = class ProductSellingPage {
    constructor(page) {
        this.page = page;
        this.imeiCode = page.getByTestId('imeiCode');
        this.showErrorCampaign = page.getByTestId('showErrorCampaign');
        this.coverImageProduct = page.getByTestId('coverImageProduct');
        this.buttonAisCare = page.getByTestId('buttonService1');
        this.buttonAppleCare = page.getByTestId('buttonService0');
        this.imgModelDevice = page.getByTestId('image-product-detail');
        this.searchBarInput = page.getByTestId('search-bar-input');
        this.searchBarButton = page.getByTestId('search-bar-button');
        this.categoryBar = page.locator('class=category-bar');
        this.buttonScanIMEI = page.getByTestId('scanImeiButton');
        this.textProductPrice = page.locator('class=product-price');
        this.textHeaderCampaign = page.getByTestId('lableHeaderCampaign');
        this.loadingSkeleton = page.locator('app-skeleton-loading');
        this.productDetails = page.getByTestId('product-detail');
        this.tradeBox = page.getByTestId('tradeBox1');
        this.buttonAddToCart = page.getByTestId('buttonAddToCart');
        this.buttonBuy = page.getByTestId('buttonBuyNow');
        this.buttonOK = page.getByTestId('buttonOk')
        this.buttonCart = page.getByTestId('buttonCart');
        this.buttonService = page.getByTestId('buttonService');
        this.fieldInputTextEmail = page.getByTestId('inputTextEmail');
        this.textEmail = page.locator("css=label[for='email']");
        this.radioNotInterest = page.getByTestId('radioNotInterest');
        this.inputPhoneNumberModal = page.getByTestId('inputPhoneNumberModal');
        this.buttonSave = page.getByTestId('buttonSave');
        this.dropdownSelectReason = page.getByTestId('selectReason');
        this.radioAppleCare = page.getByTestId('radioAppleCare+0');
        this.infoWordPackage = page.getByTestId('package-info-word');
        this.radioCurrentPackage = page.locator('id=current-package');
        this.dialogFinishTitle = page.getByRole('heading', { name: 'Finish!' });
        this.dialogOKButton = page.getByRole('button', { name: 'OK' });
        this.textProductName = page.getByTestId('productName');
        this.textProductPrice = page.getByTestId('productPrice');
        this.fieldInputTextMobileNoForOtp = page.getByTestId('inputTextMobileNoForOtp');
        this.buttonSendOtp = page.getByTestId('buttonSendOtp');
        this.fieldInputTextOtpCode = page.getByTestId('inputTextOtpCode');
        this.buttonVerifyOtp = page.getByTestId('buttonVerifyOtp');
        this.dialogPackageListDetails = page.getByTestId('packageListDetails');
    

    }

    async imeiCodeDisplay (imeiCode) {
        await expect(this.imeiCode).toContainText(imeiCode);
    }

    async selectCustomerCriteria (criteria) {
        await this.page.getByTestId(criteria).click();
    }

    async checkTradePriceDisplay(tradeNumber,tradePrice){
        await expect(this.page.getByTestId(`netPrice-${tradeNumber}`)).toContainText(tradePrice);
    }

    async showErrorCampaignDisplay(messageError){
        await expect(this.showErrorCampaign).toContainText(messageError);
    }
    
    async tradeFreeGoodsDisplay(tradeNumber, index) {
        await expect(this.page.getByTestId(`freeGoods-${tradeNumber}-${index}`)).toBeVisible();
    }

    async tradeFreeGoodsNoDisplay(tradeNumber) {
        await expect(this.page.getByTestId(`freeGoods-${tradeNumber}`)).not.toBeVisible();
    }

    async campaignMaximumContractDisplay(campaignName) {
        await expect(this.page.getByTestId(`maximumContract-${campaignName}`)).toBeVisible();
    }
    async campaignMaximumNoContractDisplay(campaignName) {
        await expect(this.page.getByTestId(`maximumContract-${campaignName}`)).not.toBeVisible();
    }

    async campaignNoInstallmentFlagDisplay(campaignName) {
        await expect(this.page.getByTestId(`installmentFlag-${campaignName}`)).not.toBeVisible();
    }
    async campaignInstallmentFlagDisplay(campaignName) {
        await expect(this.page.getByTestId(`installmentFlag-${campaignName}`)).toBeVisible();
    }

    async campaignFullPaymentDisplay(campaignName) {
        await expect(this.page.getByTestId(`fullPayment-${campaignName}`)).toBeVisible();
    }

    async coverImageProductDisplay() {
        await expect(this.coverImageProduct).toBeVisible();
    }

    async fieldSearchDisplay() {
        await expect(this.searchBarInput).toBeVisible();
        await expect(this.searchBarButton).toBeVisible();
    }

    async buttonCategoryBarDisplay() {
        await expect(this.categoryBar).toBeVisible();
    }

    async textProductNameDisplay(textProductName) {
        await expect(this.textProductName).toContainText(textProductName);
    }

    async textProductPriceDisplay(textProductPrice) {
        await expect(this.textProductPrice).toContainText(textProductPrice);
    }

    async textHeaderCampaignDisplay() {
        await expect(this.textHeaderCampaign).toBeVisible();
    }

    async clickCampaignByName(campaignName) {
        await this.page.getByTestId(`campaign-${campaignName}`).click();
    }

    async validateMaxTermCampaign() {
        await expect(this.page.getByText(' ผ่อนชำระสูงสุด 40 เดือน  ')).toBeVisible();
    }

    async validateInstallmentCampaign() {
        await expect(this.page.getByText(' ผ่อนชำระสูงสุด 40 เดือน ')).not.toBeVisible();
    }

    async validateFreegood() {
        await expect(this.page.getByText(' ผ่อนชำระสูงสุด 40 เดือน ')).not.toBeVisible();
    }

    async checkTradeByNumber(tradeNumber) {
        await expect(this.page.getByTestId(`trade-${tradeNumber}`)).toBeVisible();
    }
    async checkTradeDiscount(number, discount) {
        await expect(this.page.getByTestId(`specialDiscount-${number}`)).toContainText(discount);
    }

    async checkTradeNoDiscount(number) {
        await expect(this.page.getByTestId(`specialDiscount-${number}`)).not.toBeVisible();
    }

    async clickTradeByNumber(tradeNumber) {
        await this.page.getByTestId(`trade-${tradeNumber}`).click();
    }

    async textTradeNameDisplay() {
        await expect(this.tradeBox).toBeVisible();
    }

    async buttonCustomerGroupIsSelected(menuCode) {
        const status = await this.page.getByTestId(menuCode).getAttribute('active');
        expect(status).toContain('true');
    }

    async clickButtonAddToCart() {
        await this.buttonAddToCart.click();
    }

    async inputMobileModal(mobileNo) {
        await this.inputPhoneNumberModal.click();
        await this.inputPhoneNumberModal.type(mobileNo);
        await this.buttonSave.click();
    }

    async clickButtonBuyNow() {
        await this.buttonBuy.click();
    }

    async clickButtonOK() {
        await expect(this.buttonOK).toBeVisible();
        await this.buttonOK.click();
    }

    async textCampaignNameDisplay(campaignName) {
        await expect(this.page.getByTestId(`campaign-${campaignName}`)).toBeVisible();
    }

    async textTradeNameDisplay(tradeName) {
        await expect(this.page.getByTestId(`trade-${tradeName}`)).toBeVisible();
    }

    async campaignPayAdvanceDisplay(index, text) {
        await expect(this.page.getByTestId(`campaign-${index}`)).toContainText(text)
    }

    async tradePayAdvanceDisplay(index, text) {
        await expect(this.page.getByTestId(`trade-${index}`)).toContainText(text)
    }

    async buttonAppleCareDisplay() {
        await expect(this.buttonAppleCare).toBeVisible();
    }
    async buttonAisCareDisplay() {
        await expect(this.buttonAisCare).toBeVisible();
    }

    async clickButtonServiceCare() {
        await this.buttonService.dblclick();
    }

    async selectAppleCare() {
        await this.radioAppleCare.click();
    }

    async selectAISCarePlus(index) {
        await this.page.getByTestId(`radioAIS Care Plus${index}`).click();
    }

    async inputFieldTextMobileNoForOtp(mobieno) {
        await this.fieldInputTextMobileNoForOtp.click();
        await this.fieldInputTextMobileNoForOtp.fill(mobieno);
    }

    async clickButtonSendOtp() {
        await this.buttonSendOtp.click();
    }

    async buttonSendOtpDisabled() {
        await this.buttonSendOtp.isDisabled();
    }

    async inputTextOtpCode(otpCode) {
        await this.fieldInputTextOtpCode.click();
        await this.fieldInputTextOtpCode.fill(otpCode);
    }
    
    async clickButtonVerifyOtp(){
        await expect(this.buttonVerifyOtp).toBeVisible();
        await this.buttonVerifyOtp.click();
    }

    async dialogOtpFailDisplay(text){
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async dialogPackageListDetailsDisplay() {
        await expect(this.dialogPackageListDetails).toBeVisible();
    }

    async inputTextEmail(email) {
        await expect(this.fieldInputTextEmail).toBeVisible();
        await this.fieldInputTextEmail.click();
        await this.fieldInputTextEmail.type(email);
        await this.textEmail.click();
    }

    async clickRadioNotInterest() {
        await this.radioNotInterest.click();
    }

    async selectReason(text) {
        await this.dropdownSelectReason.selectOption(`${text}`);
    }

    async dialogUnableToAddToCart(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async selectPackageList(message) {
        await this.page.getByText(message).click();
    }

    async buttonAddToCartDisabled() {
        const parent = await this.page.locator('app-button-next', { has: this.buttonAddToCart })
        const status = await parent.getAttribute('class');
        expect(status).toContain('disabled');
    }

    async clickButtonColor(colorname) {
        await this.page.getByTestId(`selectColor-${colorname}`).click();
    }

    async checkStockColorDisplay(color) {
        await expect(this.page.getByTestId(`inventories-${color}`)).toBeVisible();
    }


    async checkTextStockOnline(text) {
        await expect(this.page.getByTestId(`online${text}`)).toBeVisible();
    }

    async checkTextStockOnline(text) {
        await expect(this.page.getByTestId(`online${text}`)).not.toBeVisible();
    }

    async checkTextOutofStock(color) {
        await expect(this.page.getByTestId(`stockStatus-${color}`)).toBeVisible();
        await expect(this.page.getByTestId(`selectColor-${color}`)).toBeDisabled();
    }

    async checkTextOutofStockPartner(color) {
        await this.page.getByTestId(`selectColor-${color}`).click();
        await expect(this.page.getByTestId(`selectColor-${color}`)).toBeVisible();
        await expect(this.page.getByTestId(`inventories-${color}`)).not.toBeVisible();
        await expect(this.page.getByTestId(`stockStatus-${color}`)).not.toBeVisible();
    }

    async checkInfoWordPackageDisble() {
        await expect(this.infoWordPackage).toBeVisible();
    }

    async clickRadioCurrentPackage() {
        await expect(this.radioCurrentPackage).toBeVisible();
        await this.radioCurrentPackage.click();
    }

    async clickButtonTextPackage(textPackage) {
        await expect(this.page.getByText(`${textPackage}`)).toBeVisible();
        await this.page.getByText(`${textPackage}`).click()
    }

    async clickListPackage(namepackage) {
        await expect(this.page.getByText(`${namepackage}`)).toBeVisible();
        await this.page.getByText(`${namepackage}`).click();
    }

    async clickRadioTitleListPackage(index) {
        await expect(this.page.getByTestId(`radioTitleListPackage-${index}`)).toBeVisible();
        await this.page.getByText(`${index}`).click();
    }

    async clickButtonClose() {
        await this.page.getByText('ปิด', { exact: true }).click();
    }

    async dialogAddToCartFinishDisplay() {
        await expect(this.dialogFinishTitle).toBeVisible();
    }

    async clickOKButtonOnDialog() {
        await expect(this.dialogOKButton).toBeVisible();
        await this.dialogOKButton.click();
    }

    async checkTradeNember(tradeNumber) {
        await this.page.getByTestId(`tradeNumber-${tradeNumber}`).click();
    }

}