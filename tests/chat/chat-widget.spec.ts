import { test, expect } from '../../src/fixtures/base.fixture';

test(
  'Chat widget loads on dashboard',
     { tag: ['@smoke', '@regression'] },
  async ({ page }, testInfo) => {
    test.setTimeout(15_000);

    // ✅ FAST & SAFE navigation
    await page.goto('/dashboard', {
      waitUntil: 'domcontentloaded',
    });

    const chatIframe = page.locator(
      'iframe[src*="chat"], iframe[title*="chat" i]'
    );

    // ✅ Deterministic wait for delayed chat injection
    await expect.poll(
      async () => await chatIframe.count(),
      {
        timeout: 10_000,
        intervals: [500],
        message: 'Chat iframe did not load within 10s',
      }
    ).toBeGreaterThan(0);

    const finalCount = await chatIframe.count();

    console.log(
      `[CHAT PROOF] Chat iframe detected: YES | count=${finalCount} | test=${testInfo.title}`
    );
  }
);
