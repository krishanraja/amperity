import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand, PointsGrid } from "@/components/templates/Sections";
import { ResolutionView } from "@/components/product";
import { amp360Page } from "@/content/platform";

export const metadata: Metadata = {
  title: "Customer 360",
  description: amp360Page.hero.subhead,
  openGraph: {
    title: "One customer, one history, curated for every team.",
    description: amp360Page.hero.subhead,
    images: [{ url: "/og/platform.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/platform.png"] },
};

export default function Amp360Page() {
  return (
    <main id="main">
      <PageHero
        eyebrow={amp360Page.hero.eyebrow}
        headlineLines={amp360Page.hero.headlineLines}
        subhead={amp360Page.hero.subhead}
        primaryCta={amp360Page.hero.primaryCta}
        secondaryCta={amp360Page.hero.secondaryCta}
      />

      {/* The resolution view carries the product credibility */}
      <section className="bg-gray-50 py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <ResolutionView />
        </div>
      </section>

      <PointsGrid eyebrow="WHAT IT INCLUDES" points={amp360Page.points} />

      <CtaBand
        headlineLines={["One history,", "every team."]}
        subhead="See Customer 360 on your data, in your stack, with your team."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
