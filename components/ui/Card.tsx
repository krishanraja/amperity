import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

/**
 * The one card. Equal-height in a grid (h-full + flex column), CTA
 * bottom-aligned via mt-auto, 4px hover lift with the elevated shadow.
 */
export function Card({
  href,
  eyebrow,
  title,
  body,
  cta,
  icon,
  children,
  className,
}: {
  href?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const inner = (
    <>
      {icon && <div className="text-gray-900">{icon}</div>}
      {eyebrow && (
        <p className="font-mono text-eyebrow uppercase text-gray-500">{eyebrow}</p>
      )}
      <h3 className="mt-2 font-display text-h4 font-medium text-gray-900">{title}</h3>
      {body && <p className="mt-4 text-body text-gray-600">{body}</p>}
      {children}
      {cta && (
        <span className="mt-auto flex min-h-11 items-center gap-2 pt-8 text-body font-medium text-gray-900">
          {cta}
          <Icon
            name="arrow-right"
            size={16}
            className="transition-transform duration-micro ease-out-quad group-hover:translate-x-1"
          />
        </span>
      )}
    </>
  );

  const base =
    "group flex h-full flex-col rounded-card border border-gray-200 p-8 shadow-card";

  if (href) {
    return (
      <Link
        href={href}
        className={`${base} transition duration-ui ease-out-quad hover:-translate-y-1 hover:shadow-lift ${className ?? ""}`}
      >
        {inner}
      </Link>
    );
  }
  return <div className={`${base} ${className ?? ""}`}>{inner}</div>;
}
