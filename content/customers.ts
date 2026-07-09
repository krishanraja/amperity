import type { StatId } from "./stats";

export type CustomerLogo = {
  name: string;
  /** SVG under /logos, or null to render a text wordmark chip. */
  src: string | null;
  /**
   * Render height in px. All train SVGs share a 300x100 canvas but the
   * artwork fills different fractions of it, so each gets an optical
   * correction.
   */
  h?: number;
};

/**
 * Homepage logo marquee. SVGs were fetched from amperity.com's own
 * logo train (via the Internet Archive). Brands without a fetched SVG
 * render as text chips; never hand-draw a third-party trademark.
 */
export const logoTrain: CustomerLogo[] = [
  { name: "Alaska Airlines", src: "/logos/alaska.svg", h: 48 },
  { name: "Seattle Seahawks", src: "/logos/seahawks.svg", h: 48 },
  { name: "Wyndham Hotels & Resorts", src: "/logos/wyndham.svg", h: 64 },
  { name: "M&T Bank", src: "/logos/mt_bank.svg", h: 48 },
  { name: "Brooks", src: null },
  { name: "Vail Resorts", src: "/logos/vail.svg", h: 60 },
  { name: "Virgin Atlantic", src: "/logos/virgin_atlantic.svg", h: 88 },
  { name: "Citizen", src: null },
  { name: "New Look", src: null },
  { name: "BECU", src: null },
  { name: "First Hawaiian Bank", src: "/logos/fhb.svg", h: 56 },
  { name: "Servco", src: "/logos/servco.svg", h: 40 },
];

export type ProofRow = {
  slug: string;
  customer: string;
  statId: StatId;
  narrative: string;
};

export type CustomerStory = {
  slug: string;
  name: string;
  industry: string;
  /** Filter facet for the index grid. */
  category: string;
  /** One-line teaser for the index card. */
  teaser: string;
  /** Full story pages: real content. Stubs omit these blocks. */
  full?: {
    headlineLines: string[];
    challenge: string[];
    statIds: StatId[];
    quote?: { text: string; name: string; role: string };
    products: { label: string; href: string }[];
  };
};

/**
 * Customer stories. Alaska, Wyndham, New Look, Seahawks, and Virgin
 * Atlantic are full; the rest are stubbed from index descriptions and
 * render a shorter template until their proof is verified.
 */
