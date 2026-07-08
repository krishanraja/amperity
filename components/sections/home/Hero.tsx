import { NodeField } from "@/components/motion/NodeField";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/home";

/**
 * The hero entrance is CSS-driven (see .hero-line in globals.css) so the
 * reveal begins at first paint rather than after hydration: the same
 * masked line motion, without the LCP tax.
 */
function HeroHeadline({ lines, className }: { lines: string[]; className: string }) {
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span key={i} className="hero-line">
          <span>{line}</span>
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-viewport items-center overflow-hidden bg-gray-900 text-white">
      <NodeField className="absolute inset-0 h-full w-full" density={1.1} seed={7} />
      {/* Soft vignette so the display type always clears WCAG contrast */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 35% 55%, rgb(22 25 26 / 0.85), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-site px-gutter pb-20 pt-24 md:pt-32 lg:px-gutter-lg">
        <p className="font-mono text-eyebrow uppercase text-gray-400">{hero.eyebrow}</p>
        <HeroHeadline
          lines={hero.headlineLinesMobile}
          className="mt-4 font-display text-display font-medium md:hidden"
        />
        <HeroHeadline
          lines={hero.headlineLines}
          className="mt-6 hidden font-display text-display-xl font-medium md:block"
        />
        <div className="hero-fade hero-fade-1 mt-6 max-w-measure md:mt-8">
          <p className="text-body text-gray-300 md:text-lead">{hero.subhead}</p>
        </div>
        <div className="hero-fade hero-fade-2 mt-8 flex flex-col gap-4 sm:flex-row md:mt-10">
          <Button href={hero.primaryCta.href} magnetic arrow>
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary" tone="dark">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
