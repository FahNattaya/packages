const { defineConfig, devices } = require("@playwright/test");
const os = require("os");

//-- poc set proxy
// const browser = await chromium.launch({
//   proxy: {
//     server: 'http://myproxy.com:3128',
//     user: 'usr',
//     password: 'pwd'
//   }
// });
//--

let args;
if (os.platform() === "win32") {
  args = [];
} else {
  args = [
    "--allow-file-access-from-files",
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
    "--use-file-for-fake-video-capture=./resources/test-idcard.y4m",
  ];
}

module.exports = defineConfig({
  testDir: "./tests/device-only",

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  workers: process.env.CI ? 1 : undefined,

  reporter: [["html", { outputFolder: "playwright-report" }]],

  use: {
    headless: true,

    baseURL: process.env.BASE_URL,

    trace: "on-first-retry",

    ignoreHTTPSErrors: true,

    video: "on",

    viewport: { width: 768, height: 1000 },

    launchOptions: {
      args: args
    },
  },

  projects: [
    {
      name: "iPad Mini",
      use: {
        ...devices["iPad Mini"],
      },
    },
  ],
});
