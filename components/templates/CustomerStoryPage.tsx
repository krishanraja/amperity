import Link from "next/link";
import { Counter } from "@/components/motion/Counter";
import { CssHeadline } from "./CssHeadline";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons";
import { CtaBand } from "./Sections";
import { StoryArt } from "./StoryArt";
import { getStat } from "@/content/stats";
import { customerStories, type CustomerStory } from "@/content/customers";

/**
 * Editorial customer-story layout. Tinted hero with seeded story art,
 * challenge in the customer's terms, giant mid-article counters, pull
 * quote, product chips linking back to platform pages, next-story
 * footer. Stubbed stories (no `full`) render a shorter version.
 */
export function CustomerStoryPage({ story }: { story: CustomerStory }) {
  const idx = customerStories.findIndex((s) => s.slug === story.slug);
  const next = customerStories[(idx + 1) % customerStories.length];
  const full = story.full;

  return (
    <main id="main">
      <section className="relative overflow-hidden bg-gray-900 px-safe text-white">
        <StoryArt slug={story.slug} variant="hero" className="absolute inset-0 h-full w-full opacity-70" />
        <div className="relative z-10 mx-auto max-w-site px-gutter pb-section-m pt-32 md:pt-40 lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-400">
            {story.industry.toUpperCase()}
          </p>
          <p className="mt-6 font-display text-h2 font-medium text-white">{story.name}</p>
          <CssHeadline
            lines={full ? full.headlineLines : [story.teaser]}
            className="mt-4 max-w-headline font-display text-display font-medium"
          />
        </div>
      </section>

      {full ? (
        <>
          {/* Challenge */}
          <section className="bg-white py-section-m lg:py-section">
            <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
              <p className="font-mono text-eyebrow uppercase text-gray-500">THE CHALLENGE</p>
              <div className="mt-8 max-w-measure space-y-6">
                {full.challenge.map((para, i) => (
                  <p key={i} className="text-lead text-gray-900">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Giant mid-article stats */}
          {full.statIds.length > 0 && (
            <section className="bg-gray-900 py-section-m text-white lg:py-section">
              <div className="mx-auto grid max-w-site gap-12 px-gutter sm:grid-cols-2 lg:px-gutter-lg">
                {full.statIds.map((id) => {
                  const stat = getStat(id);
                  return (
                    <div key={id}>
                      <Counter
                        value={stat.value}
                        decimals={stat.decimals ?? 0}
                        suffix={stat.suffix ?? ""}
                        underline
                        className="font-display text-display font-medium"
                      />
                      <p className="mt-4 text-body text-gray-300">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Pull quote */}
          {full.quote && (
            <section className="bg-white py-section-m lg:py-section">
              <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
                <blockquote className="max-w-3xl">
                  <p className="font-display text-h2 font-medium text-gray-900">
                    {full.quote.text}
                  </p>
                  <footer className="mt-6 font-mono text-body-sm text-gray-500">
                    {full.quote.name} &middot; {full.quote.role}
                  </footer>
                </blockquote>
              </div>
            </section>
          )}

          {/* What they used */}
          <section className="bg-gray-50 py-section-m lg:py-section">
            <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
              <p className="font-mono text-eyebrow uppercase text-gray-500">WHAT THEY USED</p>
              <div className="mt-8 flex flex-wrap gap-4">
                {full.products.map((p) => (
                  <Link
                    key={p.label}
                    href={p.href}
                    className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-gray-300 px-6 text-body-sm font-medium text-gray-900 transition-colors duration-micro ease-out-quad hover:border-gray-900"
                  >
                    {p.label}
                    <Icon name="arrow-up-right" size={14} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-white py-section-m lg:py-section">
          <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
            <p className="max-w-measure text-lead text-gray-900">{story.teaser}</p>
            <div className="mt-8">
              <Button href="/resources/demo/request" variant="secondary" arrow>
                Talk to the team about {story.industry.toLowerCase()}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Next story */}
      <section className="bg-white pb-section-m lg:pb-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <Link
            href={`/customers/${next.slug}`}
            className="group flex items-center justify-between gap-6 border-t border-gray-200 py-8"
          >
            <div>
              <p className="font-mono text-eyebrow uppercase text-gray-500">NEXT STORY</p>
              <p className="mt-2 font-display text-h3 font-medium text-gray-900">{next.name}</p>
            </div>
            <Icon
              name="arrow-right"
              size={24}
              className="shrink-0 text-gray-900 transition-transform duration-micro ease-out-quad group-hover:translate-x-1"
            />
          </Link>
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
