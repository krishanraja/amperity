"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easingArray, duration } from "@/styles/tokens";
import { useIsMobile, useReducedOrSaveData } from "./hooks";

const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

/**
 * Headline reveal: each line animates in with a masked y-translate and
 * fade, staggered 80ms per line. Pass explicit lines so hero headlines
 * never orphan a single word.
 */
export function Reveal({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedOrSaveData();
  const mobile = useIsMobile();
  const d = (mobile ? duration.revealMobile : duration.reveal) / 1000;

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block will-change-transform"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={VIEWPORT}
            transition={{
              duration: d,
              ease: easingArray.outExpo,
              delay: delay + i * 0.08,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Body copy fades up as a single block. */
export function RevealBlock({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedOrSaveData();
  const mobile = useIsMobile();
  const d = (mobile ? duration.revealMobile : duration.reveal) / 1000;

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: d, ease: easingArray.outExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
