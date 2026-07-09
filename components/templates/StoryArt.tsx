import { renderFieldSvg, seedFromSlug } from "@/lib/node-field.mjs";
import { chartreuse, gray, white } from "@/styles/tokens";

/**
 * Generative abstract header, seeded deterministically from a slug, so
 * every customer and industry gets a distinct-but-consistent node field
 * instead of photography. Restrained duotone: black base plus a single
 * desaturated tone, chartreuse reserved for resolved nodes. Rendered as
 * inline SVG (no image request), decorative.
 *
 * `variant="hero"` keeps the node count low so a full-bleed hero
 * background stays cheap to parse and render (LCP-safe on throttled
 * mobile). `variant="card"` is denser for the smaller card headers.
 */
export function StoryArt({
  slug,
  className,
  duotone = gray[500],
  variant = "card",
}: {
  slug: string;
  className?: string;
  duotone?: string;
  variant?: "hero" | "card";
}) {
  const seed = seedFromSlug(slug);
  const isHero = variant === "hero";
  const base = renderFieldSvg({
    width: 640,
    height: 360,
    seed,
    count: isHero ? 26 : 30,
    clusterCount: 2,
    background: "none",
    dotColor: duotone,
    accentColor: chartreuse,
  });
  // Cards get a second, sparser near-white layer for depth. Heroes skip
  // it: the field sits behind text and does not need the extra pass.
  const front = isHero
    ? ""
    : renderFieldSvg({
        width: 640,
        height: 360,
        seed: seed ^ 0x5bd1e995,
        count: 10,
        clusterCount: 1,
        background: "none",
        dotColor: white,
        accentColor: chartreuse,
        opacity: 0.7,
      });
  const html = front
    ? base.replace("</svg>", front.replace(/^<svg[^>]*>/, "").replace("</svg>", "") + "</svg>")
    : base;
  return (
    <div
      className={`pointer-events-none overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
