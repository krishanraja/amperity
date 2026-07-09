import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand, PointsGrid } from "@/components/templates/Sections";
import { Reveal } from "@/components/motion/Reveal";
import { AmpAIExchange } from "@/components/product";
import { McpDiagram } from "@/components/diagrams/Diagrams";
import { Icon } from "@/components/icons";
import { ampaiPage } from "@/content/platform";

export const metadata: Metadata = {
  title: "AmpAI",
  description: ampaiPage.hero.subhead,
  openGraph: {
    title: "AI that starts from the truth.",
    description: ampaiPage.hero.subhead,
    images: [{ url: "/og/platform.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/platform.png"] },
};

export default function AmpAIPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={ampaiPage.hero.eyebrow}
        headlineLines={ampaiPage.hero.headlineLines}
        subhead={ampaiPage.hero.subhead}
        primaryCta={ampaiPage.hero.primaryCta}
        secondaryCta={ampaiPage.hero.secondaryCta}
      />

      {/* The exchange */}
      <section className="bg-gray-50 py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <AmpAIExchange />
        </div>
      </section>

      <PointsGrid eyebrow="THE ASSISTANT" points={ampaiPage.assistant} columns={2} />

      {/* The agent story with the MCP diagram */}
      <section className="grain relative bg-gray-900 py-section-m text-white lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-400">FOR AGENTS</p>
          <Reveal
            lines={["One context layer,", "every agent."]}
            className="mt-6 max-w-headline font-display text-h1 font-medium"
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              {ampaiPage.agents.map((a) => (
                <div key={a.title} className="flex gap-6">
                  <Icon name={a.icon} size={28} className="shrink-0 text-chartreuse" />
                  <div>
                    <h3 className="font-display text-h4 font-medium">
                      {a.href ? (
                        <Link href={a.href} className="inline-flex items-center gap-2 hover:text-chartreuse" target="_blank" rel="noreferrer noopener">
                          {a.title}
                          <Icon name="arrow-up-right" size={16} />
                        </Link>
                      ) : (
                        a.title
                      )}
                    </h3>
                    <p className="mt-2 text-body text-gray-400">{a.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <McpDiagram className="w-full" />
          </div>
          <p className="mt-16 max-w-measure text-lead text-gray-300">{ampaiPage.honestLine}</p>
        </div>
      </section>

      <CtaBand
        headlineLines={["Point AI at the truth,", "not the mess."]}
        subhead="See AmpAI and the MCP Server on your data, in your stack, with your team."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
