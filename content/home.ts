import type { StatId } from "./stats";

/** Homepage copy. Components import from here; copy edits never touch components. */

export const hero = {
  eyebrow: "THE CUSTOMER CONTEXT PLATFORM",
  // Manual line breaks: no orphans in the display face.
  headlineLines: ["AI is only as good", "as what it knows", "about your customer."],
  // Mobile gets its own break set at the smaller display step.
  headlineLinesMobile: ["AI is only", "as good", "as what", "it knows about", "your customer."],
  subhead:
    "Amperity resolves fragmented customer data into trusted, real-time context, so every team and every AI agent acts on the same truth.",
  primaryCta: { label: "Request a demo", href: "/resources/demo/request" },
  secondaryCta: { label: "Explore the platform", href: "/platform/customer-context-platform" },
};

export const logoCaption = "Trusted by 400+ enterprise brands";

export const manifesto = {
  beats: [
    {
      lines: ["CDPs were built to collect", "customer data. That era is over."],
    },
    {
      lines: ["The AI era asks a harder question:", "can your agents trust what they read?"],
    },
    {
      lines: [
        "Amperity built the answer.",
        "Identity-resolved profiles, live signals,",
        "governed access for every human",
        "and every agent. One context layer.",
        "Zero copies.",
      ],
    },
  ],
};

export type HomeChapter = {
  id: string;
  number: string;
  name: string;
  headline: string;
  failure: string;
  answer: string;
  statId: StatId;
  href: string;
};

export const chapters: HomeChapter[] = [
  {
    id: "resolve",
    number: "01",
    name: "RESOLVE",
    headline: "Every record becomes one customer.",
    failure: "Your best customer exists in six systems under six names.",
    answer:
      "Identity Resolution stitches every record into one accurate ID graph with patented machine learning: deterministic and probabilistic matching across billions of rows, every merge transparent and auditable, one durable AmpID per person.",
    statId: "alaskaAccuracy",
    href: "/platform/identity-resolution",
  },
  {
    id: "understand",
    number: "02",
    name: "UNDERSTAND",
    headline: "One history, read the same way by every team.",
    failure: "Teams disagree about the customer because each one builds its own version.",
    answer:
      "Customer 360 curates the complete history for every team that serves the customer, with churn, next purchase, and lifetime value predicted on top. Ask AmpAI in plain language and get answers grounded in resolved profiles.",
    statId: "newLookOmnichannel",
    href: "/platform/amp360",
  },
  {
    id: "act",
    number: "03",
    name: "ACT",
    headline: "The same truth, acting in every channel.",
    failure: "Insight that never leaves the warehouse never changes a customer's experience.",
    answer:
      "Journeys, paid media, and real-time personalization run on live context. AmpAI and the Amperity MCP Server ground every assistant and agent in the same governed profiles your teams use.",
    statId: "wyndhamConversion",
    href: "/platform/customer-context-platform",
  },
];

export const stack = {
  eyebrow: "ARCHITECTURE",
  headlineLines: ["Built for your stack,", "not around it."],
  items: [
    {
      icon: "database" as const,
      title: "Run it anywhere",
      body: "Amperity runs in its own cloud, natively on Databricks or Snowflake, or on your own storage and compute. Your data stays where it lives.",
    },
    {
      icon: "bridge" as const,
      title: "Amperity Bridge",
      body: "Live profiles shared with your lakehouse and warehouse with zero copies. No exports, no drift, no stale snapshots.",
    },
    {
      icon: "agent" as const,
      title: "Amperity MCP Server",
      body: "Governed customer context delivered to any AI application or agent through the Model Context Protocol. Same profiles, same permissions.",
    },
  ],
  integrations: [
    "Databricks",
    "Snowflake",
    "AWS",
    "Microsoft",
    "Google",
    "Braze",
    "Klaviyo",
    "Meta",
    "TikTok",
    "Salesforce",
  ],
  integrationsCta: { label: "See all 400+ integrations", href: "/integrations" },
};

export const teams = {
  eyebrow: "FOR EVERY TEAM",
  headline: "The same truth, put to work differently.",
  cards: [
    {
      icon: "marketing" as const,
      title: "Marketing",
      body: "Trusted context for reach, precision, and provable return. Find more of your best customers and act the moment it matters.",
      href: "/solutions/departments/marketing",
    },
    {
      icon: "analytics" as const,
      title: "Analytics",
      body: "A governed foundation every model and insight can stand on. Transparent identity, auditable decisions.",
      href: "/solutions/departments/analytics",
    },
    {
      icon: "server" as const,
      title: "IT & Data",
      body: "The customer data infrastructure the rest of the business runs on. Zero-copy architecture, 400+ pipelines, governance built in.",
      href: "/solutions/departments/it",
    },
  ],
};

export const ticker = "Trusted context for every agent, every team, every moment.";

export const closing = {
  headlineLines: ["Make every customer feel", "like your most important one."],
  subhead:
    "See Amperity on your data, in your stack, with your team. A working session, not a scripted tour.",
  cta: { label: "Request a demo", href: "/resources/demo/request" },
};
