import { Reveal, RevealBlock } from "@/components/motion/Reveal";
import { DemoForm } from "@/components/ui/DemoForm";
import { Icon } from "@/components/icons";

/** Shared layout for /contact-sales and /resources/demo/request. */
export function ConversionPage({
  eyebrow,
  headlineLines,
  subhead,
  reassurance,
  bullets,
}: {
  eyebrow: string;
  headlineLines: string[];
  subhead: string;
  reassurance: string;
  bullets: string[];
}) {
  return (
    <main id="main">
      <section className="bg-white px-safe">
        <div className="mx-auto grid max-w-site gap-12 px-gutter pb-section-m pt-32 md:pt-40 lg:grid-cols-2 lg:gap-24 lg:px-gutter-lg lg:pb-section">
          <div>
            <p className="font-mono text-eyebrow uppercase text-gray-500">{eyebrow}</p>
            <Reveal
              as="h1"
              lines={headlineLines}
              className="mt-6 max-w-headline font-display text-display font-medium text-gray-900"
            />
            <RevealBlock delay={0.2} className="mt-8 max-w-measure">
              <p className="text-lead text-gray-600">{subhead}</p>
            </RevealBlock>
            <ul className="mt-10 space-y-4">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-4 text-body text-gray-900">
                  <Icon name="check" size={20} className="mt-1 shrink-0 text-chartreuse" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <DemoForm reassurance={reassurance} />
          </div>
        </div>
      </section>
    </main>
  );
}
