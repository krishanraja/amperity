"use client";

import type { ReactNode } from "react";
import { useReducedOrSaveData } from "./hooks";

/**
 * Infinite horizontal loop: content is duplicated for seamlessness and
 * translated with a CSS transform animation. Pausable on hover. Under
 * reduced motion or Save-Data it renders a static row.
 */
export function Marquee({
  children,
  seconds = 36,
  reverse = false,
  className,
  trackClassName,
  ariaLabel,
}: {
  children: ReactNode;
  /** Seconds per full loop. */
  seconds?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
  ariaLabel?: string;
}) {
  const reduced = useReducedOrSaveData();

  if (reduced) {
    return (
      <div className={`overflow-hidden ${className ?? ""}`} aria-label={ariaLabel}>
        <div className={`flex w-max items-center ${trackClassName ?? ""}`}>{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`group overflow-hidden ${className ?? ""}`}
      aria-label={ariaLabel}
    >
      <div
        className="marquee-track flex w-max items-center will-change-transform"
        style={{
          animationDuration: `${seconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className={`flex w-max items-center ${trackClassName ?? ""}`}>{children}</div>
        <div className={`flex w-max items-center ${trackClassName ?? ""}`} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
