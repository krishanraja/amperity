/**
 * Generates the full favicon set from the brand assets:
 * - favicon.ico (16, 32, 48) from the chartreuse-circle icon
 * - favicon.svg (ampersand, black with dark-scheme white variant)
 * - apple-touch-icon.png (180, full chartreuse-circle icon)
 * - icon-192.png, icon-512.png (full chartreuse-circle icon)
 * - icon-512-maskable.png (chartreuse square, ampersand in the safe zone)
 * - site.webmanifest
 *
 * Run: npm run generate:icons
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUB = path.join(ROOT, "public");
const ICON = path.join(PUB, "brand", "amperity_icon.png");
const AMPERSAND = path.join(PUB, "brand", "ampersand.svg");

// Single source for the signal color: parse it out of the tokens file.
const tokens = fs.readFileSync(path.join(ROOT, "styles", "tokens.ts"), "utf8");
const chartreuse = tokens.match(/chartreuse = "([^"]+)"/)[1];

async function main() {
  // favicon.ico from 16/32/48 renders of the circle icon
  const icoSizes = await Promise.all(
    [16, 32, 48].map((s) => sharp(ICON).resize(s, s).png().toBuffer()),
  );
  fs.writeFileSync(path.join(PUB, "favicon.ico"), await pngToIco(icoSizes));

  // favicon.svg: bare ampersand, square viewBox, dark-scheme variant
  const amp = fs.readFileSync(AMPERSAND, "utf8");
  const paths = [...amp.matchAll(/<path d="([^"]+)"\s*\/>/g)].map((m) => m[1]);
  const faviconSvg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1390.5 42 317 317">`,
    `<style>path{fill:#000000}@media (prefers-color-scheme:dark){path{fill:#ffffff}}</style>`,
    ...paths.map((d) => `<path d="${d}"/>`),
    `</svg>`,
  ].join("");
  fs.writeFileSync(path.join(PUB, "favicon.svg"), faviconSvg);

  // Full circle icon at PWA and touch sizes
  await sharp(ICON).resize(180, 180).png().toFile(path.join(PUB, "apple-touch-icon.png"));
  await sharp(ICON).resize(192, 192).png().toFile(path.join(PUB, "icon-192.png"));
  await sharp(ICON).resize(512, 512).png().toFile(path.join(PUB, "icon-512.png"));

  // Maskable 512: full-bleed chartreuse square, mark inside the 80% safe zone
  const markSize = 280; // tall edge of the mark, well inside the 410px safe zone
  const markPng = await sharp(Buffer.from(faviconSvg.replace("@media (prefers-color-scheme:dark){path{fill:#ffffff}}", "")))
    .resize(markSize, markSize)
    .png()
    .toBuffer();
  await sharp({
    create: { width: 512, height: 512, channels: 4, background: chartreuse },
  })
    .composite([{ input: markPng, gravity: "center" }])
    .png()
    .toFile(path.join(PUB, "icon-512-maskable.png"));

  const manifest = {
    name: "Amperity",
    short_name: "Amperity",
    description:
      "The customer context platform. Identity-resolved profiles, live signals, governed access for every team and every AI agent.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: chartreuse,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
  fs.writeFileSync(
    path.join(PUB, "site.webmanifest"),
    JSON.stringify(manifest, null, 2) + "\n",
  );

  console.log("favicon set generated with chartreuse", chartreuse);
}

main();
