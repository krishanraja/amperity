import Link from "next/link";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons";
import { stack } from "@/content/home";

export function Stack() {
  return (
    <section className="grain relative bg-gray-900 py-section-m text-white lg:py-section">
      <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
        <p className="font-mono text-eyebrow uppercase text-gray-400">{stack.eyebrow}</p>
        <Reveal
          lines={stack.headlineLines}
          className="mt-6 font-display text-display font-medium"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {stack.items.map((item) => (
            <div key={item.title} className="rounded-card border border-gray-700 p-8">
              <Icon name={item.icon} size={28} className="text-chartreuse" />
              <h3 className="mt-6 font-mono text-body font-medium uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="mt-4 text-body-sm leading-relaxed text-gray-400">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
      <Marquee className="mt-20" seconds={40} reverse ariaLabel="Integration partners" trackClassName="gap-6 pr-6">
        {stack.integrations.map((name) => (
          <span
            key={name}
            className="shrink-0 rounded-pill border border-gray-700 px-6 py-2 font-mono text-body-sm text-gray-300"
          >
            {name}
          </span>
        ))}
      </Marquee>
      <div className="mx-auto mt-12 max-w-site px-gutter lg:px-gutter-lg">
        <Link
          href={stack.integrationsCta.href}
          className="group inline-flex min-h-11 items-center gap-2 text-body font-medium text-white"
        >
          {stack.integrationsCta.label}
          <Icon
            name="arrow-right"
            size={16}
            className="transition-transform duration-micro ease-out-quad group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
