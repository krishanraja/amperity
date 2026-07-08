import Link from "next/link";
import { Reveal, RevealBlock } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons";
import { teams } from "@/content/home";

export function Teams() {
  return (
    <section className="bg-white py-section-m lg:py-section">
      <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
        <p className="font-mono text-eyebrow uppercase text-gray-500">{teams.eyebrow}</p>
        <Reveal
          lines={[teams.headline]}
          className="mt-6 font-display text-display font-medium text-gray-900"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {teams.cards.map((card, i) => (
            <RevealBlock key={card.title} delay={i * 0.08} className="h-full">
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-card border border-gray-200 p-8 shadow-card transition duration-ui ease-out-quad hover:-translate-y-1 hover:shadow-lift"
              >
                <Icon name={card.icon} size={28} className="text-gray-900" />
                <h3 className="mt-6 font-display text-h3 font-medium text-gray-900">
                  {card.title}
                </h3>
                <p className="mt-4 text-body text-gray-600">{card.body}</p>
                <span className="mt-auto flex min-h-11 items-center gap-2 pt-8 text-body font-medium text-gray-900">
                  Learn more
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="transition-transform duration-micro ease-out-quad group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
