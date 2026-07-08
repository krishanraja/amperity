import { Marquee } from "@/components/motion/Marquee";
import { ticker } from "@/content/home";

export function Ticker() {
  return (
    <section className="border-y border-gray-200 bg-white py-10" aria-label="Editorial ticker">
      <Marquee seconds={30} trackClassName="gap-12 pr-12">
        <span className="flex shrink-0 items-center gap-12 font-display text-h2 font-medium tracking-tight text-gray-900">
          {ticker}
          <span className="inline-block h-2 w-2 rounded-pill bg-chartreuse" aria-hidden="true" />
        </span>
      </Marquee>
    </section>
  );
}
