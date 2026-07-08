/**
 * Design tokens: the single source of truth for every visual micro-decision.
 *
 * Rules enforced in QA:
 * - No raw hex values anywhere outside this file.
 * - No arbitrary Tailwind values (bracket syntax) in components.
 * - Every animation uses the easing and duration tokens below.
 */

/* ------------------------------------------------------------------ */
/* Color                                                               */
/* ------------------------------------------------------------------ */

/**
 * The signal color. Sampled programmatically from the official
 * amperity_icon.png (dominant flat fill, 270,305 pixels of exactly this
 * value). One signal color for the whole site: CTAs, active states, stat
 * highlights, node accents. Never a background wash.
 */
export const chartreuse = "#DFF200";

export const black = "#000000";
export const white = "#ffffff";

/**
 * OKLCH gray ramp, 10 stops generated from a single hue (230, low chroma)
 * so grays never clash between sections. Values precomputed with the
 * reference OKLab math in scripts (see git history); the oklch() source
 * coordinates are kept alongside each stop.
 * Dark sections use gray-900 as base, never pure black. Pure black is
 * reserved for the wordmark and logo contexts.
 */
export const gray = {
  50: "#f9fafb", // oklch(0.985 0.002 230)
  100: "#f2f4f6", // oklch(0.967 0.003 230)
  200: "#e2e5e7", // oklch(0.92 0.004 230)
  300: "#d1d5d7", // oklch(0.87 0.005 230)
  400: "#9ea2a4", // oklch(0.71 0.006 230)
  500: "#717577", // oklch(0.56 0.006 230)
  600: "#525658", // oklch(0.45 0.006 230)
  700: "#3d4042", // oklch(0.37 0.006 230)
  800: "#242728", // oklch(0.27 0.005 230)
  900: "#16191a", // oklch(0.21 0.005 230)
} as const;

export const colors = {
  black,
  white,
  chartreuse,
  gray,
} as const;

/* ------------------------------------------------------------------ */
/* Type scale: locked 1.25 ratio from a 1.125rem base                  */
/* ------------------------------------------------------------------ */

type FontSizeEntry = [
  string,
  { lineHeight: string; letterSpacing?: string },
];

/**
 * Named steps only. Tracking tightens as size grows: 0 at body,
 * -0.015em at h2, -0.03em at display, -0.045em at display-xl.
 * Leading: 1.6 body, 1.15 headings, 1.0 display.
 */
export const fontSize: Record<string, FontSizeEntry> = {
  eyebrow: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
  "body-sm": ["0.9rem", { lineHeight: "1.6", letterSpacing: "0" }],
  body: ["1.125rem", { lineHeight: "1.6", letterSpacing: "0" }],
  lead: ["1.406rem", { lineHeight: "1.5", letterSpacing: "0" }],
  h4: ["1.758rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
  h3: ["2.197rem", { lineHeight: "1.15", letterSpacing: "-0.0125em" }],
  h2: ["2.747rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
  h1: ["3.433rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
  display: ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
  "display-xl": ["clamp(3.5rem, 8.5vw, 8rem)", { lineHeight: "1.0", letterSpacing: "-0.045em" }],
};

/* ------------------------------------------------------------------ */
/* Spacing: 8px scale only                                             */
/* ------------------------------------------------------------------ */

/**
 * Tailwind's default numbering kept, but every off-8px step removed, so
 * p-3 (12px) simply does not exist. Named section steps carry the
 * vertical rhythm; the -m variants are the mobile values.
 */
export const spacing = {
  px: "1px",
  0: "0px",
  2: "0.5rem", // 8px
  4: "1rem", // 16px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px: the touch-target floor, an accessibility constant, not a rhythm step
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  "section-sm": "4rem", // 64px desktop
  section: "7.5rem", // 120px desktop
  "section-lg": "11rem", // 176px desktop
  "section-sm-m": "2.5rem", // 40px mobile
  "section-m": "4rem", // 64px mobile
  "section-lg-m": "6rem", // 96px mobile
  gutter: "1.5rem", // 24px mobile gutters
  "gutter-lg": "3rem", // 48px desktop gutters
} as const;

/* ------------------------------------------------------------------ */
/* Radius: exactly two                                                 */
/* ------------------------------------------------------------------ */

export const borderRadius = {
  none: "0px",
  card: "12px",
  pill: "999px",
} as const;

/* ------------------------------------------------------------------ */
/* Shadow: one recipe, one elevated variant                            */
/* ------------------------------------------------------------------ */

export const boxShadow = {
  none: "none",
  card: "0 1px 2px rgb(0 0 0 / 0.06), 0 8px 24px rgb(0 0 0 / 0.08)",
  lift: "0 2px 4px rgb(0 0 0 / 0.07), 0 16px 40px rgb(0 0 0 / 0.12)",
} as const;

/* ------------------------------------------------------------------ */
/* Motion: three easings, three durations                              */
/* ------------------------------------------------------------------ */

export const easing = {
  /** Entrances and reveals */
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** Layout moves, accordions, menu sheets */
  inOutQuart: "cubic-bezier(0.76, 0, 0.24, 1)",
  /** Micro-states: hovers, presses */
  outQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
} as const;

/** Cubic bezier tuples for framer-motion (same curves as `easing`). */
export const easingArray = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuart: [0.76, 0, 0.24, 1] as const,
  outQuad: [0.25, 0.46, 0.45, 0.94] as const,
};

export const duration = {
  /** Micro-states, ms */
  micro: 150,
  /** UI transitions, ms */
  ui: 300,
  /** Reveals, ms */
  reveal: 700,
  /** Reveals on mobile, ms (motion budget) */
  revealMobile: 500,
} as const;

export const transitionTimingFunction = {
  "out-expo": easing.outExpo,
  "in-out-quart": easing.inOutQuart,
  "out-quad": easing.outQuad,
} as const;

export const transitionDuration = {
  micro: `${duration.micro}ms`,
  ui: `${duration.ui}ms`,
  reveal: `${duration.reveal}ms`,
} as const;

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export const maxWidth = {
  /** Content max width; node fields and full-bleed sections extend past it */
  site: "90rem", // 1440px
  /** Body copy measure */
  measure: "65ch",
} as const;

export const screens = {
  sm: "430px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
  "2xl": "1920px",
} as const;