export const customerStories: CustomerStory[] = [
  {
    slug: "alaska-airlines",
    name: "Alaska Airlines",
    industry: "Airlines",
    category: "Travel",
    teaser: "A 198% loyalty conversion lift, and the identity foundation behind a merger.",
    full: {
      headlineLines: ["The identity foundation", "behind a merger."],
      challenge: [
        "Alaska Airlines carried six million loyalty members across two databases, with 169,000 dual accounts that no rules-based system could reconcile.",
        "A merger with Hawaiian Airlines raised the stakes: two loyalty programs had to become one accurate view, without losing a single relationship.",
      ],
      statIds: ["alaskaLoyaltyLift", "alaskaMembersMerged", "alaskaDualAccounts", "alaskaAccuracy"],
      products: [
        { label: "Identity Resolution", href: "/platform/identity-resolution" },
        { label: "Customer 360", href: "/platform/amp360" },
      ],
    },
  },
  {
    slug: "wyndham",
    name: "Wyndham Hotels & Resorts",
    industry: "Hotels",
    category: "Hotels",
    teaser: "Unified guest profiles drove a 60% conversion rate increase.",
    full: {
      headlineLines: ["Anonymous bookers,", "made known."],
      challenge: [
        "Wyndham's guests were scattered across property, reservation, and loyalty systems, so a returning guest often looked like a stranger.",
        "Unifying those records into one guest profile turned anonymous bookers into known, reachable guests the brand could serve directly.",
      ],
      statIds: ["wyndhamConversion"],
      products: [
        { label: "Identity Resolution", href: "/platform/identity-resolution" },
        { label: "Journey Orchestration", href: "/platform/customer-context-platform" },
      ],
    },
  },
  {
    slug: "new-look",
    name: "New Look",
    industry: "Retail",
    category: "Retail",
    teaser: "3.4 million profiles resolved, and 24% more high-value customers found.",
    full: {
      headlineLines: ["The high-value customers", "hiding in plain sight."],
      challenge: [
        "New Look's customers were fragmented across online and in-store systems, so total spend per customer was invisible.",
        "Resolving 3.4 million profiles revealed which customers shopped both channels, and surfaced the high-value people the brand had been missing.",
      ],
      statIds: ["newLookProfiles", "newLookHighValue", "newLookOmnichannel"],
      products: [
        { label: "Identity Resolution", href: "/platform/identity-resolution" },
        { label: "Customer 360", href: "/platform/amp360" },
      ],
    },
  },
  {
    slug: "seattle-seahawks",
    name: "Seattle Seahawks",
    industry: "Sports & Entertainment",
    category: "Sports",
    teaser: "5,000 hidden high-value fans discovered, and a 61.5% cleaner database.",
    full: {
      headlineLines: ["The fans hiding", "in the data."],
      challenge: [
        "The Seahawks' fan records were spread across ticketing, concessions, and merchandise, duplicated and conflicting.",
        "Resolving them produced a measurably cleaner database and surfaced thousands of high-value fans the team had never properly seen.",
      ],
      statIds: ["seahawksFans", "seahawksCleaner"],
      products: [
        { label: "Identity Resolution", href: "/platform/identity-resolution" },
        { label: "Predictive Insights", href: "/platform/customer-context-platform" },
      ],
    },
  },
  {
    slug: "virgin-atlantic",
    name: "Virgin Atlantic",
    industry: "Airlines",
    category: "Travel",
    teaser: "Live, resolved profiles shared to Databricks with zero copies.",
    full: {
      headlineLines: ["Live profiles,", "zero copies."],
      challenge: [
        "Virgin Atlantic wanted resolved customer profiles in its Databricks lakehouse without standing up another brittle export pipeline.",
        "Amperity Bridge shares live, resolved profiles directly, so the lakehouse reads the same truth the rest of the business acts on, with no copies to drift.",
      ],
      statIds: [],
      products: [
        { label: "Amperity Bridge", href: "/platform/customer-context-platform" },
        { label: "Lakehouse Native", href: "/platform/customer-context-platform" },
      ],
    },
  },
  {
    slug: "becu",
    name: "BECU",
    industry: "Financial Services",
    category: "Financial Services",
    teaser: "Dashboards that refresh themselves, saving IT 20+ hours a week.",
    full: {
      headlineLines: ["Reporting that", "runs itself."],
      challenge: [
        "BECU's team spent hours every week rebuilding reports by hand from data scattered across systems.",
        "A resolved foundation let dashboards refresh automatically every day, giving the team back more than 20 hours a week.",
      ],
      statIds: ["becuHoursSaved"],
      quote: {
        text: "Our dashboards refresh automatically every day. That saves IT more than 20 hours every week.",
        name: "Daniel Tabor",
        role: "BECU",
      },
      products: [
        { label: "Customer 360", href: "/platform/amp360" },
        { label: "Data Foundation", href: "/platform/customer-context-platform" },
      ],
    },
  },
  {
    slug: "brooks",
    name: "Brooks Running",
    industry: "Retail",
    category: "Retail",
    teaser: "A 10-week proof of concept that outran the prior provider's whole engagement.",
    full: {
      headlineLines: ["Live in weeks,", "not quarters."],
      challenge: [
        "Brooks had spent a full engagement with a prior provider without reaching the foundation it needed.",
        "In a 10-week proof of concept, Amperity accomplished more, and Brooks was live within 90 days.",
      ],
      statIds: ["brooksPoc", "brooksLive"],
      quote: {
        text: "In a 10-week proof of concept, Amperity accomplished more than our previous provider did in their entire engagement. We were live within 90 days.",
        name: "Mark McKelvey",
        role: "Brooks Running",
      },
      products: [
        { label: "Services", href: "/platform/services" },
        { label: "Identity Resolution", href: "/platform/identity-resolution" },
      ],
    },
  },
  {
    slug: "citizen",
    name: "Citizen Watch",
    industry: "Retail",
    category: "Retail",
    teaser: "One customer view across wholesale, retail, and ecommerce.",
  },
  {
    slug: "first-hawaiian-bank",
    name: "First Hawaiian Bank",
    industry: "Financial Services",
    category: "Financial Services",
    teaser: "A resolved member view across core banking and digital.",
  },
  {
    slug: "servco",
    name: "Servco",
    industry: "Automotive & Retail",
    category: "Retail",
    teaser: "Unified customer profiles across a diversified portfolio.",
  },
  {
    slug: "catalyst-brands",
    name: "Catalyst Brands",
    industry: "Retail",
    category: "Retail",
    teaser: "One resolved customer across a multi-brand portfolio.",
  },
  {
    slug: "footwear-brand",
    name: "A global footwear brand",
    industry: "Retail",
    category: "Retail",
    teaser: "Resolved omnichannel profiles behind a personalization program.",
  },
  {
    slug: "luxury-retailer",
    name: "A luxury retailer",
    industry: "Retail",
    category: "Retail",
    teaser: "A single view of the highest-value clients across boutiques and online.",
  },
];

export const featuredStorySlug = "seattle-seahawks";

/** Homepage proof section: alternating story rows. */
export const proofRows: ProofRow[] = [
  {
    slug: "alaska-airlines",
    customer: "Alaska Airlines",
    statId: "alaskaLoyaltyLift",
    narrative:
      "Six million loyalty members from two airlines, merged into one program without losing a relationship.",
  },
  {
    slug: "wyndham",
    customer: "Wyndham Hotels & Resorts",
    statId: "wyndhamConversion",
    narrative:
      "Unified guest profiles turned anonymous bookers into known, reachable guests.",
  },
  {
    slug: "new-look",
    customer: "New Look",
    statId: "newLookHighValue",
    narrative:
      "Resolving 3.4 million fragmented profiles revealed high-value customers hiding in plain sight.",
  },
  {
    slug: "seattle-seahawks",
    customer: "Seattle Seahawks",
    statId: "seahawksFans",
    narrative:
      "A 61.5% cleaner database surfaced thousands of fans the team had never properly seen.",
  },
];
