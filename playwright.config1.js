const { devices } = require('@playwright/test');
const { trace } = require('console');
const { use } = require('./playwright.config');

const config = {
  testDir: './tests',
  retries : 1,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 7000
  },
  /* Run tests in files in parallel */
  fullyParallel: false, // true | false
  workers: 3, // Max 5
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html', // 'list' | 'dot' | 'line' | 'json' | 'junit' | 'html' | 'null'
  use: {
    launchOptions: {
      args: ['--start-maximized'], // Start the browser maximized // '--start-fullscreen'
    },
    headless: false, // true | false
    viewport: null, // Disable the default viewport // { width: 1920, height: 1080 } | null
    screenshot: 'on', // off, on, only-on-failure
    trace: 'on', // off, on, retain-on-failure
    ignoreHTTPSErrors: true, // for SSL Cerificate
    permissions: ['notifications', 'geolocation'],
    // HTTP Credential

  },
  projects: [
    {
      name: 'Safari',
      use: {
        browserName: 'webkit', // 'chromium' | 'firefox' | 'webkit'
      }
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit', // 'chromium' | 'firefox' | 'webkit'
        ...devices['iPhone 11']
      }
    },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium', // 'chromium' | 'firefox' | 'webkit'
      }
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox', // 'chromium' | 'firefox' | 'webkit'
      }
    },
    {
      name: 'Microsoft Edge',
      use: {
        // ...devices['Desktop Edge'], //if used this browser will not open in full screen
        channel: 'msedge',
      }
    },
  ],
};

module.exports = config; // Export the config object