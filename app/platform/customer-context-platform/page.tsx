import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CapabilityList, CtaBand, StatFeature } from "@/components/templates/Sections";
import { Reveal } from "@/components/motion/Reveal";
import { overviewHero, overviewChapters, overviewClose } from "@/content/platform";
import { quotes } from "@/content/stats";

export const metadata: Metadata = {
  title: "Customer Context Platform",
  description: overviewHero.subhead,
  openGraph: {
    title: "Customer data platforms unified your data. We built what comes next.",
    description: overviewHero.subhead,
    images: [{ url: "/og/platform.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/platform.png"] },
};

export default function PlatformOverviewPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={overviewHero.eyebrow}
        headlineLines={overviewHero.headlineLines}
        subhead={overviewHero.subhead}
        primaryCta={overviewHero.primaryCta}
        secondaryCta={overviewHero.secondaryCta}
      />

      {overviewChapters.map((chapter) => (
        <section
          key={chapter.number}
          className="border-t border-gray-200 bg-white py-section-m lg:py-section"
        >
          <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-eyebrow uppercase text-gray-500">
                  {chapter.eyebrow}
                </p>
                <Reveal
                  lines={[chapter.title]}
                  className="mt-4 font-display text-h1 font-medium text-gray-900"
                />
              </div>
              <div className="lg:col-span-8">
                <CapabilityList capabilities={chapter.capabilities} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <StatFeature statId={overviewClose.statId} quote={quotes[overviewClose.quoteId]} />

      <CtaBand
        headlineLines={["See the platform", "on your data."]}
        subhead="A working session on your systems and your customers, not a scripted tour."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
