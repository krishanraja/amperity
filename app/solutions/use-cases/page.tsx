import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand } from "@/components/templates/Sections";
import { UseCaseGrid } from "@/components/sections/UseCaseGrid";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "What trusted customer context makes possible, from activation to data readiness, filterable by industry and category.",
  openGraph: {
    title: "Use cases",
    description: "What trusted customer context makes possible.",
    images: [{ url: "/og/platform.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/platform.png"] },
};

export default function UseCasesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="USE CASES"
        headlineLines={["What the truth", "makes possible."]}
        subhead="From activation to data readiness, filter by industry and category to find the use cases that fit your team."
      />
      <section className="bg-white pb-section-m lg:pb-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <UseCaseGrid />
        </div>
      </section>
      <CtaBand
        headlineLines={["Bring us", "your use case."]}
        subhead="See any of these run on your data, in your stack, with your team."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
