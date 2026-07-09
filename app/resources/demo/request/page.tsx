import type { Metadata } from "next";
import { ConversionPage } from "@/components/sections/ConversionPage";

export const metadata: Metadata = {
  title: "Request a demo",
  description:
    "See Amperity on your data, your stack, your team. A working session, not a scripted tour.",
  openGraph: {
    title: "Request a demo",
    description: "See Amperity on your data, your stack, your team.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.png"] },
};

export default function DemoRequestPage() {
  return (
    <ConversionPage
      eyebrow="REQUEST A DEMO"
      headlineLines={["See it on your data,", "not a slide."]}
      subhead="A working session on your systems and your customers, run by people who have done it hundreds of times."
      reassurance="We will show you Amperity on your data, your stack, your team."
      bullets={[
        "Resolution run against a sample of your real data",
        "The context layer wired to your stack",
        "A path to value, scoped to your use cases",
      ]}
    />
  );
}
