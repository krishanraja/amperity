/**
 * Critique-loop screenshot tool.
 *
 * Usage:
 *   node scripts/screenshot.mjs <url> <outPrefix> [widths] [--full] [--dark] [--reduced]
 *
 * Examples:
 *   node scripts/screenshot.mjs http://localhost:3000 qa/shots/home 390,768,1440 --full
 *   node scripts/screenshot.mjs "http://localhost:3000/#proof" qa/shots/proof 390
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const [, , url, outPrefix, widthsArg, ...flags] = process.argv;
if (!url || !outPrefix) {
  console.error("usage: node scripts/screenshot.mjs <url> <outPrefix> [widths] [--full]");
  process.exit(1);
}
const widths = (widthsArg || "390,768,1440").split(",").map(Number);
const fullPage = flags.includes("--full");
const reduced = flags.includes("--reduced");

const heights = { 375: 667, 390: 844, 430: 932, 768: 1024, 1024: 768, 1440: 900, 1920: 1080 };

fs.mkdirSync(path.dirname(outPrefix), { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: heights[width] || 900 },
    deviceScaleFactor: 2,
    reducedMotion: reduced ? "reduce" : "no-preference",
    isMobile: width < 768,
    hasTouch: width < 768,
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  // Settle scroll-triggered reveals for full-page captures
  if (fullPage) {
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
  }
  const file = `${outPrefix}-${width}${fullPage ? "-full" : ""}.png`;
  await page.screenshot({ path: file, fullPage });
  console.log(file);
  await context.close();
}
await browser.close();
