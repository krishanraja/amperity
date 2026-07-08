import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { LogoMarquee } from "@/components/sections/home/LogoMarquee";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { ProofRows } from "@/components/sections/home/ProofRows";
import { Stack } from "@/components/sections/home/Stack";
import { Teams } from "@/components/sections/home/Teams";
import { Ticker } from "@/components/sections/home/Ticker";
import { ClosingCta } from "@/components/sections/home/ClosingCta";

export const metadata: Metadata = {
  title: "Amperity: The Customer Context Platform",
  description:
    "Amperity resolves fragmented customer data into trusted, real-time context, so every team and every AI agent acts on the same truth.",
  openGraph: {
    title: "AI is only as good as what it knows about your customer.",
    description:
      "Amperity resolves fragmented customer data into trusted, real-time context, so every team and every AI agent acts on the same truth.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/home.png"],
  },
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <LogoMarquee />
      <Manifesto />
      <HowItWorks />
      <ProofRows />
      <Stack />
      <Teams />
      <Ticker />
      <ClosingCta />
    </main>
  );
}
