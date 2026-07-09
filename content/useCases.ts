import type { IconName } from "@/components/icons";

/** Use-case library. Filterable by industry and category. 12 seeded. */

export const useCaseCategories = [
  "Activation",
  "Data readiness",
  "Analytics",
  "Personalization",
  "Loyalty",
  "Paid Media",
] as const;

export const useCaseIndustries = [
  "Retail",
  "Travel",
  "Hotels",
  "Airlines",
  "Financial Services",
  "Restaurants",
  "Sports",
] as const;

export type UseCaseCategory = (typeof useCaseCategories)[number];
export type UseCaseIndustry = (typeof useCaseIndustries)[number];

export type UseCase = {
  slug: string;
  title: string;
  body: string;
  category: UseCaseCategory;
  industries: UseCaseIndustry[];
  icon: IconName;
};

export const useCases: UseCase[] = [
  {
    slug: "suppression-ready-media",
    title: "Suppression-ready paid media",
    body: "Push resolved audiences to every ad platform with existing customers suppressed, so spend goes to acquisition, not re-acquisition.",
    category: "Paid Media",
    industries: ["Retail", "Travel", "Restaurants"],
    icon: "paidmedia",
  },
  {
    slug: "high-value-discovery",
    title: "High-value customer discovery",
    body: "Resolve duplicates to reveal total spend per customer and surface the high-value people hiding across systems.",
    category: "Analytics",
    industries: ["Retail", "Sports", "Hotels"],
    icon: "insight",
  },
  {
    slug: "real-time-personalization",
    title: "Real-time personalization",
    body: "Serve the current profile to your site and app the moment the customer arrives, not who they were on a stale export.",
    category: "Personalization",
    industries: ["Retail", "Restaurants", "Travel"],
    icon: "personalization",
  },
  {
    slug: "churn-prevention",
    title: "Churn prevention journeys",
    body: "Predict lapse risk on a resolved foundation and trigger a journey before the customer is gone.",
    category: "Activation",
    industries: ["Travel", "Financial Services", "Hotels"],
    icon: "journey",
  },
  {
    slug: "loyalty-unification",
    title: "Loyalty program unification",
    body: "Resolve overlapping loyalty records into one accurate view, the foundation for merging programs without losing relationships.",
    category: "Loyalty",
    industries: ["Airlines", "Hotels", "Retail"],
    icon: "identity",
  },
  {
    slug: "profile-foundation",
    title: "AI-ready profile foundation",
    body: "Give models and agents a resolved, governed foundation, so predictions and answers start from the truth.",
    category: "Data readiness",
    industries: ["Financial Services", "Retail", "Travel"],
    icon: "database",
  },
  {
    slug: "next-best-action",
    title: "Next best action",
    body: "Turn a predicted signal into a recommended action in plain English, ready to launch where teams already work.",
    category: "Activation",
    industries: ["Retail", "Financial Services", "Hotels"],
    icon: "bolt",
  },
  {
    slug: "omnichannel-recognition",
    title: "Omnichannel recognition",
    body: "Link online and in-store records so a customer who shops both channels is recognized as one relationship.",
    category: "Personalization",
    industries: ["Retail", "Restaurants"],
    icon: "profile",
  },
  {
    slug: "predictive-clv",
    title: "Predictive lifetime value",
    body: "Score lifetime value on resolved profiles, so investment follows customers who will actually be worth it.",
    category: "Analytics",
    industries: ["Retail", "Sports", "Travel"],
    icon: "prediction",
  },
  {
    slug: "agent-grounding",
    title: "Agent grounding via MCP",
    body: "Serve governed customer context to any AI application through the MCP Server, so agents inherit permissions, not duplicates.",
    category: "Data readiness",
    industries: ["Financial Services", "Retail", "Travel"],
    icon: "agent",
  },
  {
    slug: "audience-monetization",
    title: "Audience monetization",
    body: "Package and share governed audiences with partners to open new revenue on first-party data you already own.",
    category: "Activation",
    industries: ["Retail", "Sports"],
    icon: "monetization",
  },
  {
    slug: "vip-recovery",
    title: "VIP recovery in disruption",
    body: "Recognize the highest-value customers across every system so recovery reaches them first when operations change.",
    category: "Loyalty",
    industries: ["Airlines", "Hotels", "Travel"],
    icon: "governance",
  },
];
