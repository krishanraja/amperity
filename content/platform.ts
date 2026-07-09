import type { IconName } from "@/components/icons";
import type { StatId } from "./stats";

/**
 * Platform copy. The overview page groups capabilities into four
 * numbered chapters; each capability follows the failure-mode-first
 * pattern: name what goes wrong in one sentence, then what Amperity
 * does about it.
 */

export type Capability = {
  name: string;
  icon: IconName;
  failure: string;
  answer: string;
};

export type PlatformChapter = {
  number: string;
  title: string;
  eyebrow: string;
  capabilities: Capability[];
};

export const overviewHero = {
  eyebrow: "THE CUSTOMER CONTEXT PLATFORM",
  headlineLines: ["Customer data platforms", "unified your data.", "We built what comes next."],
  subhead:
    "The Customer Context Platform resolves identity, curates it per team, and serves the same governed truth to every person and every AI agent.",
  primaryCta: { label: "Request a demo", href: "/resources/demo/request" },
  secondaryCta: { label: "Talk to the team", href: "/contact-sales" },
};

export const overviewChapters: PlatformChapter[] = [
  {
    number: "01",
    title: "Context",
    eyebrow: "01 / CONTEXT",
    capabilities: [
      {
        name: "Identity Resolution",
        icon: "identity",
        failure: "Your best customer is scattered across systems under names that never match.",
        answer:
          "Stitch and AmpID resolve every record into one accurate, durable identity with patented machine learning. Deterministic and probabilistic matching across billions of rows, every merge transparent.",
      },
      {
        name: "Customer 360",
        icon: "profile",
        failure: "Every team rebuilds the customer from scratch and none of the versions agree.",
        answer:
          "One resolved history, curated into the views each team needs, governed and consistent everywhere it is read.",
      },
      {
        name: "Real-Time Profile API",
        icon: "realtime",
        failure: "A profile that is a day old is a missed moment at the point of interaction.",
        answer:
          "Query the current profile in milliseconds at the moment of an interaction, so decisions run on what is true now.",
      },
    ],
  },
  {
    number: "02",
    title: "Intelligence",
    eyebrow: "02 / INTELLIGENCE",
    capabilities: [
      {
        name: "Predictive Insights",
        icon: "prediction",
        failure: "Models trained on duplicated records predict the wrong future confidently.",
        answer:
          "Churn, next purchase, and lifetime value predicted on a resolved foundation, so the scores mean what they say.",
      },
      {
        name: "AmpAI",
        icon: "assistant",
        failure: "An assistant that reads fragmented data gives fluent, wrong answers at machine speed.",
        answer:
          "Ask in plain language and get answers grounded in resolved profiles, one click from a live segment or journey.",
      },
      {
        name: "Recommended Actions",
        icon: "bolt",
        failure: "Insight that never becomes an action never changes a customer's experience.",
        answer:
          "Turn a predicted signal into a next best action in plain English, ready to launch where your teams already work.",
      },
    ],
  },
  {
    number: "03",
    title: "Activation",
    eyebrow: "03 / ACTIVATION",
    capabilities: [
      {
        name: "Paid Media",
        icon: "paidmedia",
        failure: "Ad platforms waste spend on customers you already have and audiences that never matched.",
        answer:
          "Push resolved, suppression-ready audiences to every major ad platform and spend against people, not guesses.",
      },
      {
        name: "Real-Time Personalization",
        icon: "personalization",
        failure: "Personalization built on a stale export personalizes to who the customer used to be.",
        answer:
          "Serve the current profile to your site, app, and service channels the moment the customer arrives.",
      },
      {
        name: "Journey Orchestration",
        icon: "journey",
        failure: "Journeys fork on data that is wrong and send the wrong message with confidence.",
        answer:
          "Design and run journeys on live context, with branches that read the same truth every other team acts on.",
      },
      {
        name: "Audience Monetization",
        icon: "monetization",
        failure: "First-party data that stays in the warehouse earns nothing.",
        answer:
          "Package and share governed audiences with partners to open new revenue on data you already own.",
      },
    ],
  },
  {
    number: "04",
    title: "Architecture",
    eyebrow: "04 / ARCHITECTURE",
    capabilities: [
      {
        name: "Amperity MCP Server",
        icon: "agent",
        failure: "Point an agent at raw customer data and it inherits every duplicate and gap.",
        answer:
          "Deliver governed customer context to any AI application through the Model Context Protocol, same profiles and same permissions your teams use.",
      },
      {
        name: "Data Foundation",
        icon: "database",
        failure: "Brittle pipelines break the moment a source schema shifts.",
        answer:
          "400+ pre-built pipelines land, clean, and structure source data into a foundation that holds as sources change.",
      },
      {
        name: "Lakehouse Native",
        icon: "lakehouse",
        failure: "Copying data into another platform doubles cost, latency, and risk.",
        answer:
          "Run natively on Databricks or Snowflake so resolution happens where your data already lives.",
      },
      {
        name: "Bring Your Own Storage & Compute",
        icon: "server",
        failure: "A vendor that owns your storage owns your leverage.",
        answer:
          "Keep data in your own storage and run Amperity on your own compute, with no lock-in to a proprietary store.",
      },
      {
        name: "Amperity Bridge",
        icon: "bridge",
        failure: "Every export is a copy that drifts out of sync the instant it lands.",
        answer:
          "Share live, resolved profiles with your lakehouse and warehouse with zero copies. No exports, no drift.",
      },
    ],
  },
];

