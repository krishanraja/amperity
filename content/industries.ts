import type { StatId } from "./stats";
import type { FaqItem } from "./faq";
import { hotelsFaq, airlinesFaq } from "./faq";

/**
 * Industry pages. One template, seven data instances. Each speaks the
 * industry's own vocabulary for the three fragmented systems, features a
 * named customer, and assigns proof from the library.
 */

export type IndustryData = {
  slug: string;
  eyebrow: string;
  headlineLines: string[];
  subhead: string;
  featuredCustomer: string;
  featuredStatId: StatId;
  /** The three fragmented systems in this industry's own words. */
  systems: { abbr: string; name: string; note: string }[];
  useCases: { title: string; body: string }[];
  storySlug: string;
  faq: FaqItem[];
  metaTitle: string;
  metaDescription: string;
};

const retailFaq: FaqItem[] = [
  {
    q: "How do you unify online and in-store customers?",
    a: "Resolution links POS, ecommerce, and loyalty records into one profile, so a customer who buys in both places is recognized as one person, not two.",
  },
  {
    q: "How do you find high-value customers we are missing?",
    a: "When duplicates are resolved, total spend per customer becomes visible, which is how brands surface high-value customers that were hiding across systems.",
  },
];

const fsFaq: FaqItem[] = [
  {
    q: "How does resolution work across core banking systems?",
    a: "Amperity resolves records across core banking, digital, and servicing systems into one member view, so every channel recognizes the same person.",
  },
  {
    q: "How do you keep this governed and auditable?",
    a: "Every merge is explainable and reversible, and field-level governance controls who sees what, which matters in a regulated environment.",
  },
];

const restaurantsFaq: FaqItem[] = [
  {
    q: "How do you unify guests across ordering channels?",
    a: "Resolution links POS, app, and loyalty records, so a guest who orders in-store, in-app, and through delivery is one recognized profile.",
  },
  {
    q: "Can you personalize without a stale export?",
    a: "Real-time profiles serve the current guest to your channels the moment they order, not who they were on last week's export.",
  },
];

const sportsFaq: FaqItem[] = [
  {
    q: "How do you find high-value fans we cannot see?",
    a: "Resolving ticketing, concessions, and merchandise records reveals total value per fan, which is how teams surface high-value fans hidden in duplicate records.",
  },
  {
    q: "How clean does our database actually get?",
    a: "Resolution removes duplicate and conflicting records, producing a measurably cleaner database that every downstream effort can trust.",
  },
];

