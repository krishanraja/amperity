import Link from "next/link";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealBlock } from "@/components/motion/Reveal";
import { CssHeadline } from "./CssHeadline";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/icons";
import { CtaBand } from "./Sections";
import { StoryArt } from "./StoryArt";
import { getStat } from "@/content/stats";
import { customerStories } from "@/content/customers";
import type { IndustryData } from "@/content/industries";

/**
 * One template, seven industry instances. Hero with a named customer,
 * the three fragmented systems in the industry's own vocabulary, three
 * use-case blocks, one customer feature, an industry FAQ, demo CTA.
 */
export function IndustryPage({ data }: { data: IndustryData }) {
  const stat = getStat(data.featuredStatId);
  const story = data.storySlug
    ? customerStories.find((s) => s.slug === data.storySlug)
    : undefined;

  return (
    <main id="main">
      {/* Hero with seeded story art */}
      <section className="relative overflow-hidden bg-gray-900 px-safe text-white">
        <StoryArt slug={`industry-${data.slug}`} variant="hero" className="absolute inset-0 h-full w-full opacity-70" />
        <div className="relative z-10 mx-auto max-w-site px-gutter pb-section-m pt-32 md:pt-40 lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-400">{data.eyebrow}</p>
          <CssHeadline
            lines={data.headlineLines}
            className="mt-6 max-w-headline font-display text-display font-medium"
          />
          <div className="hero-fade hero-fade-1 mt-8 max-w-measure">
            <p className="text-lead text-gray-300">{data.subhead}</p>
          </div>
          {data.featuredCustomer && (
            <div className="mt-8 flex items-baseline gap-4">
              <Counter
                value={stat.value}
                decimals={stat.decimals ?? 0}
                suffix={stat.suffix ?? ""}
                className="font-display text-h1 font-medium text-white"
              />
              <span className="font-mono text-body-sm text-gray-400">
                {stat.label} &middot; {data.featuredCustomer}
              </span>
            </div>
          )}
          <div className="hero-fade hero-fade-2 mt-10">
            <Button href="/resources/demo/request" magnetic arrow>
              Request a demo
            </Button>
          </div>
        </div>
      </section>

      {/* The three fragmented systems */}
      <section className="bg-white py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-500">THE FRAGMENTED PICTURE</p>
          <Reveal
            lines={["Three systems.", "One customer, split apart."]}
            className="mt-6 max-w-headline font-display text-h1 font-medium text-gray-900"
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {data.systems.map((sys) => (
              <div key={sys.abbr} className="rounded-card border border-gray-200 p-8">
                <p className="font-mono text-h4 text-gray-900">{sys.abbr}</p>
                <p className="mt-4 text-body font-medium text-gray-900">{sys.name}</p>
                <p className="mt-1 text-body-sm text-gray-500">{sys.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three use cases */}
      <section className="bg-gray-50 py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-500">WHAT CHANGES</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.useCases.map((uc, i) => (
              <RevealBlock key={uc.title} delay={i * 0.06} className="h-full">
                <Card title={uc.title} body={uc.body} className="bg-white" />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Customer feature */}
      {story && (
        <section className="bg-white py-section-m lg:py-section">
          <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
            <Link
              href={`/customers/${story.slug}`}
              className="group grid items-center gap-12 rounded-card border border-gray-200 p-8 shadow-card transition duration-ui ease-out-quad hover:shadow-lift lg:grid-cols-2 lg:p-12"
            >
              <div>
                <p className="font-mono text-eyebrow uppercase text-gray-500">CUSTOMER STORY</p>
                <p className="mt-4 font-display text-h2 font-medium text-gray-900">{story.name}</p>
                <p className="mt-4 max-w-measure text-body text-gray-600">{story.teaser}</p>
                <span className="mt-6 inline-flex min-h-11 items-center gap-2 text-body font-medium text-gray-900">
                  Read the story
                  <Icon name="arrow-right" size={16} className="transition-transform duration-micro ease-out-quad group-hover:translate-x-1" />
                </span>
              </div>
              <StoryArt slug={story.slug} className="hidden h-full min-h-56 rounded-card bg-gray-900 lg:block" />
            </Link>
          </div>
        </section>
      )}

      {/* Industry FAQ */}
      <section className="bg-white py-section-m lg:py-section">
        <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
          <p className="font-mono text-eyebrow uppercase text-gray-500">QUESTIONS</p>
          <div className="mt-8 max-w-3xl">
            <Accordion items={data.faq} />
          </div>
        </div>
      </section>

      <CtaBand
        headlineLines={["See it on your data,", "in your stack."]}
        subhead="A working session on your systems and your customers, not a scripted tour."
        cta={{ label: "Request a demo", href: "/resources/demo/request" }}
      />
    </main>
  );
}