export const overviewClose = {
  quoteId: "becu" as const,
  statId: "becuHoursSaved" as StatId,
};

/* ---- Identity Resolution (flagship) ---- */
export const identityPage = {
  hero: {
    eyebrow: "IDENTITY RESOLUTION",
    headlineLines: ["When identity is wrong,", "everything built on it", "is wrong. Including your AI."],
    subhead:
      "Stitch and AmpID resolve billions of records into one accurate identity graph, so every profile, prediction, and agent starts from the truth.",
    primaryCta: { label: "Request a demo", href: "/resources/demo/request" },
    secondaryCta: { label: "See the platform", href: "/platform/customer-context-platform" },
  },
  featureStatId: "alaskaAccuracy" as StatId,
  points: [
    {
      icon: "identity" as IconName,
      title: "Stitch",
      body: "Patented machine learning clusters every record that belongs to the same person across sources, formats, and time, without brittle hand-tuned rules.",
    },
    {
      icon: "profile" as IconName,
      title: "AmpID",
      body: "One durable identifier per person that persists as data changes, so downstream systems always point at the same customer.",
    },
    {
      icon: "governance" as IconName,
      title: "Deterministic and probabilistic",
      body: "Exact matches where the data is clean, machine-learned matches where it is not, tuned to prevent both missed links and over-merges.",
    },
    {
      icon: "insight" as IconName,
      title: "Transparent and auditable",
      body: "Every merge is explainable and reversible. You can see why two records became one, which matters when a regulator or an executive asks.",
    },
  ],
};

