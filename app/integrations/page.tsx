import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand } from "@/components/templates/Sections";
import { IntegrationGrid } from "@/components/sections/IntegrationGrid";
import { integrationsHero } from "@/content/integrations";

export const metadata: Metadata = {
  title: "Integrations",
  description: integrationsHero.subhead,
  openGraph: {
    title: "Context that travels everywhere your customer does.",
    description: integrationsHero.subhead,
    images: [{ url: "/og/platform.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/platform.png"] },
};

export default function IntegrationsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={integrationsHero.eyebrow}
        headlineLines={integrationsHero.headlineLines}
        subhead={integrationsHero.subhead}
        primaryCta={integrationsHero.primaryCta}
        secondaryCta={integrationsHero.secondaryCta}
      />
      <section className="bg-white pb-section-m lg:pb-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <IntegrationGrid />
        </div>
      </section>
      <CtaBand
        headlineLines={["Do not see", "your stack?"]}
        subhead="With 400+ connectors and counting, chances are it is already supported. Ask the team."
        cta={{ label: "Talk to the team", href: "/contact-sales" }}
      />
    </main>
  );
}
