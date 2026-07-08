# Design log

Written critique cycles per the brief's section 8 rubric:
(a) hierarchy, (b) rhythm, (c) type tension, (d) motion feel, (e) device truth.
Screenshots referenced live in `qa/shots/` (gitignored; regenerate with
`npm run qa:shots` and `node scripts/qa-states.mjs` against a dev server).

## Icon family (cycle 1)

Screenshot: `/dev/icons` at 1440, light and dark grids.

- All 39 icons hold the 24px grid, 1.75px stroke, rounded caps. The filled
  node-dot signature repeats naturally (chart point, shield center, journey
  nodes, filter knobs) and unifies the set.
- On dark, strokes read clean white with no weight distortion.
- Verdict: reads as one family in one cycle. `paidmedia` leans toward a
  volume glyph more than a megaphone; acceptable at current usage sites.
  No blocking changes.

## Product UI moments (cycle 1)

Screenshot: `/dev/product` at 390 and 1440.

- ResolutionView: fragments-to-profile narrative is legible mid-loop; the
  dark Customer 360 card balances the light fragment column. AmpID chip
  lands late in the loop, which reads as confirmation, as intended.
- AmpAIExchange: ask bubble right, grounded answer left-fills; the
  12,482 count anchors the card. Criteria checks read as governance.
- JourneyBuilder: live branch reads instantly via chartreuse dash flow and
  the LIVE pill. The branch eyebrow wraps to two lines inside its card at
  desktop column widths; acceptable, not cramped.
- Mobile compositions verified: fewer fragment rows, vertical journey.
- No blocking changes.

## Homepage hero (cycles 1 and 2)

Cycle 1 (1440): hierarchy correct (eyebrow, display-xl headline, subhead,
CTAs); node field subtle with one resolve cluster near the CTAs; vignette
keeps WCAG contrast. Type tension: display-xl feels oversized-confident,
three manual lines, no orphans. No changes needed at desktop.

Cycle 1 (390): FAIL on device truth. The desktop manual line breaks
double-wrapped into six ragged lines.

Cycle 2 fix: mobile gets its own art direction: `headlineLinesMobile`
(five short lines at the `display` step) rendered md:hidden, desktop keeps
three lines at `display-xl`. Verified: headline, subhead, and primary CTA
land inside the first 100svh at 390 (and at 375 by clamp math).

## Logo marquee (cycles 1 and 2)

Cycle 1: FAIL. M&T Bank invisible (root `fill="none"` inherited by all
paths; their site styles it via CSS). Optical sizes wildly inconsistent
because every train SVG shares a 300x100 canvas with different artwork
coverage. Text chips overweighted vs logos.

Cycle 2 fix: gave mt_bank an inheritable black fill; added per-logo
optical height corrections in content/customers.ts; normalized all marks
to black with `brightness-0` at 60% opacity on the light section; text
chips reduced to display/h4 medium at 70% opacity. Verified: the train
reads as one quiet monochrome band, Brooks text chip blends with fetched
marks. Virgin Atlantic's compact script mark given a larger correction
(88px) in a third pass.

## Manifesto (cycles 1 and 2)

Cycle 1: FAIL. Random headline lines never revealed (each line had its own
viewport observer; fast scroll skipped some, leaving masked lines
invisible). Beat numbers misaligned as a result.

Cycle 2 fix: rewrote Reveal so one container observer drives staggered
child variants; lines can no longer be skipped individually. Verified all
three beats complete: 01 and 02 in gray-300, the answer beat in white.
Grain texture present but near-invisible at 4.5% opacity, as intended.

## How it works, sticky chapters (cycles 1 to 3)

Cycle 1: layout correct at 1440 (left copy, right product visual, counter
stat with drawn underline). Mobile stack verified with per-chapter
progress rule and correct mobile product compositions.

Cycle 2: FAIL on motion feel. Empirical probing (computed opacities at
scroll depths) showed chapter 01 ghosting back in late in the scroll:
framer's array-breakpoint interpolation produced a phantom mapping beyond
the window end. Rewrote the chapter window as an explicit function-form
transform (min of fade-in/fade-out ramps, clamped by construction).
Re-probed: exactly one chapter visible per window, clean seams at 1/3 and
2/3, fully reversible by scrubbing.

Cycle 3: reduced-motion audit found a hydration mismatch (framer's
sync useReducedMotion vs SSR) and a dead useScroll target when the pinned
tree early-returned. Fixed by making the reduced-motion hook effect-based
and always rendering the scroll container. Both motion modes now load
with zero console errors.

## Proof rows (cycle 1)

- Giant tabular counters with chartreuse draw-in underlines; alternating
  stat/narrative sides; whole-row link with quiet hover. Hierarchy: the
  numbers win, as designed. All four stats verified against the Proof
  Library. No changes.

## Stack, Teams, Ticker, Closing (cycle 1)

- Stack: dark section, chartreuse icons only accent, mono titles,
  integration chips marquee reversed for texture. No changes.
- Teams: three equal-height cards, CTAs bottom-aligned via flex column
  with mt-auto. No changes.
- Ticker: editorial line at h2 with chartreuse node separator. No changes.
- Closing: full-viewport dark bookend reusing the node field at lower
  density; single centered CTA. No changes.

## Footer (cycle 1)

- Four sitemap columns, newsletter with blur-time validation, giant
  ampersand cropped at the bottom edge at 10% opacity. Mobile stacks
  cleanly. No changes.

## Run-1 gate findings (cycle: full-page and Lighthouse)

- Full-page rhythm verified at 390/430/768/1024/1440: dark hero, light
  train, dark manifesto, light chapters, light proof, dark stack, light
  teams, ticker, dark closing, footer. Section scale varies as chapters,
  not as uniform bands.
- Production-only defect found by Lighthouse: next/image's optimizer
  400s SVG sources, silently breaking every logo in prod (dev serves
  them). Fixed with images.unoptimized (all site images are brand SVGs
  or pre-sized PNGs).
- LCP: the hydration-gated hero reveal cost seconds on throttled mobile.
  Moved the hero entrance to pure CSS (same masked stagger, starts at
  first paint). Desktop LCP 0.6s, CLS 0 everywhere.
- Contrast: gray-500 on gray-900 measures 3.5:1, below AA. All
  dark-surface gray-500 text lifted to gray-400; the product-art idle
  loops now dim via color-token swaps instead of opacity, so every
  frame of the animation is AA-compliant.
- Device matrix (375/390/430/768/1024/1440/1920): zero horizontal
  overflow; hero headline, subhead, and primary CTA inside the first
  100svh at 375 after tightening mobile-only rhythm; no sub-44px touch
  targets on touch layouts (footer links given the 44px floor; the
  8px spacing scale gained a documented 44px accessibility constant).
- 4x CPU throttle: 61fps page loop (canvas internally capped at 30).
- Final Lighthouse (production): desktop 100/100/96/100, mobile
  95/100/96/100. The best-practices deduction on both is console 404s
  from prefetching Run-2 routes that do not exist yet.

## Header states (cycle 1)

- Transparent over the dark hero with the official white wordmark;
  solid white with the black wordmark on scroll and while surfaces are
  open. Mega menu: mono column labels, note lines, chartreuse active
  underline. Mobile sheet: full-screen, staggered reveal, accordion
  columns, body scroll locked, focus trapped, Escape and swipe-down
  close. No changes beyond the global hydration fix.
