import Image from "next/image";
import { Marquee } from "@/components/motion/Marquee";
import { logoTrain } from "@/content/customers";
import { logoCaption } from "@/content/home";

export function LogoMarquee() {
  return (
    <section className="border-b border-gray-100 bg-white py-16">
      <p className="text-center font-mono text-eyebrow uppercase text-gray-500">
        {logoCaption}
      </p>
      <Marquee
        className="mt-10"
        seconds={44}
        ariaLabel="Customer logos"
        trackClassName="gap-16 pr-16"
      >
        {logoTrain.map((logo) =>
          logo.src ? (
            <Image
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              width={168}
              height={56}
              className="w-auto shrink-0 opacity-60 brightness-0"
              style={{ height: logo.h ?? 48 }}
            />
          ) : (
            <span
              key={logo.name}
              className="shrink-0 font-display text-h4 font-medium tracking-tight text-gray-800 opacity-70"
            >
              {logo.name}
            </span>
          ),
        )}
      </Marquee>
    </section>
  );
}
