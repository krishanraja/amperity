"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easingArray } from "@/styles/tokens";
import { useReducedOrSaveData } from "@/components/motion/hooks";
import { Icon } from "@/components/icons";
import { ProductFrame } from "./Frame";

/**
 * Illustrative product moment: the AmpAI exchange. A natural-language
 * ask, a grounded answer with a segment count, and a create-journey
 * affordance. Segment count is a generic placeholder.
 */

const ASK = "Build a segment of high-value guests likely to lapse in 60 days.";

const CRITERIA = [
  "Lifetime value in the top decile",
  "Predicted churn probability above 0.7",
  "No stay in the last 90 days",
];

const STEP_MS = 1400;
const STEPS = 6; // typing, answer, criteria x3, affordance + hold

export function AmpAIExchange({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedOrSaveData();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = setInterval(() => setStep((v) => (v + 1) % (STEPS + 2)), STEP_MS);
    return () => clearInterval(id);
  }, [reduced, inView]);

  const s = reduced ? STEPS : step;

  return (
    <div ref={ref} className={className}>
      <ProductFrame title="amperity / ampai" dark>
        <div className="flex flex-col gap-4" aria-hidden="true">
          {/* The ask */}
          <div className="max-w-measure self-end rounded-card bg-gray-800 px-6 py-4">
            <p className="text-body-sm text-gray-100">{ASK}</p>
          </div>

          {/* The grounded answer */}
          <div className="rounded-card border border-gray-700 px-6 py-4">
            {s < 1 ? (
              <span className="font-mono text-body-sm text-gray-400">
                AmpAI is reading identity-resolved profiles
                <motion.span
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  {" "}
                  ...
                </motion.span>
              </span>
            ) : (
              <div>
                <p className="text-body-sm text-gray-100">
                  <span className="font-display text-h4 font-medium tabular-nums text-white">
                    12,482
                  </span>{" "}
                  customers match. Built on live profiles, not a stale export:
                </p>
                <ul className="mt-4 space-y-2">
                  {CRITERIA.map((c, i) => {
                    const visible = reduced || s > i + 1;
                    return (
                      <motion.li
                        key={c}
                        animate={{ opacity: visible ? 1 : 0.2, x: visible ? 0 : -6 }}
                        transition={{ duration: 0.4, ease: easingArray.outExpo }}
                        className="flex items-center gap-2 font-mono text-body-sm text-gray-300"
                      >
                        <Icon name="check" size={14} className="shrink-0 text-chartreuse" />
                        {c}
                      </motion.li>
                    );
                  })}
                </ul>
                <AnimatePresence>
                  {(reduced || s >= STEPS - 1) && (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: easingArray.outExpo }}
                      className="mt-6 flex flex-wrap items-center gap-4"
                    >
                      <span className="inline-flex items-center gap-2 rounded-pill bg-chartreuse px-6 py-2 text-body-sm font-medium text-black">
                        Create journey
                        <Icon name="arrow-right" size={14} />
                      </span>
                      <span className="font-mono text-body-sm text-gray-400">
                        governed fields only
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </ProductFrame>
    </div>
  );
}
