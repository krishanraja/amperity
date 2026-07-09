import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealBlock } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/icons";
import { getStat, type StatId } from "@/content/stats";

/** A closing CTA band, reused at the foot of most pages. */
export function CtaBand({
  headlineLines,
  subhead,
  cta,
}: {
  headlineLines: string[];
  subhead: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="grain relative bg-gray-900 py-section-m text-white lg:py-section">
      <div className="mx-auto max-w-site px-gutter text-center lg:px-gutter-lg">
        <Reveal lines={headlineLines} className="mx-auto font-display text-h1 font-medium" />
        <RevealBlock delay={0.2} className="mx-auto mt-6 max-w-measure">
          <p className="text-lead text-gray-300">{subhead}</p>
        </RevealBlock>
        <RevealBlock delay={0.35} className="mt-10 flex justify-center">
          <Button href={cta.href} magnetic arrow>
            {cta.label}
          </Button>
        </RevealBlock>
      </div>
    </section>
  );
}

/** A grid of icon + title + body points. */
export function PointsGrid({
  eyebrow,
  headline,
  points,
  columns = 3,
}: {
  eyebrow?: string;
  headline?: string;
  points: { icon: IconName; title: string; body: string }[];
  columns?: 2 | 3;
}) {
  return (
    <section className="bg-white py-section-m lg:py-section">
      <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
        {eyebrow && <p className="font-mono text-eyebrow uppercase text-gray-500">{eyebrow}</p>}
        {headline && (
          <Reveal
            lines={[headline]}
            className="mt-6 max-w-headline font-display text-h1 font-medium text-gray-900"
          />
        )}
        <div
          className={`mt-16 grid gap-6 ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}
        >
          {points.map((p, i) => (
            <RevealBlock key={p.title} delay={i * 0.06} className="h-full">
              <Card
                title={p.title}
                body={p.body}
                icon={<Icon name={p.icon} size={28} />}
              />
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A single large stat feature, optionally with a quote. */
export function StatFeature({
  statId,
  quote,
  dark = true,
}: {
  statId: StatId;
  quote?: { text: string; name: string; role: string };
  dark?: boolean;
}) {
  const stat = getStat(statId);
  return (
    <section
      className={`${dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} py-section-m lg:py-section`}
    >
      <div className="mx-auto grid max-w-site gap-12 px-gutter lg:grid-cols-2 lg:items-center lg:px-gutter-lg">
        <div>
          <Counter
            value={stat.value}
            decimals={stat.decimals ?? 0}
            suffix={stat.suffix ?? ""}
            underline
            className="font-display text-display-xl font-medium"
          />
          <p className={`mt-4 text-lead ${dark ? "text-gray-300" : "text-gray-600"}`}>
            {stat.label}
          </p>
          <p className={`mt-1 font-mono text-body-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
            {stat.customer}
          </p>
        </div>
        {quote && (
          <blockquote>
            <p className="font-display text-h3 font-medium">{quote.text}</p>
            <footer className={`mt-6 font-mono text-body-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
              {quote.name} &middot; {quote.role}
            </footer>
          </blockquote>
        )}
      </div>
    </section>
  );
}

/** Failure-mode-first capability list with numbered rows. */
export function CapabilityList({
  capabilities,
}: {
  capabilities: { name: string; icon: IconName; failure: string; answer: string }[];
}) {
  return (
    <div className="border-t border-gray-200">
      {capabilities.map((c) => (
        <RevealBlock key={c.name}>
          <div className="grid gap-6 border-b border-gray-200 py-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Icon name={c.icon} size={28} className="text-gray-900" />
              <h3 className="mt-4 font-display text-h3 font-medium text-gray-900">{c.name}</h3>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lead text-gray-900">{c.failure}</p>
              <p className="mt-4 max-w-measure text-body text-gray-600">{c.answer}</p>
            </div>
          </div>
        </RevealBlock>
      ))}
    </div>
  );
}
