import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { CtaBand } from "@/components/templates/Sections";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons";
import { aboutHero, aboutFacts, aboutBody, recognition } from "@/content/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in 2016 in Seattle, Amperity helps people use data to serve the customer. A Leader in the IDC MarketScape for CDPs.",
  openGraph: {
    title: "About Amperity",
    description: "Founded in 2016 in Seattle to solve who the customer actually is.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.png"] },
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={aboutHero.eyebrow}
        headlineLines={aboutHero.headlineLines}
        subhead={aboutHero.subhead}
      />

      {/* Facts strip */}
      <section className="bg-gray-50 py-section-m lg:py-section">
        <div className="mx-auto grid max-w-site gap-6 px-gutter sm:grid-cols-2 lg:grid-cols-4 lg:px-gutter-lg">
          {aboutFacts.map((f) => (
            <div key={f.label} className="rounded-card border border-gray-200 bg-white p-8">
              <Icon name={f.icon} size={28} className="text-gray-900" />
              <p className="mt-6 font-mono text-eyebrow uppercase text-gray-500">{f.label}</p>
              <p className="mt-2 text-body font-medium text-gray-900">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission body */}
      <section className="bg-white py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-500">WHY WE EXIST</p>
          <div className="mt-8 max-w-measure space-y-6">
            {aboutBody.map((para, i) => (
              <p key={i} className="text-lead text-gray-900">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="grain relative bg-gray-900 py-section-m text-white lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-400">RECOGNITION</p>
          <Reveal
            lines={["Named a Leader,", "twice over."]}
            className="mt-6 max-w-headline font-display text-h1 font-medium"
          />
          <ul className="mt-10 space-y-4">
            {recognition.map((r) => (
              <li key={r} className="flex items-start gap-4 text-lead text-gray-300">
                <Icon name="check" size={22} className="mt-1 shrink-0 text-chartreuse" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        headlineLines={["Put the truth", "to work."]}
        subhead="See Amperity on your data, in your stack, with your team."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
