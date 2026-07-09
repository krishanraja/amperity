import { renderFieldSvg, seedFromSlug } from "@/lib/node-field.mjs";
import { chartreuse, gray, white } from "@/styles/tokens";

/**
 * Generative abstract header, seeded deterministically from a slug, so
 * every customer and industry gets a distinct-but-consistent node field
 * instead of photography. Restrained duotone: black base plus a single
 * desaturated tone, chartreuse reserved for resolved nodes. Rendered as
 * inline SVG (no image request), decorative.
 */
export function StoryArt({
  slug,
  className,
  duotone = gray[500],
}: {
  slug: string;
  className?: string;
  duotone?: string;
}) {
  const seed = seedFromSlug(slug);
  const svg = renderFieldSvg({
    width: 640,
    height: 360,
    seed,
    count: 84,
    clusterCount: 3,
    background: "none",
    dotColor: duotone,
    accentColor: chartreuse,
  });
  // Second, sparser layer in near-white for depth.
  const front = renderFieldSvg({
    width: 640,
    height: 360,
    seed: seed ^ 0x5bd1e995,
    count: 26,
    clusterCount: 1,
    background: "none",
    dotColor: white,
    accentColor: chartreuse,
    opacity: 0.7,
  });
  return (
    <div
      className={`pointer-events-none overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: svg.replace("</svg>", front.replace(/^<svg[^>]*>/, "").replace("</svg>", "") + "</svg>"),
      }}
    />
  );
}
