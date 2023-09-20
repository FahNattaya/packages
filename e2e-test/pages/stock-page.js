const { expect } = require('@playwright/test');

exports.StockPage = class StockPage {
    constructor(page) {
        this.page = page;
        this.modelCarouselList = page.locator('id=carouselControls');
        this.tabMyShop = page.getByTestId('tabMyShop');
        this.barLocationName = page.getByTestId('barLocationName');
        this.tabOtherShop = page.getByTestId('tabOtherShop');
        this.tabOnlineStock = page.getByTestId('tabOnlineStock');
        this.buttonFilterTumbol = page.getByTestId('filterTanbolButton');
        this.buttonFilterAmphur = page.getByTestId('filterDistrictButton');
        this.buttonFilterProvince = page.getByTestId('filterProvinceButton');
        this.buttonSearchLocation = page.getByTestId('searchLocationButton');
        this.checkboxCart = page.getByTestId('cartCheckbox');
        this.textTitlePage = page.getByTestId('textTitlePageName');
        this.buttonBlack = page.getByTestId('buttonBack');
        this.productTotalQty = page.getByTestId('productTotalQty');
        this.buttonShop = page.getByTestId('shop-button0');
        this.textMenuSalePilotTest = page.locator('id=pagination-sub');
    }

    async textTitleStockPageDispaly() {
        await expect(this.textTitlePage).toBeVisible();
    }

    async clickButtonBlack() {
        await this.buttonBlack.click();
    }

    async textMenuSalePilotTestDisplay() {
        await expect(this.textMenuSalePilotTest).toBeVisible();
    }

    async barLocationNameDisplay(location) {
        await expect(this.barLocationName).toContainText(location);
    }

    async buttonCategoryIsSelected(category) {
        const status = await this.page.getByTestId(`${category}Category`).getAttribute('class');
        expect(status).toContain('active');
    }

    async tabLocationIsSelected(location) {
        const status = await this.page.getByTestId(`tab${location}`).getAttribute('active');
        expect(status).toContain('true');
    }

    async swipeToModel(model) {
        const element = this.page.getByTestId(`model-${model}`).first();
        await element.scrollIntoViewIfNeeded();
        await expect(element).toBeVisible();
    }

    async swipeTo() {
        const signPad = await this.modelCarouselList.boundingBox();
        const padX = signPad.x + signPad.width / 2
        const padY = signPad.y + signPad.height / 2

        await this.page.mouse.move(padX, padY);
        await this.page.mouse.down();
        await this.page.mouse.move(padX - 500, padY);
    }

    async selectIconBrand(brandname) {
        await this.page.getByTestId(`selectedBrand-${brandname}`).click();
    }

    async selectModel(model) {
        await this.page.getByTestId(`model-${model}`).click();
    }

    async selectProduct(product) {
        await this.page.getByTestId(`product-${product}`).click();
    }

    async selectTabOther() {
        await this.tabOtherShop.click();
    }

    async selectTabOnlineStock() {
        await this.tabOnlineStock.click();
    }

    async selectButtonFilterTumbol() {
        await expect(this.buttonFilterTumbol).toBeVisible();
        await this.buttonFilterTumbol.click();
    }

    async selectButtonFilterAmphur() {
        await expect(this.buttonFilterAmphur).toBeVisible();
        await this.buttonFilterAmphur.click();
    }

    async selectButtonFilterProvince() {
        await expect(this.buttonFilterProvince).toBeVisible();
        await this.buttonFilterProvince.click();
    }

    async clickButtonSearchLocation() {
        await this.buttonSearchLocation.click();
    }

    async selectCheckboxCart(locationname) {
        await this.checkboxCart.getByText(locationname).click();
    }

    async textTitleAISShopDisplay(locationname) {
        await this.page.getByTestId(`locationName-${locationname}`).click();
    }

    async selectButtonShop() {
        await this.buttonShop.click();
    }

    async textHeaderTableDisplay(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async textBrandModelDisplay(brandmodel) {
        await expect(this.page.getByText(brandmodel).first()).toBeVisible();
    }

    async textQTYDisplay() {
        await expect(this.productTotalQty.first()).toBeVisible();
    }

    async textColorDisplay(brandmodel, color) {
        await this.page.getByTestId(`${brandmodel}-${color}`).click();
    }

}