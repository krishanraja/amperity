/** Captures interactive states: sticky chapter mid-scroll, mega menu, mobile sheet. */
import { chromium } from "playwright-core";

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });

// 1. Sticky chapter at three scroll depths (desktop)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const box = await page.evaluate(() => {
    const el = document.querySelector("section .hidden.lg\\:block");
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });
  for (const frac of [0.15, 0.5, 0.85]) {
    await page.evaluate(({ box, frac }) => window.scrollTo(0, box.top + box.height * frac - innerHeight / 2), { box, frac });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `qa/shots/state-sticky-${Math.round(frac * 100)}.png` });
  }
  // 2. Mega menu open
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.hover("header nav button:has-text('Platform')");
  await page.waitForTimeout(600);
  await page.screenshot({ path: "qa/shots/state-megamenu.png" });
  await ctx.close();
}

// 3. Mobile sheet
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.tap("header button[aria-controls='mobile-menu']");
  await page.waitForTimeout(700);
  await page.screenshot({ path: "qa/shots/state-mobilemenu.png" });
  await ctx.close();
}

// 4. Reduced motion, hero static frame
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "qa/shots/state-reduced.png" });
  await ctx.close();
}

await browser.close();
console.log("state captures done");
