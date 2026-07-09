import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand } from "@/components/templates/Sections";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/icons";
import { pricingHero, ampsPoints, whyUsage } from "@/content/pricing";
import { pricingFaq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description: pricingHero.subhead,
  openGraph: {
    title: "Pay for what you use. Get everything.",
    description: pricingHero.subhead,
    images: [{ url: "/og/pricing.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/pricing.png"] },
};

export default function PricingPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={pricingHero.eyebrow}
        headlineLines={pricingHero.headlineLines}
        subhead={pricingHero.subhead}
        primaryCta={pricingHero.primaryCta}
        secondaryCta={pricingHero.secondaryCta}
      />

      {/* The Amps model */}
      <section className="bg-gray-50 py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <h2 className="font-mono text-eyebrow uppercase text-gray-500">THE AMPS MODEL</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {ampsPoints.map((p) => (
              <div key={p.title} className="flex gap-6 rounded-card border border-gray-200 bg-white p-8">
                <Icon name={p.icon} size={28} className="shrink-0 text-gray-900" />
                <div>
                  <h3 className="font-display text-h4 font-medium text-gray-900">{p.title}</h3>
                  <p className="mt-2 text-body text-gray-600">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why usage-based */}
      <section className="bg-gray-900 py-section-m text-white lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-400">{whyUsage.eyebrow}</p>
          <Reveal
            lines={[whyUsage.headline]}
            className="mt-6 max-w-headline font-display text-h1 font-medium"
          />
          <p className="mt-8 max-w-measure text-lead text-gray-300">{whyUsage.body}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-500">QUESTIONS</p>
          <div className="mt-8 max-w-3xl">
            <Accordion items={pricingFaq} />
          </div>
        </div>
      </section>

      <CtaBand
        headlineLines={["Get an Amps estimate", "built on your use cases."]}
        subhead="Talk to the team with your use cases and volumes, and we will size it on what you actually plan to do."
        cta={{ label: "Talk to the team", href: "/contact-sales" }}
      />
    </main>
  );
}
