import { glyphs, type IconName } from "./glyphs";

export type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  /** Meaningful icons get a title; decorative ones stay aria-hidden. */
  title?: string;
};

/**
 * Base icon: 24px grid, 1.75px stroke, rounded caps and joins. Color
 * comes from currentColor so icons follow text color; node dots can be
 * accented via [data-node] selectors.
 */
export function Icon({ name, size = 24, className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {glyphs[name]}
    </svg>
  );
}