export const industries: Record<string, IndustryData> = {
  retail: {
    slug: "retail",
    eyebrow: "RETAIL",
    headlineLines: ["Know every shopper,", "online and in store."],
    subhead:
      "Resolve POS, ecommerce, and loyalty into one customer, so you can find your best shoppers and reach them in either channel.",
    featuredCustomer: "New Look",
    featuredStatId: "newLookHighValue",
    systems: [
      { abbr: "POS", name: "Point of sale", note: "in-store transactions" },
      { abbr: "ECOMM", name: "Ecommerce", note: "online orders and browsing" },
      { abbr: "LOYALTY", name: "Loyalty", note: "members and rewards" },
    ],
    useCases: [
      { title: "Omnichannel recognition", body: "See the customer who shops both channels as one relationship." },
      { title: "High-value discovery", body: "Surface top customers hiding across duplicate records." },
      { title: "Suppression-ready media", body: "Stop paying to acquire customers you already have." },
    ],
    storySlug: "new-look",
    faq: retailFaq,
    metaTitle: "Retail",
    metaDescription:
      "Resolve POS, ecommerce, and loyalty into one shopper. Find high-value customers and reach them in every channel.",
  },
  "travel-hospitality": {
    slug: "travel-hospitality",
    eyebrow: "TRAVEL & HOSPITALITY",
    headlineLines: ["One guest, recognized", "across every journey."],
    subhead:
      "Resolve reservations, loyalty, and service records into one traveler, so every moment of the trip is served by the same truth.",
    featuredCustomer: "Alaska Airlines",
    featuredStatId: "alaskaLoyaltyLift",
    systems: [
      { abbr: "PMS", name: "Property or reservation system", note: "bookings and stays" },
      { abbr: "PNR", name: "Passenger record", note: "itineraries" },
      { abbr: "FFP", name: "Loyalty program", note: "members and tiers" },
    ],
    useCases: [
      { title: "Recognized everywhere", body: "The traveler is known across booking, loyalty, and service." },
      { title: "Recovery that reaches VIPs first", body: "When plans change, the highest-value travelers are served first." },
      { title: "Loyalty that spans brands", body: "One relationship across every property and program." },
    ],
    storySlug: "alaska-airlines",
    faq: airlinesFaq,
    metaTitle: "Travel & Hospitality",
    metaDescription:
      "Resolve reservations, loyalty, and service into one traveler, so every moment of the trip runs on the same truth.",
  },
  hotels: {
    slug: "hotels",
    eyebrow: "HOTELS",
    headlineLines: ["The guest relationship,", "yours to keep."],
    subhead:
      "Resolve property, reservation, and loyalty systems into one guest, so you recognize your best guests and own the relationship instead of renting it.",
    featuredCustomer: "Wyndham Hotels & Resorts",
    featuredStatId: "wyndhamConversion",
    systems: [
      { abbr: "PMS", name: "Property management", note: "stays and folios" },
      { abbr: "CRS", name: "Central reservations", note: "bookings" },
      { abbr: "LOYALTY", name: "Loyalty program", note: "members and tiers" },
    ],
    useCases: [
      { title: "Direct relationships", body: "Recognize and reach guests directly, not through the OTA." },
      { title: "True-VIP identification", body: "See total value to the portfolio, across properties and brands." },
      { title: "IROPS recovery", body: "When operations go sideways, reach the guests who matter first." },
    ],
    storySlug: "wyndham",
    faq: hotelsFaq,
    metaTitle: "Hotels",
    metaDescription:
      "Resolve property, reservation, and loyalty systems into one guest. Own the relationship and recognize true VIPs.",
  },
  airlines: {
    slug: "airlines",
    eyebrow: "AIRLINES",
    headlineLines: ["Every flyer, recognized", "across every system."],
    subhead:
      "Resolve reservations, loyalty, and ancillary systems into one traveler, so high-value flyers are recognized and recovered first.",
    featuredCustomer: "Alaska Airlines",
    featuredStatId: "alaskaMembersMerged",
    systems: [
      { abbr: "PNR", name: "Passenger record", note: "itineraries" },
      { abbr: "FFP", name: "Frequent flyer program", note: "members and tiers" },
      { abbr: "ANCILLARY", name: "Ancillary systems", note: "upgrades and add-ons" },
    ],
    useCases: [
      { title: "True high-value flyers", body: "Total value per traveler, across duplicate accounts." },
      { title: "IROPS recovery", body: "Recognize and recover the highest-value flyers first." },
      { title: "Merger-ready loyalty", body: "Resolve overlapping programs into one accurate view." },
    ],
    storySlug: "alaska-airlines",
    faq: airlinesFaq,
    metaTitle: "Airlines",
    metaDescription:
      "Resolve reservations, loyalty, and ancillary systems into one traveler. Recognize and recover high-value flyers first.",
  },
  "financial-services": {
    slug: "financial-services",
    eyebrow: "FINANCIAL SERVICES",
    headlineLines: ["One member,", "every channel, governed."],
    subhead:
      "Resolve core banking, digital, and servicing systems into one member, with every merge auditable and every field governed.",
    featuredCustomer: "BECU",
    featuredStatId: "becuHoursSaved",
    systems: [
      { abbr: "CORE", name: "Core banking", note: "accounts and balances" },
      { abbr: "DIGITAL", name: "Digital banking", note: "app and web" },
      { abbr: "SERVICING", name: "Servicing", note: "support and claims" },
    ],
    useCases: [
      { title: "One member view", body: "Every channel recognizes the same person." },
      { title: "Auditable identity", body: "Explainable, reversible merges for a regulated environment." },
      { title: "Automated reporting", body: "Dashboards that refresh themselves, freeing your team." },
    ],
    storySlug: "becu",
    faq: fsFaq,
    metaTitle: "Financial Services",
    metaDescription:
      "Resolve core banking, digital, and servicing into one member, with auditable identity and governed fields.",
  },
  restaurants: {
    slug: "restaurants",
    eyebrow: "RESTAURANTS",
    headlineLines: ["One guest across every", "way they order."],
    subhead:
      "Resolve POS, app, and loyalty into one guest, so you can personalize the next order on who the guest is right now.",
    featuredCustomer: "",
    featuredStatId: "pepkorRoas",
    systems: [
      { abbr: "POS", name: "Point of sale", note: "in-store orders" },
      { abbr: "APP", name: "Ordering app", note: "mobile and delivery" },
      { abbr: "LOYALTY", name: "Loyalty", note: "members and rewards" },
    ],
    useCases: [
      { title: "Unified guest", body: "In-store, app, and delivery orders on one profile." },
      { title: "Right-time personalization", body: "Serve the current guest, not a stale export." },
      { title: "Loyalty that follows", body: "Recognize the guest wherever they order next." },
    ],
    storySlug: "",
    faq: restaurantsFaq,
    metaTitle: "Restaurants",
    metaDescription:
      "Resolve POS, app, and loyalty into one guest, and personalize the next order on who the guest is right now.",
  },
  "sports-entertainment": {
    slug: "sports-entertainment",
    eyebrow: "SPORTS & ENTERTAINMENT",
    headlineLines: ["Find the fans", "hiding in your data."],
    subhead:
      "Resolve ticketing, concessions, and merchandise into one fan, so the people who matter most are no longer lost in duplicate records.",
    featuredCustomer: "Seattle Seahawks",
    featuredStatId: "seahawksFans",
    systems: [
      { abbr: "TICKETING", name: "Ticketing", note: "seats and events" },
      { abbr: "CONCESSIONS", name: "Concessions", note: "in-venue spend" },
      { abbr: "MERCH", name: "Merchandise", note: "retail and ecommerce" },
    ],
    useCases: [
      { title: "Hidden high-value fans", body: "Surface top fans across duplicate records." },
      { title: "A cleaner database", body: "Remove duplicate and conflicting records." },
      { title: "Reach that converts", body: "Act on total value per fan, not a fragment." },
    ],
    storySlug: "seattle-seahawks",
    faq: sportsFaq,
    metaTitle: "Sports & Entertainment",
    metaDescription:
      "Resolve ticketing, concessions, and merchandise into one fan. Surface high-value fans hiding in duplicate records.",
  },
};

export const industrySlugs = Object.keys(industries);
