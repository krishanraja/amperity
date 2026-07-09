import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  /** Set dark when the button sits on a dark section. */
  tone?: "light" | "dark";
  /** Primary CTAs get the magnetic pull and arrow nudge. */
  magnetic?: boolean;
  arrow?: boolean;
  /** Full-width when stacked on mobile, auto-width inline from sm up. */
  stretch?: boolean;
  className?: string;
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-8 py-2 text-body font-medium transition duration-micro ease-out-quad active:scale-98";

/**
 * The one button. Hover, active (scale 0.98 over 150ms), focus-visible
 * (global chartreuse ring), and disabled states are all defined here
 * and never re-decided per page.
 */
export function Button({
  href,
  children,
  variant = "primary",
  tone = "light",
  magnetic = false,
  arrow = false,
  stretch = false,
  className,
}: ButtonProps) {
  const stretchClass = stretch ? "w-full sm:w-auto" : "";
  const variants = {
    primary: "bg-chartreuse text-black hover:bg-white hover:shadow-card",
    secondary:
      tone === "dark"
        ? "border border-gray-500 text-white hover:border-white"
        : "border border-gray-300 text-gray-900 hover:border-gray-900",
    ghost:
      tone === "dark"
        ? "text-gray-100 hover:text-white"
        : "text-gray-700 hover:text-black",
  } as const;

  const inner = (
    <Link href={href} className={`${base} ${variants[variant]} ${stretchClass} ${className ?? ""}`}>
      {children}
      {arrow && (
        <Icon
          name="arrow-right"
          size={16}
          className="transition-transform duration-micro ease-out-quad group-hover:translate-x-1"
        />
      )}
    </Link>
  );

  return magnetic ? (
    <Magnetic className={stretch ? "block w-full sm:w-auto" : "inline-block"}>{inner}</Magnetic>
  ) : (
    inner
  );
}
