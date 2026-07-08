import Link from "next/link";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealBlock } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons";
import { proofRows } from "@/content/customers";
import { getStat } from "@/content/stats";

export function ProofRows() {
  return (
    <section className="bg-white py-section-m lg:py-section">
      <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
        <p className="font-mono text-eyebrow uppercase text-gray-500">PROOF</p>
        <Reveal
          lines={["What happens when", "identity is right."]}
          className="mt-6 font-display text-display font-medium text-gray-900"
        />
        <div className="mt-16 border-t border-gray-200">
          {proofRows.map((row, i) => {
            const stat = getStat(row.statId);
            const reverse = i % 2 === 1;
            return (
              <RevealBlock key={row.slug}>
                <Link
                  href={`/customers/${row.slug}`}
                  className="group grid items-center gap-6 border-b border-gray-200 py-12 transition-colors duration-ui ease-out-quad hover:bg-gray-50 lg:grid-cols-2 lg:gap-24 lg:py-16"
                >
                  <div className={reverse ? "lg:order-2" : ""}>
                    <Counter
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix ?? ""}
                      underline
                      className="font-display text-display font-medium text-gray-900"
                    />
                    <p className="mt-4 text-body text-gray-600">{stat.label}</p>
                  </div>
                  <div className={reverse ? "lg:order-1" : ""}>
                    <p className="font-mono text-eyebrow uppercase text-gray-500">
                      {row.customer}
                    </p>
                    <p className="mt-4 max-w-measure text-lead text-gray-900">
                      {row.narrative}
                    </p>
                    <span className="mt-6 inline-flex min-h-11 items-center gap-2 text-body font-medium text-gray-900">
                      Read the story
                      <Icon
                        name="arrow-right"
                        size={16}
                        className="transition-transform duration-micro ease-out-quad group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}
