const { test } = require('@playwright/test');

test("Go Test An Application", async ({ page, browser }) => {

    // Using the browser fixture, you can get access to the BrowserContext
    const browserContext = await browser.newContext();

    // Add cookies to the browserContext
    await browserContext.addCookies([{ name: "csrftoken", value: "mytokenvalue123", url: "https://www.google.com/" }]);


    // First we will go to the Applicaiton URL
    const appURL = "https://www.google.com/"
    page.goto(`${appURL}`);

    await page.waitForTimeout(3000);

});
