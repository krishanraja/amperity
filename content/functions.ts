import type { IconName } from "@/components/icons";
import type { StatId } from "./stats";

/** Function (department) pages. Three data instances of one template. */

export type FunctionData = {
  slug: string;
  eyebrow: string;
  icon: IconName;
  headlineLines: string[];
  subhead: string;
  pains: { title: string; body: string }[];
  outcomes: { icon: IconName; title: string; body: string }[];
  featureStatId?: StatId;
  metaTitle: string;
  metaDescription: string;
};

export const functions: Record<string, FunctionData> = {
  marketing: {
    slug: "marketing",
    eyebrow: "FOR MARKETING",
    icon: "marketing",
    headlineLines: ["Marketing that knows", "every customer."],
    subhead:
      "Reach more of your best customers, act in the moment, cut wasted spend, and prove the return, all on context you can trust.",
    pains: [
      {
        title: "Wasted reach",
        body: "You are paying to reach customers you already have and audiences that never matched.",
      },
      {
        title: "Missed moments",
        body: "By the time the data reaches the channel, the moment that mattered has passed.",
      },
      {
        title: "Unprovable return",
        body: "Attribution built on fragmented identity cannot tell you what actually worked.",
      },
    ],
    outcomes: [
      {
        icon: "audience",
        title: "Reach the right customers",
        body: "Resolved audiences, suppression-ready, pushed to every major channel.",
      },
      {
        icon: "realtime",
        title: "Act in the moment",
        body: "Real-time profiles trigger the right message while it still matters.",
      },
      {
        icon: "insight",
        title: "Prove the return",
        body: "Measure against resolved identity, so the numbers reflect real people.",
      },
    ],
    featureStatId: "wyndhamConversion",
    metaTitle: "Marketing",
    metaDescription:
      "Reach more high-value customers, act in the moment, cut wasted spend, and prove the return on trusted customer context.",
  },
  analytics: {
    slug: "analytics",
    eyebrow: "FOR ANALYTICS",
    icon: "analytics",
    headlineLines: ["Customer data your AI", "initiatives can finally trust."],
    subhead:
      "Transparent identity, governed profiles, and auditable decisions, so every model and every insight stands on a foundation you can defend.",
    pains: [
      {
        title: "Garbage in",
        body: "Models trained on duplicated records learn the wrong patterns and predict them confidently.",
      },
      {
        title: "Unexplainable joins",
        body: "When identity is a black box, no one can say why two records became one.",
      },
      {
        title: "Ungoverned access",
        body: "Analysts pull data they should not see, and no one can prove otherwise.",
      },
    ],
    outcomes: [
      {
        icon: "identity",
        title: "Transparent identity",
        body: "Every merge is explainable and reversible, so joins are defensible.",
      },
      {
        icon: "governance",
        title: "Governed profiles",
        body: "Field-level permissions decide what each model and analyst can read.",
      },
      {
        icon: "insight",
        title: "Auditable decisions",
        body: "Trace any score or segment back to the resolved profiles behind it.",
      },
    ],
    metaTitle: "Analytics",
    metaDescription:
      "Transparent identity, governed profiles, and auditable decisions, so every model and insight can be trusted.",
  },
  it: {
    slug: "it",
    eyebrow: "FOR IT & DATA",
    icon: "server",
    headlineLines: ["The customer data infrastructure", "the rest of the business", "runs on."],
    subhead:
      "Zero-copy architecture, governance, and 400+ pipelines, so the platform serves every team without becoming a maintenance burden.",
    pains: [
      {
        title: "Pipeline sprawl",
        body: "Every new source is another brittle pipeline your team has to build and babysit.",
      },
      {
        title: "Copy proliferation",
        body: "Each export is another copy to secure, sync, and reconcile.",
      },
      {
        title: "Build-and-maintain drag",
        body: "Your team spends its time keeping profiles alive instead of moving the business forward.",
      },
    ],
    outcomes: [
      {
        icon: "bridge",
        title: "Zero-copy architecture",
        body: "Share live profiles with your lakehouse and warehouse without exports.",
      },
      {
        icon: "pipeline",
        title: "400+ pipelines",
        body: "Pre-built connectors land and structure source data so you do not have to.",
      },
      {
        icon: "governance",
        title: "Governance built in",
        body: "Field-level permissions and PII controls, managed centrally.",
      },
    ],
    featureStatId: "profileTimeSaved",
    metaTitle: "IT & Data",
    metaDescription:
      "Zero-copy architecture, governance, and 400+ pipelines. The customer data infrastructure the rest of the business runs on.",
  },
};

export const functionSlugs = Object.keys(functions);
