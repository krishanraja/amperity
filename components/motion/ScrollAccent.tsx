"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { chartreuse } from "@/styles/tokens";
import { useReducedOrSaveData } from "./hooks";

/**
 * Thin rule with node terminals that draws in mapped to scroll progress
 * (scrubbed, reverses when scrolling back). The section-divider accent.
 */
export function DrawnRule({
  className,
  color = chartreuse,
}: {
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedOrSaveData();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 55%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <svg
      ref={ref as unknown as React.Ref<SVGSVGElement>}
      className={className}
      viewBox="0 0 800 8"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.line
        x1="8"
        y1="4"
        x2="792"
        y2="4"
        stroke={color}
        strokeWidth="1.5"
        style={reduced ? undefined : { pathLength }}
      />
      <motion.circle
        cx="8"
        cy="4"
        r="3"
        fill={color}
        style={reduced ? undefined : { opacity: dotOpacity }}
      />
      <motion.circle
        cx="792"
        cy="4"
        r="3"
        fill={color}
        style={reduced ? undefined : { opacity: dotOpacity }}
      />
    </svg>
  );
}

/**
 * Scrubbed vertical progress rule for stacked mobile chapters: fills as
 * the chapter scrolls through the viewport.
 */
export function ProgressRule({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedOrSaveData();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  return (
    <div ref={ref} className={`relative w-px self-stretch bg-gray-200 ${className ?? ""}`} aria-hidden="true">
      <motion.div
        className="absolute inset-x-0 top-0 origin-top bg-chartreuse"
        style={{ height: "100%", scaleY: reduced ? 1 : scrollYProgress }}
      />
    </div>
  );
}
