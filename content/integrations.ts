/**
 * Integrations. 40 of the 400+ connectors, the most recognizable across
 * categories. Rendered as mono text chips (no third-party trademarks
 * hand-drawn) in a searchable, filterable grid.
 */

export const integrationCategories = [
  "Warehouses & Lakehouses",
  "Marketing Clouds",
  "Paid Media",
  "Email & SMS",
  "Service",
  "Analytics & BI",
] as const;

export type IntegrationCategory = (typeof integrationCategories)[number];

export type Integration = { name: string; category: IntegrationCategory };

export const integrations: Integration[] = [
  { name: "Databricks", category: "Warehouses & Lakehouses" },
  { name: "Snowflake", category: "Warehouses & Lakehouses" },
  { name: "Amazon Redshift", category: "Warehouses & Lakehouses" },
  { name: "Google BigQuery", category: "Warehouses & Lakehouses" },
  { name: "Amazon S3", category: "Warehouses & Lakehouses" },
  { name: "Microsoft Azure", category: "Warehouses & Lakehouses" },
  { name: "Salesforce Marketing Cloud", category: "Marketing Clouds" },
  { name: "Adobe Experience Cloud", category: "Marketing Clouds" },
  { name: "Braze", category: "Marketing Clouds" },
  { name: "Klaviyo", category: "Marketing Clouds" },
  { name: "Marigold", category: "Marketing Clouds" },
  { name: "Iterable", category: "Marketing Clouds" },
  { name: "Meta", category: "Paid Media" },
  { name: "Google Ads", category: "Paid Media" },
  { name: "TikTok", category: "Paid Media" },
  { name: "The Trade Desk", category: "Paid Media" },
  { name: "Pinterest", category: "Paid Media" },
  { name: "Snap", category: "Paid Media" },
  { name: "Amazon Ads", category: "Paid Media" },
  { name: "LinkedIn", category: "Paid Media" },
  { name: "Twilio", category: "Email & SMS" },
  { name: "SendGrid", category: "Email & SMS" },
  { name: "Attentive", category: "Email & SMS" },
  { name: "Mailchimp", category: "Email & SMS" },
  { name: "Cordial", category: "Email & SMS" },
  { name: "Sailthru", category: "Email & SMS" },
  { name: "Zendesk", category: "Service" },
  { name: "Salesforce Service Cloud", category: "Service" },
  { name: "Gladly", category: "Service" },
  { name: "Kustomer", category: "Service" },
  { name: "Intercom", category: "Service" },
  { name: "Tableau", category: "Analytics & BI" },
  { name: "Looker", category: "Analytics & BI" },
  { name: "Power BI", category: "Analytics & BI" },
  { name: "Amplitude", category: "Analytics & BI" },
  { name: "Mixpanel", category: "Analytics & BI" },
  { name: "Google Analytics", category: "Analytics & BI" },
  { name: "Segment", category: "Analytics & BI" },
  { name: "Hightouch", category: "Analytics & BI" },
  { name: "dbt", category: "Analytics & BI" },
];

export const integrationsHero = {
  eyebrow: "INTEGRATIONS",
  headlineLines: ["Context that travels", "everywhere your customer does."],
  subhead:
    "400+ pre-built connectors across warehouses, marketing clouds, paid media, messaging, service, and BI. Resolved context, delivered wherever you work.",
  primaryCta: { label: "Request a demo", href: "/resources/demo/request" },
  secondaryCta: { label: "Talk to the team", href: "/contact-sales" },
};
