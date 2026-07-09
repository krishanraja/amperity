import type { Metadata } from "next";
import { ConversionPage } from "@/components/sections/ConversionPage";

export const metadata: Metadata = {
  title: "Contact sales",
  description:
    "Talk to the team about your use cases and get an Amps estimate built on what you plan to do.",
  openGraph: {
    title: "Contact sales",
    description: "Talk to the team and get an Amps estimate built on your use cases.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.png"] },
};

export default function ContactSalesPage() {
  return (
    <ConversionPage
      eyebrow="CONTACT SALES"
      headlineLines={["Let's size it", "to your use cases."]}
      subhead="Tell us what you want to do and we will build an Amps estimate grounded in your data volumes and goals."
      reassurance="We will show you Amperity on your data, your stack, your team."
      bullets={[
        "An Amps estimate built on your use cases",
        "The fastest path from your data to value",
        "Answers on architecture, governance, and security",
      ]}
    />
  );
}
