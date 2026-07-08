import { NodeField } from "@/components/motion/NodeField";
import { Reveal, RevealBlock } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { closing } from "@/content/home";

export function ClosingCta() {
  return (
    <section className="relative flex min-h-viewport items-center overflow-hidden bg-gray-900 text-white">
      <NodeField className="absolute inset-0 h-full w-full" density={0.8} seed={41} />
      <div className="relative z-10 mx-auto w-full max-w-site px-gutter py-section-m text-center lg:px-gutter-lg">
        <Reveal
          lines={closing.headlineLines}
          className="mx-auto font-display text-display font-medium"
        />
        <RevealBlock delay={0.25} className="mx-auto mt-8 max-w-measure">
          <p className="text-lead text-gray-300">{closing.subhead}</p>
        </RevealBlock>
        <RevealBlock delay={0.4} className="mt-10 flex justify-center">
          <Button href={closing.cta.href} magnetic arrow>
            {closing.cta.label}
          </Button>
        </RevealBlock>
      </div>
    </section>
  );
}
