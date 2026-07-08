/**
 * Programmatic copy, token, and imagery QA. Zero hits required.
 *
 * Checks:
 * 1. Em dashes (U+2014) and en dashes used as dashes (U+2013) anywhere.
 * 2. Banned AI-tell phrases.
 * 3. Stats: any digits followed by % or x in content/components must
 *    exist in the Proof Library (content/stats.ts).
 * 4. Tailwind arbitrary values (bracket syntax) in components/app.
 * 5. Raw hex colors outside styles/tokens.ts (and fetched SVG assets).
 * 6. Forbidden imagery sources and icon libraries.
 * 7. <img>/Image src outside /brand/ and /logos/.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
let failures = 0;

function* walk(dir, exts) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git" || entry.name === "qa")
      continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p, exts);
    else if (exts.some((e) => entry.name.endsWith(e))) yield p;
  }
}

function fail(file, line, msg) {
  console.error(`FAIL ${path.relative(ROOT, file)}:${line} ${msg}`);
  failures++;
}

const sourceFiles = [...walk(ROOT, [".ts", ".tsx", ".mjs", ".css", ".md", ".json"])].filter(
  (f) => !f.endsWith("package-lock.json"),
);

/* 1. Dashes (this detector file is exempt: it must name its targets) */
const EM = String.fromCharCode(0x2014);
const EN = String.fromCharCode(0x2013);
for (const f of sourceFiles) {
  if (f.endsWith("qa-copy.mjs")) continue;
  const lines = fs.readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => {
    if (l.includes(EM)) fail(f, i + 1, "em dash");
    if (new RegExp(`\\d${EN}\\d`).test(l) || l.includes(` ${EN} `)) fail(f, i + 1, "en dash used as dash");
  });
}

/* 2. Banned phrases (copy surfaces only) */
const banned = [
  /it'?s not just \w+[,;] it'?s/i,
  /in today'?s fast-paced world/i,
  /unlock the power of/i,
  /supercharge/i,
  /game-chang/i,
  /revolutioniz/i,
  /\bdelve\b/i,
];
for (const f of sourceFiles) {
  if (!/\.(ts|tsx|md)$/.test(f)) continue;
  const lines = fs.readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => {
    for (const re of banned) if (re.test(l)) fail(f, i + 1, `banned phrase ${re}`);
  });
  const text = fs.readFileSync(f, "utf8");
  const seamless = (text.match(/seamless/gi) || []).length;
  if (seamless > 1) fail(f, 0, `"seamless" appears ${seamless} times (max 1 per page)`);
}

/* 3. Stats against the Proof Library */
const statsSrc = fs.readFileSync(path.join(ROOT, "content/stats.ts"), "utf8");
const libraryValues = new Set(
  [...statsSrc.matchAll(/value: ([\d.]+)/g)].map((m) => m[1]),
);
// Values that appear inside the stats file with suffixes
const allowedStatStrings = new Set();
for (const v of libraryValues) {
  for (const suffix of ["%", "x", "M", "+"]) allowedStatStrings.add(`${v}${suffix}`);
}
// Generic placeholders allowed inside the product UI moments (brief
// 3.6.6): the journey trigger threshold is illustrative, not a claim.
const placeholderAllow = new Set(["70%"]);
const statRe = /(\d+(?:\.\d+)?)(%|x)(?![a-zA-Z0-9-])/g;
function checkStatLine(f, i, text) {
  for (const m of text.matchAll(statRe)) {
    const token = `${m[1]}${m[2]}`;
    if (placeholderAllow.has(token)) continue;
    if (!libraryValues.has(m[1])) fail(f, i, `stat "${token}" not in Proof Library`);
  }
}
for (const f of sourceFiles) {
  // All page copy lives in /content; scan it exhaustively.
  if (/content\//.test(f) && !f.includes("content/stats.ts")) {
    const lines = fs.readFileSync(f, "utf8").split("\n");
    lines.forEach((l, i) => checkStatLine(f, i + 1, l));
  }
  // In components and app, scan JSX text nodes and copy-bearing string
  // props (label/title/eyebrow), not CSS offsets or animation values.
  if (/components\/|app\//.test(f) && /\.tsx$/.test(f)) {
    const lines = fs.readFileSync(f, "utf8").split("\n");
    lines.forEach((l, i) => {
      for (const m of l.matchAll(/>([^<>{}]+)</g)) checkStatLine(f, i + 1, m[1]);
      for (const m of l.matchAll(/(?:label|title|eyebrow|name|detail|value)=["']([^"']+)["']/g))
        checkStatLine(f, i + 1, m[1]);
    });
  }
}

/* 4. Tailwind arbitrary values */
for (const f of sourceFiles) {
  if (!/\.(tsx|ts)$/.test(f)) continue;
  if (!/components\/|app\//.test(f)) continue;
  const lines = fs.readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => {
    const m = l.match(/(?:className|class)=["'`][^"'`]*\[(?!\.\.\.)[^\]]*\]/);
    if (m) fail(f, i + 1, `arbitrary Tailwind value: ${m[0].slice(0, 60)}`);
  });
}

/* 5. Raw hex outside tokens */
for (const f of sourceFiles) {
  if (!/\.(tsx|ts)$/.test(f)) continue;
  if (f.endsWith("styles/tokens.ts")) continue;
  const lines = fs.readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => {
    if (/#[0-9a-fA-F]{3,8}\b/.test(l) && !l.includes("//")) {
      fail(f, i + 1, `raw hex color: ${l.trim().slice(0, 60)}`);
    }
  });
}

/* 6. Forbidden imagery and icon libraries */
const forbidden = /unsplash|pexels|lucide|heroicons|fontawesome|font-awesome/i;
for (const f of sourceFiles) {
  const lines = fs.readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => {
    if (forbidden.test(l) && !f.endsWith("qa-copy.mjs")) fail(f, i + 1, "forbidden imagery source");
  });
}

/* 7. img/Image src whitelist */
for (const f of sourceFiles) {
  if (!/\.tsx$/.test(f)) continue;
  const lines = fs.readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => {
    const m = l.match(/src=["'{]+\s*["']?(\/[^"'}]+\.(png|jpg|jpeg|svg|webp))/);
    if (m && !m[1].startsWith("/brand/") && !m[1].startsWith("/logos/")) {
      fail(f, i + 1, `img src outside /brand and /logos: ${m[1]}`);
    }
  });
}

if (failures) {
  console.error(`\n${failures} QA failure(s).`);
  process.exit(1);
}
console.log("qa-copy: clean");
