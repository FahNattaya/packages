const { expect } = require('@playwright/test');

exports.NavBarpage = class NavBar {
    constructor(page) {
        this.page = page;
        this.buttonBackNavbar = page.getByTestId('buttonBack');
        this.buttonCart = page.getByTestId('buttonCart');
        this.buttonHome = page.getByTestId('buttonHome');
    }

    async clickButtonCart() {
        await expect(this.buttonCart).toBeVisible();
        await this.buttonCart.click();
    }

    async navbarDisplay () {
        await expect(this.buttonBackNavbar).toBeVisible();
        await expect(this.buttonCart).toBeVisible();
        await expect(this.buttonHome).toBeVisible();
    }

    async navbarCustomerNameDisplay (text) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async navbarMobileNoDisplay (mobileNo) {
        await expect(this.page.getByText(mobileNo)).toBeVisible();
    }

}