export type FaqItem = { q: string; a: string };

/** FAQ content by domain. Rendered through the Accordion pattern. */

export const pricingFaq: FaqItem[] = [
  {
    q: "What is an Amp?",
    a: "An Amp is a standardized unit of consumption. It measures the work the platform does for you, so pricing tracks value rather than seats or modules.",
  },
  {
    q: "Do I pay per user?",
    a: "No. Every team, and every AI agent, gets access without a per-seat charge. Usage is measured in Amps, not headcount.",
  },
  {
    q: "What happens to unused Amps?",
    a: "Unused Amps roll over, and on-demand capacity covers spikes, so a quiet month or a large campaign never leaves you over or under provisioned.",
  },
  {
    q: "Does every feature cost extra?",
    a: "No. Amps buy the full platform. Identity resolution, Customer 360, predictions, activation, and the MCP Server are all included, not gated behind tiers.",
  },
  {
    q: "How do I estimate what I will spend?",
    a: "Talk to the team with your use cases and data volumes and we will build an Amps estimate grounded in what you actually plan to do.",
  },
];

export const hotelsFaq: FaqItem[] = [
  {
    q: "How do you handle a VIP caught in IROPS?",
    a: "When operations go sideways, a resolved profile means the guest who matters most is recognized across every system at once, so recovery reaches the right people first instead of treating everyone as a stranger.",
  },
  {
    q: "How do you compete with the OTAs for the guest relationship?",
    a: "Resolved, first-party guest profiles let you recognize and reach the guest directly, so the relationship is yours to keep rather than rented from an intermediary.",
  },
  {
    q: "Can you identify a true VIP across brands and properties?",
    a: "Multi-brand resolution links a guest across properties and brands, so a true VIP is identified by total value to the portfolio, not by their status at a single property.",
  },
];

export const airlinesFaq: FaqItem[] = [
  {
    q: "How do you handle a VIP during irregular operations?",
    a: "A resolved traveler profile is recognized across reservations, loyalty, and service the moment operations change, so the highest-value flyers are recovered first instead of lost in the queue.",
  },
  {
    q: "How do you find true high-value flyers?",
    a: "Resolving records across PNR, loyalty, and ancillary systems reveals total value per traveler, so the people who matter most are not hidden behind duplicate accounts.",
  },
  {
    q: "What happens to loyalty data in a merger?",
    a: "Amperity resolves overlapping loyalty programs into one accurate view, the work behind merging millions of members without losing a relationship.",
  },
];
