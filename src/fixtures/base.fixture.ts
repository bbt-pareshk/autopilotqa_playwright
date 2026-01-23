import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {

    const allowChat =
      testInfo.tags.includes('@chat') ||
      process.env.ALLOW_CHAT === 'true';

    console.log(
      `[CHAT WIDGET] ${allowChat ? 'ALLOWED' : 'HIDDEN'} | Test: ${testInfo.title}`
    );

    if (!allowChat) {
      await page.addInitScript(() => {
        const style = document.createElement('style');
        style.setAttribute('data-test', 'chat-hidden-style');
        style.innerHTML = `
          iframe#chat-widget-minimized,
          iframe[title*="LiveChat"],
          iframe[name*="chat"],
          iframe[src*="chat"] {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }
        `;
        document.head.appendChild(style);
      });
    }

    await use(page);
  },
});

export { expect };
