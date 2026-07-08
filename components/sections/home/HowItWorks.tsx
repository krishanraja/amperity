import Link from "next/link";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { StickyChapter } from "@/components/motion/StickyChapter";
import { Icon } from "@/components/icons";
import { AmpAIExchange, JourneyBuilder, ResolutionView } from "@/components/product";
import { chapters } from "@/content/home";
import { getStat } from "@/content/stats";

const visuals = {
  resolve: <ResolutionView />,
  understand: <AmpAIExchange />,
  act: <JourneyBuilder />,
} as const;

export function HowItWorks() {
  return (
    <section className="bg-white py-section-m lg:py-section">
      <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
        <p className="font-mono text-eyebrow uppercase text-gray-500">HOW IT WORKS</p>
        <Reveal
          lines={["From fragments", "to trusted action."]}
          className="mt-6 max-w-measure font-display text-display font-medium text-gray-900"
        />
      </div>
      <div className="mt-16">
        <StickyChapter
          chapters={chapters.map((c) => {
            const stat = getStat(c.statId);
            return {
              id: c.id,
              eyebrow: `${c.number} / ${c.name}`,
              copy: (
                <div>
                  <p className="font-mono text-eyebrow uppercase text-gray-500">
                    {c.number} / {c.name}
                  </p>
                  <h3 className="mt-4 font-display text-h2 font-medium text-gray-900">
                    {c.headline}
                  </h3>
                  <p className="mt-6 text-body font-medium text-gray-900">{c.failure}</p>
                  <p className="mt-4 max-w-measure text-body text-gray-600">{c.answer}</p>
                  <p className="mt-8">
                    <Counter
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix ?? ""}
                      underline
                      className="font-display text-h1 font-medium text-gray-900"
                    />
                  </p>
                  <p className="mt-2 text-body-sm text-gray-600">
                    {stat.label}
                    <span className="text-gray-500"> &middot; {stat.customer}</span>
                  </p>
                  <Link
                    href={c.href}
                    className="group mt-8 inline-flex min-h-11 items-center gap-2 text-body font-medium text-gray-900 hover:text-black"
                  >
                    Explore
                    <Icon
                      name="arrow-right"
                      size={16}
                      className="transition-transform duration-micro ease-out-quad group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              ),
              visual: visuals[c.id as keyof typeof visuals],
            };
          })}
        />
      </div>
    </section>
  );
}
