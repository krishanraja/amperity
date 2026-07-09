import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand, PointsGrid, StatFeature } from "@/components/templates/Sections";
import { servicesPage } from "@/content/platform";
import { quotes } from "@/content/stats";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPage.hero.subhead,
  openGraph: {
    title: "Live in weeks, not quarters.",
    description: servicesPage.hero.subhead,
    images: [{ url: "/og/platform.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/platform.png"] },
};

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={servicesPage.hero.eyebrow}
        headlineLines={servicesPage.hero.headlineLines}
        subhead={servicesPage.hero.subhead}
        primaryCta={servicesPage.hero.primaryCta}
        secondaryCta={servicesPage.hero.secondaryCta}
      />

      {/* Lead with the Brooks proof */}
      <StatFeature statId={servicesPage.featureStatId} quote={quotes[servicesPage.featureQuoteId]} />

      <PointsGrid eyebrow="HOW WE GET YOU THERE" points={servicesPage.points} />

      <CtaBand
        headlineLines={["Start with a proof", "of concept."]}
        subhead="A working session on your data, your stack, and your team, scoped to prove value fast."
        cta={{ label: "Talk to the team", href: "/contact-sales" }}
      />
    </main>
  );
}
