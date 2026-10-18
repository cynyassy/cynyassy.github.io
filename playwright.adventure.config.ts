import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/design-adventure',
  outputDir: 'test-results/design-adventure',
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report/adventure', open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:5177', trace: 'retain-on-failure' },
  webServer: { command: process.env.ADVENTURE_PREVIEW ? 'npm run preview -- --host 127.0.0.1 --port 5177 --strictPort' : 'npm run dev -- --host 127.0.0.1 --port 5177 --strictPort', url: 'http://127.0.0.1:5177', reuseExistingServer: !process.env.CI },
  projects: [
    { name: 'engine', testMatch: /(?:engine|reactor-engine)\.spec\.ts/ },
    { name: 'desktop', testMatch: /(?:browser|reactor-browser)\.spec\.ts/, use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', testMatch: /(?:browser|reactor-browser)\.spec\.ts/, use: { ...devices['Pixel 5'], viewport: { width: 390, height: 844 } } },
  ],
});
