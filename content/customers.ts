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
