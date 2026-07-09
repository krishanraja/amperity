import { Reveal, RevealBlock } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons";
import { PageHero } from "./PageHero";
import { CtaBand, PointsGrid, StatFeature } from "./Sections";
import type { FunctionData } from "@/content/functions";

/** Three function instances (marketing, analytics, it) of one template. */
export function FunctionPage({ data }: { data: FunctionData }) {
  return (
    <main id="main">
      <PageHero
        eyebrow={data.eyebrow}
        headlineLines={data.headlineLines}
        subhead={data.subhead}
        primaryCta={{ label: "Request a demo", href: "/resources/demo/request" }}
        secondaryCta={{ label: "See the platform", href: "/platform/customer-context-platform" }}
      />

      {/* The three pains */}
      <section className="bg-gray-50 py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-500">WHAT GOES WRONG</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.pains.map((pain, i) => (
              <RevealBlock key={pain.title} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-gray-200 bg-white p-8">
                  <p className="font-mono text-eyebrow uppercase text-gray-500">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-h4 font-medium text-gray-900">
                    {pain.title}
                  </h3>
                  <p className="mt-4 text-body text-gray-600">{pain.body}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <PointsGrid eyebrow="WHAT CHANGES" points={data.outcomes} />

      {data.featureStatId && <StatFeature statId={data.featureStatId} />}

      <CtaBand
        headlineLines={["Put the truth", "to work for your team."]}
        subhead="See Amperity on your data, in your stack, with your team."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
