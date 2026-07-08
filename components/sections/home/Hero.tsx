import { NodeField } from "@/components/motion/NodeField";
import { Reveal, RevealBlock } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/home";

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
      <div className="relative z-10 mx-auto w-full max-w-site px-gutter pb-20 pt-32 lg:px-gutter-lg">
        <p className="font-mono text-eyebrow uppercase text-gray-400">{hero.eyebrow}</p>
        <Reveal
          as="h1"
          lines={hero.headlineLinesMobile}
          className="mt-6 font-display text-display font-medium md:hidden"
        />
        <Reveal
          as="h1"
          lines={hero.headlineLines}
          className="mt-6 hidden font-display text-display-xl font-medium md:block"
        />
        <RevealBlock delay={0.3} className="mt-8 max-w-measure">
          <p className="text-lead text-gray-300">{hero.subhead}</p>
        </RevealBlock>
        <RevealBlock delay={0.45} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href={hero.primaryCta.href} magnetic arrow>
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary" tone="dark">
            {hero.secondaryCta.label}
          </Button>
        </RevealBlock>
      </div>
    </section>
  );
}
