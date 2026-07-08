"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { easingArray, duration } from "@/styles/tokens";
import { useIsMobile, useReducedOrSaveData } from "./hooks";

const VIEWPORT = { once: true, amount: 0.2 } as const;

/**
 * Headline reveal: each line animates in with a masked y-translate and
 * fade, staggered 80ms per line. One viewport observer on the container
 * drives every line, so lines can never be skipped individually. Pass
 * explicit lines so hero headlines never orphan a single word.
 */
export function Reveal({
  lines,
  as = "h2",
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
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
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

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };
  const line: Variants = {
    hidden: { y: 60, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: d, ease: easingArray.outExpo },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={container}
    >
      {lines.map((text, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span className="block will-change-transform" variants={line}>
            {text}
          </motion.span>
        </span>
      ))}
    </MotionTag>
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
