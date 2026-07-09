import type { IconName } from "@/components/icons";

/**
 * Company copy. Customer-facing facts only: founding, offices, scale,
 * recognition, mission. No headcount, no funding, no org chart.
 */

export const aboutHero = {
  eyebrow: "ABOUT",
  headlineLines: ["Help people use data", "to serve the customer."],
  subhead:
    "Amperity was founded in 2016 in Seattle to solve the problem underneath every customer initiative: knowing who the customer actually is.",
};

export const aboutFacts: { icon: IconName; label: string; value: string }[] = [
  { icon: "profile", label: "FOUNDED", value: "2016, Seattle. Founder-led." },
  { icon: "audience", label: "BRANDS", value: "400+ enterprise brands" },
  { icon: "bridge", label: "OFFICES", value: "Seattle, New York, London, Melbourne" },
  { icon: "governance", label: "RECOGNITION", value: "IDC MarketScape Leader" },
];

export const aboutBody = [
  "Consumer brands do not lack customer data. They lack a trustworthy answer to who the customer is. Records pile up across systems, duplicated and contradictory, and every team builds its own version of the truth.",
  "Amperity resolves that. Patented machine learning stitches billions of records into one accurate identity, curated for every team and governed for every use. It is the foundation marketing activates on, analytics models on, and, now, AI acts on.",
];

export const recognition = [
  "Named a Leader in the IDC MarketScape for Retail CDPs, 2025.",
  "Named a Leader in the IDC MarketScape for AI-Enabled CDPs for B2C, 2026.",
];

export const offices = ["Seattle", "New York", "London", "Melbourne"];

export const careersHero = {
  eyebrow: "CAREERS",
  headlineLines: ["Build the layer", "AI runs on."],
  subhead:
    "We are a founder-led company solving one hard, durable problem: the trustworthy customer foundation every brand and every agent needs.",
};

export const values: { title: string; body: string }[] = [
  { title: "Serve the customer", body: "Every decision starts from the person on the other end of the data." },
  { title: "Earn the trust", body: "Transparent, auditable, governed. We build things people can defend." },
  { title: "Prove it", body: "Named customers and real numbers, not adjectives." },
  { title: "Ship the hard part", body: "We do the difficult, unglamorous work that makes the rest possible." },
];
