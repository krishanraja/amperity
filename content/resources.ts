/**
 * Resources shell. Six seeded cards drawn from real current items.
 * Individual resource pages are out of scope; cards link out or to #.
 */

export const resourceTypes = [
  "Blog",
  "Guide",
  "Video",
  "Webinar",
  "Report",
  "Product Brief",
] as const;

export type ResourceType = (typeof resourceTypes)[number];

export type Resource = {
  title: string;
  type: ResourceType;
  blurb: string;
  href: string;
};

export const resources: Resource[] = [
  {
    title: "Amperity on Snowflake and Databricks",
    type: "Product Brief",
    blurb: "How the Customer Context Platform runs natively on your lakehouse, with zero copies.",
    href: "#",
  },
  {
    title: "Amplify 2026 keynote",
    type: "Video",
    blurb: "The case for the customer context layer, and where the platform is going.",
    href: "#",
  },
  {
    title: "AI in travel and hospitality: 800 leaders surveyed",
    type: "Report",
    blurb: "What airline and hotel leaders believe about AI, and where the data is not ready.",
    href: "#",
  },
  {
    title: "The Amperity MCP Server",
    type: "Blog",
    blurb: "Governed customer context for any AI application, delivered through the Model Context Protocol.",
    href: "#",
  },
  {
    title: "Pepkor: 37x ROAS from right-time personalization",
    type: "Webinar",
    blurb: "How resolved profiles turned timing into return.",
    href: "#",
  },
  {
    title: "The retail CDP RFP guide",
    type: "Guide",
    blurb: "The questions that separate a real customer data foundation from a shipped feature list.",
    href: "#",
  },
];

export const resourcesHero = {
  eyebrow: "RESOURCES",
  headlineLines: ["Read the argument.", "See the proof."],
  subhead:
    "Guides, briefs, and sessions on identity resolution, the customer context layer, and making AI safe to act.",
};
