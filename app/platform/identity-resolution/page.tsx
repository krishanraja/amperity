import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand, PointsGrid, StatFeature } from "@/components/templates/Sections";
import { NodeField } from "@/components/motion/NodeField";
import { Reveal } from "@/components/motion/Reveal";
import { identityPage } from "@/content/platform";

export const metadata: Metadata = {
  title: "Identity Resolution",
  description: identityPage.hero.subhead,
  openGraph: {
    title: "When identity is wrong, everything built on it is wrong.",
    description: identityPage.hero.subhead,
    images: [{ url: "/og/platform.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/platform.png"] },
};

export default function IdentityResolutionPage() {
  return (
    <main id="main">
      {/* Hero over the dense, annotated node field */}
      <section className="relative overflow-hidden bg-gray-900 px-safe text-white">
        <NodeField className="absolute inset-0 h-full w-full" density={2.2} seed={19} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 30% 50%, rgb(22 25 26 / 0.86), transparent 72%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-site px-gutter pb-section-m pt-32 md:pt-40 lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-400">{identityPage.hero.eyebrow}</p>
          <Reveal
            as="h1"
            lines={identityPage.hero.headlineLines}
            className="mt-6 max-w-headline font-display text-display font-medium"
          />
          <p className="mt-8 max-w-measure text-lead text-gray-300">{identityPage.hero.subhead}</p>
        </div>
      </section>

      <StatFeature statId={identityPage.featureStatId} dark={false} />

      <PointsGrid eyebrow="HOW RESOLUTION WORKS" points={identityPage.points} columns={2} />

      <CtaBand
        headlineLines={["Get identity right.", "Everything else follows."]}
        subhead="See resolution run on your data, in your stack, with your team."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
