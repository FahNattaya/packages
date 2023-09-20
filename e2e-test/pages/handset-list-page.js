const { expect } = require('@playwright/test');

exports.HandSetListPage = class HandSetListPage {
    constructor(page) {
        this.page = page;
        this.inputSearchBar = page.getByTestId('searchBarInput');
        this.buttonSearchBar = page.getByTestId('searchBarButton');
        this.buttonClearTextSearch = page.getByTestId('clear-text-button');
        this.buttonScanImei = page.getByTestId('scanImeiButton');
        this.modelList = page.getByTestId('modelContinuousList');
        this.emptyBrand = page.getByTestId('emptyBrand');
        this.emptyModel = page.getByTestId('emptyModel');
        this.dropdownList = page.getByTestId('dropdownList');
        this.buttonNext = page.getByTestId('buttonNext');
        this.buttonMore = page.getByTestId('more-button');
    }

    async clickSearchModel (text){
        await expect(this.inputSearchBar).toBeVisible();
        await this.inputSearchBar.fill(text);
        await this.buttonSearchBar.click();
    }

    async searchModel (text){
        await expect(this.inputSearchBar).toBeVisible();
        await this.inputSearchBar.fill(text);
        await this.inputSearchBar.press('Enter');
    }

    async clickClearFiledSearch () {
        await this.buttonClearTextSearch.click();
    }

    async enterClearFiledSearch () {
        await this.inputSearchBar.clear();
        await this.inputSearchBar.press('Enter');
    }


    async textPlaceholderDisplay (){
        const status = await this.inputSearchBar.getAttribute('placeholder');
        expect(status).toContain('ค้นหา');
        
    }

    async textProductNameDisplay (name) {
        await expect(this.page.getByText(name)).toBeVisible();
    }

    async fieldSearchBarDisplay () {
        await expect(this.inputSearchBar).toBeVisible();
        await expect(this.buttonSearchBar).toBeVisible();
    }

    async barFilterDisplay () {
        await expect(this.dropdownList).toBeVisible();
    }

    async buttonScanIMEIDisplay() {
        await expect(this.buttonScanImei).toBeVisible();
    }

    async clickButtonScanIMEI() {
        await this.buttonScanImei.click();
    }

    async emptyStateBrandDisplay() {
        await expect(this.emptyBrand).toBeVisible();
    }

    async emptyStateModelDisplay() {
        await expect(this.emptyModel).toBeVisible();
    }

    async modelContinuousListDisplay() {
        await expect(this.modelList).toBeVisible();
    }

    async modelContinuousListNotDisplay() {
        await expect(this.modelList).not.toBeVisible();
    }

    async textFilterPanelDisplay (name) {
        await expect(this.page.getByText(name)).toBeVisible();
    }

    async buttonCategoryIsSelected(category) {
        const status = await this.page.getByTestId(`${category}Category`).getAttribute('class');
        expect(status).toContain('active');
    }

    async selectIconBrand(brand) {
        await this.page.getByTestId(`selectedBrand-${brand}`).click();
    }

    async iconBrandIsSelected(brand) {
        const status = await this.page.getByTestId(`selectedBrand-${brand}`).getAttribute('class');
        expect(status).toContain('selected');
    }

    async iconBrandIsNotSelected(brand) {
        const status = await this.page.getByTestId(`selectedBrand-${brand}`).getAttribute('class');
        expect(status).not.toContain('selected');
    }

    async selectModel(model) {
        await this.page.getByTestId(`model-${model}`).click();
    }

    async selectProduct(product) {
        await this.page.getByTestId(`product-${product}`).click();
    }

    async productImageDisplay(product) {
        await expect(this.page.getByTestId(`productImage-${product}`)).toBeVisible();
        await expect(this.page.getByTestId(`productColor-${product}`)).toBeVisible();
    }

    async clickButtonMore () {
        await this.buttonMore.click();
    }

    async buttonNextIsDisabled() {
        const parent = await this.page.locator('app-button-next', { has: this.buttonNext })
        const status = await parent.getAttribute('class');
        expect(status).toContain('disabled');
    }

    async clickButtonNEXT (name) {
        await expect(this.buttonNext).toContainText(name);
        await this.buttonNext.click()
    }
}