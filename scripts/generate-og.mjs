/**
 * Generates the OG images (1200x630) as static PNGs in /public/og/.
 * Black background, low-density node field, inverted wordmark top-left,
 * page title in the display face, chartreuse accents.
 *
 * Templates: home, platform, customer story, pricing.
 * Run: npm run generate:og
 */
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { renderFieldSvg } from "../lib/node-field.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "og");
fs.mkdirSync(OUT, { recursive: true });

const tokens = fs.readFileSync(path.join(ROOT, "styles", "tokens.ts"), "utf8");
const CHARTREUSE = tokens.match(/chartreuse = "([^"]+)"/)[1];
const GRAY_900 = tokens.match(/900: "([^"]+)"/)[1];
const GRAY_400 = tokens.match(/400: "([^"]+)"/)[1];

const W = 1200;
const H = 630;

const fonts = [
  {
    name: "Space Grotesk",
    data: fs.readFileSync(path.join(ROOT, "scripts/fonts/Space-Grotesk-wght-500.ttf")),
    weight: 500,
    style: "normal",
  },
  {
    name: "Space Grotesk",
    data: fs.readFileSync(path.join(ROOT, "scripts/fonts/Space-Grotesk-wght-700.ttf")),
    weight: 700,
    style: "normal",
  },
  {
    name: "JetBrains Mono",
    data: fs.readFileSync(path.join(ROOT, "scripts/fonts/JetBrains-Mono-wght-400.ttf")),
    weight: 400,
    style: "normal",
  },
];

// The white wordmark (official SVG) as a data URI for satori
const wordmarkSvg = fs.readFileSync(
  path.join(ROOT, "public/brand/amperity-logo.svg"),
  "utf8",
);
const wordmarkUri = `data:image/svg+xml;base64,${Buffer.from(wordmarkSvg).toString("base64")}`;

function fieldUri(seed) {
  const svg = renderFieldSvg({
    width: W,
    height: H,
    seed,
    count: 70,
    clusterCount: 2,
    dotColor: "#ffffff",
    accentColor: CHARTREUSE,
    opacity: 0.5,
  });
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function template({ eyebrow, title, seed }) {
  return {
    type: "div",
    props: {
      style: {
        width: W,
        height: H,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: GRAY_900,
        backgroundImage: `url(${fieldUri(seed)})`,
        backgroundSize: `${W}px ${H}px`,
        padding: 64,
        fontFamily: "Space Grotesk",
      },
      children: [
        {
          type: "img",
          props: {
            src: wordmarkUri,
            width: 200,
            height: 50,
            style: { objectFit: "contain" },
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: 24 },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "JetBrains Mono",
                    fontSize: 22,
                    letterSpacing: "0.08em",
                    color: GRAY_400,
                  },
                  children: eyebrow.toUpperCase(),
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 72,
                    fontWeight: 700,
                    lineHeight: 1.02,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    maxWidth: 1000,
                  },
                  children: title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    width: 120,
                    height: 4,
                    backgroundColor: CHARTREUSE,
                    marginTop: 8,
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
}

const templates = [
  {
    file: "home.png",
    eyebrow: "The customer context platform",
    title: "AI is only as good as what it knows about your customer.",
    seed: 11,
  },
  {
    file: "platform.png",
    eyebrow: "Platform",
    title: "Customer data platforms unified your data. We built what comes next.",
    seed: 23,
  },
  {
    file: "customers.png",
    eyebrow: "Customer stories",
    title: "Proof, not promises. Real brands, real numbers.",
    seed: 37,
  },
  {
    file: "pricing.png",
    eyebrow: "Pricing",
    title: "Pay for what you use. Get everything.",
    seed: 53,
  },
  {
    file: "identity.png",
    eyebrow: "Identity Resolution",
    title: "When identity is wrong, everything built on it is wrong.",
    seed: 71,
  },
  {
    file: "ampai.png",
    eyebrow: "AmpAI",
    title: "AI that starts from the truth.",
    seed: 89,
  },
  {
    file: "solutions.png",
    eyebrow: "Solutions",
    title: "Trusted context, shaped to your work.",
    seed: 101,
  },
];

for (const t of templates) {
  const svg = await satori(template(t), { width: W, height: H, fonts });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: W } }).render().asPng();
  fs.writeFileSync(path.join(OUT, t.file), png);
  console.log("og:", t.file);
}
