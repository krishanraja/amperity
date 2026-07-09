import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand } from "@/components/templates/Sections";
import { careersHero, values, offices } from "@/content/company";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build the trustworthy customer foundation every brand and every agent needs. Offices in Seattle, New York, London, and Melbourne.",
  openGraph: {
    title: "Careers at Amperity",
    description: "Build the layer AI runs on.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.png"] },
};

export default function CareersPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={careersHero.eyebrow}
        headlineLines={careersHero.headlineLines}
        subhead={careersHero.subhead}
      />

      {/* Values */}
      <section className="bg-gray-50 py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <h2 className="font-mono text-eyebrow uppercase text-gray-500">HOW WE WORK</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-card border border-gray-200 bg-white p-8">
                <h3 className="font-display text-h4 font-medium text-gray-900">{v.title}</h3>
                <p className="mt-4 text-body text-gray-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles shell */}
      <section className="bg-white py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-500">OPEN ROLES</p>
          <p className="mt-6 max-w-measure text-lead text-gray-900">
            We hire across engineering, data science, product, and go-to-market,
            in {offices.slice(0, -1).join(", ")}, and {offices.at(-1)}.
          </p>
          <a
            href="https://amperity.com/careers"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-pill bg-chartreuse px-8 text-body font-medium text-black transition duration-micro ease-out-quad hover:bg-gray-900 hover:text-white active:scale-98"
          >
            See open roles
          </a>
        </div>
      </section>

      <CtaBand
        headlineLines={["Rather see", "the product?"]}
        subhead="See Amperity on your data, in your stack, with your team."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
