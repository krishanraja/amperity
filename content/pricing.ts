import type { IconName } from "@/components/icons";

/**
 * Pricing copy. The Amps model kept exactly: a standardized consumption
 * unit with full platform access. Reframed as an AI-era feature: costs
 * scale with value, not seats or modules.
 */

export const pricingHero = {
  eyebrow: "PRICING",
  headlineLines: ["Pay for what you use.", "Get everything."],
  subhead:
    "Amperity is priced in Amps, one standardized consumption unit. No per-seat tax, no module gating. Costs scale with the value you generate.",
  primaryCta: { label: "Get an Amps estimate", href: "/contact-sales" },
  secondaryCta: { label: "See the platform", href: "/platform/customer-context-platform" },
};

export const ampsPoints: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "monetization",
    title: "One unit, full platform",
    body: "An Amp is a standardized unit of consumption. Every Amp buys the whole platform, not a tier that gates the features you need.",
  },
  {
    icon: "insight",
    title: "Dashboards and alerts",
    body: "See consumption in real time with dashboards and alerts, so spend never surprises you at renewal.",
  },
  {
    icon: "realtime",
    title: "Rollover and on-demand",
    body: "Unused Amps roll over and on-demand capacity absorbs the spikes, so you are not penalized for a quiet month or a big campaign.",
  },
  {
    icon: "governance",
    title: "No per-seat tax",
    body: "Add every team and every agent without a per-seat bill. The people and systems that need the truth all get it.",
  },
];

export const whyUsage = {
  eyebrow: "WHY USAGE-BASED",
  headline: "The AI era rewards access, not gates.",
  body: "When every team and every agent needs the same governed context, per-seat and per-module pricing punishes exactly the access you want to encourage. Amps price the value produced, so the incentive is to put the truth everywhere it helps.",
};
