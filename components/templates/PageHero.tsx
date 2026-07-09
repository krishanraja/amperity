import { Reveal, RevealBlock } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

type Cta = { label: string; href: string };

/**
 * Standard top-of-page hero for every non-home route. Light by default,
 * dark variant for flagship pages. Reveal headline, subhead, and up to
 * two CTAs. Sits below the fixed header, so it carries top padding.
 */
export function PageHero({
  eyebrow,
  headlineLines,
  subhead,
  primaryCta,
  secondaryCta,
  dark = false,
  children,
}: {
  eyebrow: string;
  headlineLines: string[];
  subhead: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`${dark ? "grain relative bg-gray-900 text-white" : "bg-white text-gray-900"} px-safe`}
    >
      <div className="mx-auto max-w-site px-gutter pb-section-m pt-32 md:pt-40 lg:px-gutter-lg lg:pb-section">
        <p className={`font-mono text-eyebrow uppercase ${dark ? "text-gray-400" : "text-gray-500"}`}>
          {eyebrow}
        </p>
        <Reveal
          as="h1"
          lines={headlineLines}
          className="mt-6 max-w-headline font-display text-display font-medium"
        />
        <RevealBlock delay={0.2} className="mt-8 max-w-measure">
          <p className={`text-lead ${dark ? "text-gray-300" : "text-gray-600"}`}>{subhead}</p>
        </RevealBlock>
        {(primaryCta || secondaryCta) && (
          <RevealBlock delay={0.35} className="mt-10 flex flex-col gap-4 sm:flex-row">
            {primaryCta && (
              <Button href={primaryCta.href} magnetic arrow tone={dark ? "dark" : "light"}>
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="secondary" tone={dark ? "dark" : "light"}>
                {secondaryCta.label}
              </Button>
            )}
          </RevealBlock>
        )}
        {children}
      </div>
    </section>
  );
}
