# amperity.com, rebuilt for the AI era

A ground-up rebuild of amperity.com: the trusted customer context layer
that makes AI safe to act. Tenex-class editorial design and motion,
Amperity brand truth, every stat from a verified proof library.

## Stack

- Next.js 15 (App Router), TypeScript strict, static generation
- Tailwind CSS 3.4, themed entirely from `styles/tokens.ts`
- framer-motion for scroll-driven motion; the hero entrance is pure CSS
- Self-hosted latin-subset variable fonts (Space Grotesk, Inter,
  JetBrains Mono) via `next/font/local`, zero CLS
- Deployable to Vercel as-is (`npm run build` is clean)

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, all routes static
```

QA tooling (dev server or prod server running):

```bash
npm run qa:copy    # em dashes, banned phrases, stats vs proof library,
                   # arbitrary Tailwind values, raw hex, imagery rules
npm run qa:shots   # Playwright screenshots (see scripts/screenshot.mjs)
node scripts/qa-states.mjs   # menus, sticky chapters, reduced motion
npm run generate:icons       # favicon set from the brand mark
npm run generate:og          # OG images from the node-field system
```

## Where things live

- `content/` is the single source of copy: `home.ts`, `customers.ts`,
  `nav.ts`, and `stats.ts` (the Verified Proof Library; every stat on
  the site must exist there). Copy edits never touch components.
- `styles/tokens.ts` locks the taste layer: type scale, 8px spacing,
  two radii, one shadow recipe, three easings, three durations, the
  sampled chartreuse, and the OKLCH gray ramp. No raw hex or arbitrary
  Tailwind values exist outside it (enforced by `npm run qa:copy`).
- `components/motion/` holds the motion primitives (reveal, marquee,
  counter, sticky chapter, magnetic, node field, drawn accents), each
  with a reduced-motion fallback and the mobile motion budget.
- `components/icons/` is the original 24px-grid icon family (QA page at
  `/dev/icons`); `components/product/` holds the three coded product
  moments (QA page at `/dev/product`).
- `lib/node-field.mjs` is the seeded geometry engine behind the hero
  canvas, story art, and OG images.
- `design-log.md` records every written critique cycle.

## Brand assets: provided vs fetched vs generated

- Provided in the brief: the Amperity wordmark and the chartreuse icon.
  Equivalent official files were fetched in-session: the icon
  (`public/brand/amperity_icon.png`, 700px, from docs.amperity.com) and
  the wordmark vector (`public/brand/amperity-logo.svg`, official white
  variant with chartreuse node, from the Internet Archive copy of
  amperity.com). The black variant and `amperity_logo.png` (2251px) are
  derived from that official vector.
- `public/brand/ampersand.svg` is the mark's exact official geometry,
  extracted from the wordmark vector and overlay-verified against the
  icon PNG at 512px (differences confined to antialiased edges).
- The chartreuse token (#DFF200) was sampled programmatically from the
  icon PNG (dominant flat fill), never eyeballed.
- Customer logos in `public/logos/` were fetched from amperity.com's own
  logo train via the Internet Archive (amperity.com rate-limited direct
  fetches). Everything else visual on the site is generated in-repo:
  node fields, diagrams, icons, favicons, OG images.

## TODO

- [ ] Logo train: Brooks Running, Citizen, New Look, and BECU SVGs were
      not in the archived logo train; they render as text wordmark
      chips per the brief's fallback. Swap in official SVGs when
      amperity.com/storybook is reachable.
- [ ] Integration logos (Databricks, Snowflake, etc.) render as mono
      text chips in the dark architecture section; fetch official marks
      if a licensed source becomes available. Never hand-draw them.
- [ ] Verify exact wording of the BECU (Daniel Tabor) and Brooks
      (Mark McKelvey) pull quotes against archived source pages before
      rendering them inside quotation marks (see content/stats.ts).
- [ ] Run 2: all remaining routes (platform pages, pricing, solutions,
      industries, customers, integrations, resources, company,
      conversion). Nav links to those routes 404 until then, which is
      also the only remaining Lighthouse best-practices deduction
      (prefetch 404s in the console).
- [ ] Lighthouse (production, this container): desktop 100 perf / 100
      a11y / 96 bp / 100 seo, LCP 0.6s, CLS 0; mobile 95 perf (throttled
      LCP 2.9s) / 100 / 96 / 100. Re-verify on Vercel hardware after
      deploy; bp reaches 100 once Run-2 routes exist.
