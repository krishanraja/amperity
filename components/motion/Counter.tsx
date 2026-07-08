"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedOrSaveData } from "./hooks";

/**
 * Stats count up from 0 when scrolled into view, once, with tabular
 * numerals so width never jitters. The optional underline draws in with
 * the count.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  underline = false,
  durationSeconds = 1.2,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Thin chartreuse rule that draws in with the count. */
  underline?: boolean;
  durationSeconds?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);
  const ruleRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedOrSaveData();
  const done = useRef(false);

  const format = (v: number) =>
    `${prefix}${v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    if (reduced) {
      if (numRef.current) numRef.current.textContent = format(value);
      if (ruleRef.current) ruleRef.current.style.transform = "scaleX(1)";
      return;
    }
    const controls = animate(0, value, {
      duration: durationSeconds,
      ease: "easeOut",
      onUpdate: (v) => {
        if (numRef.current) numRef.current.textContent = format(v);
        if (ruleRef.current)
          ruleRef.current.style.transform = `scaleX(${Math.min(1, v / value)})`;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, decimals, prefix, suffix, durationSeconds]);

  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`}>
      <span ref={numRef} className="tabular-nums">
        {format(reduced ? value : 0)}
      </span>
      {underline && (
        <span
          ref={ruleRef}
          className="mt-2 block h-px w-full origin-left bg-chartreuse"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
