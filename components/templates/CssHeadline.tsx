/**
 * CSS-driven masked line reveal for above-the-fold hero headlines. Uses
 * the .hero-line animation in globals.css, so it paints at first render
 * (no hydration wait, no LCP tax) while keeping the staggered entrance.
 * Server component: no client JS.
 */
export function CssHeadline({
  as: Tag = "h1",
  lines,
  className,
}: {
  as?: "h1" | "h2";
  lines: string[];
  className?: string;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="hero-line">
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
