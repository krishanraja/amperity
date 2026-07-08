/**
 * The Verified Proof Library. Every stat on the site comes from here.
 * If a section wants a stat and this library has none, the section
 * ships without one. No invented numbers, no rounding up.
 */

export type Stat = {
  id: string;
  customer: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
};

export const stats = {
  alaskaLoyaltyLift: {
    id: "alaskaLoyaltyLift",
    customer: "Alaska Airlines",
    value: 198,
    suffix: "%",
    label: "loyalty conversion lift",
    context: "Loyalty conversion lift after unifying guest identity.",
  },
  alaskaMembersMerged: {
    id: "alaskaMembersMerged",
    customer: "Alaska Airlines",
    value: 6,
    suffix: "M",
    label: "loyalty members merged",
    context: "Six million loyalty members merged from two databases after acquisition.",
  },
  alaskaDualAccounts: {
    id: "alaskaDualAccounts",
    customer: "Alaska Airlines",
    value: 169000,
    label: "dual loyalty accounts resolved",
    context: "Dual loyalty accounts identified and resolved across programs.",
  },
  alaskaAccuracy: {
    id: "alaskaAccuracy",
    customer: "Alaska Airlines",
    value: 2.3,
    decimals: 1,
    suffix: "x",
    label: "more accurate identity foundation",
    context:
      "Amperity's identity foundation proved 2.3x more accurate than a leading consulting firm's.",
  },
  wyndhamConversion: {
    id: "wyndhamConversion",
    customer: "Wyndham Hotels & Resorts",
    value: 60,
    suffix: "%",
    label: "conversion rate increase",
    context: "Conversion rate increase from unified guest profiles.",
  },
  newLookProfiles: {
    id: "newLookProfiles",
    customer: "New Look",
    value: 3.4,
    decimals: 1,
    suffix: "M",
    label: "fragmented profiles resolved",
    context: "3.4 million fragmented customer profiles resolved.",
  },
  newLookHighValue: {
    id: "newLookHighValue",
    customer: "New Look",
    value: 24,
    suffix: "%",
    label: "more high-value customers identified",
    context: "More high-value customers identified after resolution.",
  },
  newLookOmnichannel: {
    id: "newLookOmnichannel",
    customer: "New Look",
    value: 71,
    suffix: "%",
    label: "of top customers shop both channels",
    context: "Of top customers shop both online and in-store.",
  },
  seahawksFans: {
    id: "seahawksFans",
    customer: "Seattle Seahawks",
    value: 5000,
    label: "hidden high-value fans discovered",
    context: "High-value fans discovered hiding in duplicate records.",
  },
  seahawksCleaner: {
    id: "seahawksCleaner",
    customer: "Seattle Seahawks",
    value: 61.5,
    decimals: 1,
    suffix: "%",
    label: "cleaner database",
    context: "Cleaner database after identity resolution.",
  },
  becuHoursSaved: {
    id: "becuHoursSaved",
    customer: "BECU",
    value: 20,
    suffix: "+",
    label: "IT hours saved weekly",
    context: "Dashboards refresh automatically every day, saving IT 20+ hours a week.",
  },
  brooksPoc: {
    id: "brooksPoc",
    customer: "Brooks Running",
    value: 10,
    label: "week proof of concept",
    context:
      "A 10-week proof of concept accomplished more than the previous provider's entire engagement.",
  },
  brooksLive: {
    id: "brooksLive",
    customer: "Brooks Running",
    value: 90,
    label: "days to live",
    context: "Live within 90 days.",
  },
  pepkorRoas: {
    id: "pepkorRoas",
    customer: "Pepkor",
    value: 37,
    suffix: "x",
    label: "ROAS from right-time personalization",
    context: "Resources section only.",
  },
  brands: {
    id: "brands",
    customer: "Amperity",
    value: 400,
    suffix: "+",
    label: "enterprise brands",
    context: "Enterprise brands run on Amperity.",
  },
  integrations: {
    id: "integrations",
    customer: "Amperity",
    value: 400,
    suffix: "+",
    label: "pre-built integrations",
    context: "Pre-built connectors across the stack.",
  },
  profileTimeSaved: {
    id: "profileTimeSaved",
    customer: "Amperity",
    value: 90,
    suffix: "%",
    label: "less time building and maintaining profiles",
    context: "Technologists save 90% of profile build-and-maintain time.",
  },
} as const satisfies Record<string, Stat>;

export type StatId = keyof typeof stats;

/** Widened accessor so optional fields (decimals, suffix) type-check. */
export function getStat(id: StatId): Stat {
  return stats[id];
}

/**
 * TODO: verify exact pull-quote wording against the archived source
 * pages before rendering these as direct quotes anywhere. Until
 * verified, render as attributed summaries, not quotation marks.
 */
export const quotes = {
  becu: {
    text: "Our dashboards refresh automatically every day. That saves IT more than 20 hours every week.",
    name: "Daniel Tabor",
    role: "BECU",
  },
  brooks: {
    text: "In a 10-week proof of concept, Amperity accomplished more than our previous provider did in their entire engagement. We were live within 90 days.",
    name: "Mark McKelvey",
    role: "Brooks Running",
  },
} as const;