/* ---- Customer 360 ---- */
export const amp360Page = {
  hero: {
    eyebrow: "CUSTOMER 360",
    headlineLines: ["One customer, one history,", "curated for every team", "that serves them."],
    subhead:
      "A resolved profile is only useful if each team can read it their way. Customer 360 curates one truth into the views marketing, analytics, and service each need.",
    primaryCta: { label: "Request a demo", href: "/resources/demo/request" },
    secondaryCta: { label: "See the platform", href: "/platform/customer-context-platform" },
  },
  points: [
    {
      icon: "profile" as IconName,
      title: "Curated views per team",
      body: "The same resolved customer, shaped into the attributes and history each team needs, without forking the underlying truth.",
    },
    {
      icon: "audience" as IconName,
      title: "Multi-C360 for multi-brand",
      body: "Resolve within and across brands, so a portfolio sees each customer both per brand and as one relationship.",
    },
    {
      icon: "pipeline" as IconName,
      title: "400+ pipelines",
      body: "Pre-built connectors land and structure source data into the profile, so the 360 stays current as sources change.",
    },
    {
      icon: "realtime" as IconName,
      title: "Real-time query performance",
      body: "Read the current profile at interaction speed, so the view a channel acts on is the view that is true now.",
    },
    {
      icon: "governance" as IconName,
      title: "Governance and PII redaction",
      body: "Field-level governance, PII redaction, and encryption, so each team sees exactly what it is permitted to see.",
    },
  ],
};

/* ---- AmpAI ---- */
export const ampaiPage = {
  hero: {
    eyebrow: "AMPAI",
    headlineLines: ["AI that starts", "from the truth."],
    subhead:
      "Assistants and agents are only as useful as the data underneath them. AmpAI grounds every answer in identity-resolved, governed customer context.",
    primaryCta: { label: "Request a demo", href: "/resources/demo/request" },
    secondaryCta: { label: "See the platform", href: "/platform/customer-context-platform" },
  },
  assistant: [
    {
      icon: "segment" as IconName,
      title: "Natural-language segmentation",
      body: "Describe the audience you want and get a segment built on live, resolved profiles, not a stale export.",
    },
    {
      icon: "insight" as IconName,
      title: "Insight generation",
      body: "Ask why a number moved and get an answer traced back to the profiles behind it.",
    },
    {
      icon: "journey" as IconName,
      title: "Journey design",
      body: "Go from a described goal to a live journey in a click, grounded in the same context your teams use.",
    },
    {
      icon: "bolt" as IconName,
      title: "Recommended actions",
      body: "Turn a predicted signal into a next best action, written in plain English and ready to launch.",
    },
  ],
  agents: [
    {
      icon: "agent" as IconName,
      title: "Amperity MCP Server",
      body: "Deliver governed customer context to any AI application or agent through the Model Context Protocol. The same profiles and the same permissions your teams work with, no raw-data free-for-all.",
    },
    {
      icon: "api" as IconName,
      title: "Chuck Data",
      body: "A terminal-native agent for customer data engineering, built for the people who wire the platform together.",
      href: "https://github.com/amperity/chuck-data",
    },
  ],
  honestLine:
    "Assistants are only as useful as the data underneath them. That is the whole point of the platform: get the context right, and the AI gets useful.",
};

/* ---- Services ---- */
export const servicesPage = {
  hero: {
    eyebrow: "SERVICES",
    headlineLines: ["Live in weeks,", "not quarters."],
    subhead:
      "Implementation methodology, dedicated teams, and a partner network built to get you to value fast and keep you there.",
    primaryCta: { label: "Request a demo", href: "/resources/demo/request" },
    secondaryCta: { label: "Talk to the team", href: "/contact-sales" },
  },
  featureQuoteId: "brooks" as const,
  featureStatId: "brooksPoc" as StatId,
  points: [
    {
      icon: "pipeline" as IconName,
      title: "Implementation methodology",
      body: "A proven path from source data to resolved profiles to activation, run by people who have done it hundreds of times.",
    },
    {
      icon: "profile" as IconName,
      title: "Dedicated teams",
      body: "A team that knows your data and your goals, not a rotating queue of tickets.",
    },
    {
      icon: "bolt" as IconName,
      title: "Premium services",
      body: "Deeper engagements for complex portfolios, migrations, and custom activation.",
    },
    {
      icon: "audience" as IconName,
      title: "Partner network",
      body: "Certified partners to extend your team and accelerate the work.",
    },
    {
      icon: "governance" as IconName,
      title: "Support tiers",
      body: "Support matched to how critical the platform is to your business.",
    },
  ],
};
