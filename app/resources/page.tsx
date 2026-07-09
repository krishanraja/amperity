import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand } from "@/components/templates/Sections";
import { ResourceGrid } from "@/components/sections/ResourceGrid";
import { resourcesHero } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: resourcesHero.subhead,
  openGraph: {
    title: "Resources",
    description: resourcesHero.subhead,
    images: [{ url: "/og/platform.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/platform.png"] },
};

export default function ResourcesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={resourcesHero.eyebrow}
        headlineLines={resourcesHero.headlineLines}
        subhead={resourcesHero.subhead}
      />
      <section className="bg-white pb-section-m lg:pb-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <ResourceGrid />
        </div>
      </section>
      <CtaBand
        headlineLines={["Ready to see", "it on your data?"]}
        subhead="Skip the reading. See Amperity on your data, in your stack, with your team."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
