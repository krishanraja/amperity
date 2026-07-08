import { Reveal } from "@/components/motion/Reveal";
import { manifesto } from "@/content/home";

export function Manifesto() {
  return (
    <section className="grain relative bg-gray-900 py-section-lg-m text-white lg:py-section-lg">
      <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
        <div className="space-y-20 lg:space-y-24">
          {manifesto.beats.map((beat, i) => (
            <div key={i} className="grid gap-6 lg:grid-cols-12">
              <p className="font-mono text-eyebrow text-gray-500 lg:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </p>
              <Reveal
                lines={beat.lines}
                className={`font-display text-h2 font-medium lg:col-span-10 lg:text-h1 ${
                  i === manifesto.beats.length - 1 ? "text-white" : "text-gray-300"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
