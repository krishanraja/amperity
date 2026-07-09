import type { Metadata } from "next";
import Link from "next/link";
import { Counter } from "@/components/motion/Counter";
import { CssHeadline } from "@/components/templates/CssHeadline";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons";
import { CustomerGrid } from "@/components/sections/CustomerGrid";
import { StoryArt } from "@/components/templates/StoryArt";
import { CtaBand } from "@/components/templates/Sections";
import { customerStories, featuredStorySlug } from "@/content/customers";
import { getStat } from "@/content/stats";

export const metadata: Metadata = {
  title: "Customer stories",
  description:
    "Proof, not promises. Named brands and real numbers, from identity resolution to activation.",
  openGraph: {
    title: "Customer stories",
    description: "Proof, not promises. Named brands and real numbers.",
    images: [{ url: "/og/customers.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/customers.png"] },
};

export default function CustomersIndexPage() {
  const featured = customerStories.find((s) => s.slug === featuredStorySlug)!;
  const featuredStat = getStat("seahawksFans");
  const secondStat = getStat("seahawksCleaner");
  const rest = customerStories.filter((s) => s.slug !== featuredStorySlug);

  return (
    <main id="main">
      {/* Featured hero */}
      <section className="relative overflow-hidden bg-gray-900 px-safe text-white">
        <StoryArt slug={featured.slug} variant="hero" className="absolute inset-0 h-full w-full opacity-70" />
        <div className="relative z-10 mx-auto max-w-site px-gutter pb-section-m pt-32 md:pt-40 lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-400">
            FEATURED &middot; {featured.industry.toUpperCase()}
          </p>
          <CssHeadline
            lines={["The fans hiding", "in the data."]}
            className="mt-6 max-w-headline font-display text-display font-medium"
          />
          <div className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <Counter
                value={featuredStat.value}
                suffix={featuredStat.suffix ?? ""}
                className="font-display text-h1 font-medium text-white"
              />
              <p className="mt-1 font-mono text-body-sm text-gray-400">{featuredStat.label}</p>
            </div>
            <div>
              <Counter
                value={secondStat.value}
                decimals={secondStat.decimals ?? 0}
                suffix={secondStat.suffix ?? ""}
                className="font-display text-h1 font-medium text-white"
              />
              <p className="mt-1 font-mono text-body-sm text-gray-400">{secondStat.label}</p>
            </div>
          </div>
          <div className="hero-fade hero-fade-2 mt-10">
            <Link
              href={`/customers/${featured.slug}`}
              className="group inline-flex min-h-12 items-center gap-2 rounded-pill bg-chartreuse px-8 text-body font-medium text-black transition duration-micro ease-out-quad hover:bg-white active:scale-98"
            >
              Read the Seahawks story
              <Icon name="arrow-right" size={16} className="transition-transform duration-micro ease-out-quad group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Filterable grid */}
      <section className="bg-white py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-500">ALL STORIES</p>
          <div className="mt-8">
            <CustomerGrid stories={rest} />
          </div>
        </div>
      </section>

      <CtaBand
        headlineLines={["Write your own", "proof point."]}
        subhead="See Amperity on your data, in your stack, with your team."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
