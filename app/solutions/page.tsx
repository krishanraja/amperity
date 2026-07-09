import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand } from "@/components/templates/Sections";
import { Card } from "@/components/ui/Card";
import { RevealBlock } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons";
import { functions } from "@/content/functions";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Trusted customer context for every function and every industry, plus a library of use cases.",
  openGraph: {
    title: "Solutions",
    description: "Trusted customer context for every function and every industry.",
    images: [{ url: "/og/platform.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/platform.png"] },
};

export default function SolutionsIndexPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="SOLUTIONS"
        headlineLines={["Trusted context,", "shaped to your work."]}
        subhead="The same resolved truth, put to work for the team you lead and the industry you compete in."
        primaryCta={{ label: "Explore use cases", href: "/solutions/use-cases" }}
        secondaryCta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />

      {/* Functions */}
      <section className="bg-white py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <h2 className="font-mono text-eyebrow uppercase text-gray-500">FUNCTIONS</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {Object.values(functions).map((fn, i) => (
              <RevealBlock key={fn.slug} delay={i * 0.06} className="h-full">
                <Card
                  href={`/solutions/departments/${fn.slug}`}
                  title={fn.metaTitle}
                  body={fn.subhead}
                  cta="Learn more"
                  icon={<Icon name={fn.icon} size={28} />}
                />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-gray-50 py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <h2 className="font-mono text-eyebrow uppercase text-gray-500">INDUSTRIES</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.values(industries).map((ind, i) => (
              <RevealBlock key={ind.slug} delay={i * 0.04} className="h-full">
                <Card
                  href={`/solutions/industries/${ind.slug}`}
                  eyebrow={ind.eyebrow}
                  title={ind.metaTitle}
                  body={ind.subhead}
                  cta="Explore"
                  className="bg-white"
                />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        headlineLines={["Not sure where", "to start?"]}
        subhead="Tell us your team and your data, and we will show you the fastest path to value."
        cta={{ label: "Talk to the team", href: "/contact-sales" }}
      />
    </main>
  );
}
