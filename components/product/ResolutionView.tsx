"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easingArray } from "@/styles/tokens";
import { useReducedOrSaveData } from "@/components/motion/hooks";
import { Icon } from "@/components/icons";
import { ProductFrame } from "./Frame";

/**
 * Illustrative product moment: fragment records resolving into one
 * profile. A slow idle loop highlights each source record, absorbs it
 * into the profile card, then the AmpID confirms. All figures are
 * generic placeholders.
 */

const FRAGMENTS = [
  { source: "POS", name: "S. CHEN", detail: "card ending 4821", mobile: true },
  { source: "ECOMM", name: "Sarah Chen", detail: "s.chen@example.com", mobile: true },
  { source: "LOYALTY", name: "Sarah M. Chen", detail: "member 88213", mobile: true },
  { source: "SERVICE", name: "Chen, Sarah", detail: "+1 (206) 555-0114", mobile: false },
];

const FIELDS = [
  { label: "LIFETIME VALUE", value: "$4,820" },
  { label: "CHURN RISK", value: "Low" },
  { label: "CHANNELS", value: "In-store, web, app" },
];

const STEP_MS = 1600;
const STEPS = FRAGMENTS.length + 3; // absorb each row, then merge badge, AmpID, hold

export function ResolutionView({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedOrSaveData();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % (STEPS + 1)), STEP_MS);
    return () => clearInterval(id);
  }, [reduced, inView]);

  // Static final state under reduced motion
  const s = reduced ? STEPS : step;
  const merged = (i: number) => s > i;
  const showMergeBadge = s >= FRAGMENTS.length + 1;
  const showAmpId = s >= FRAGMENTS.length + 2;

  return (
    <div ref={ref} className={className}>
      <ProductFrame title="amperity / identity resolution">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Fragment records */}
          <div className="flex flex-col gap-2" aria-hidden="true">
            {FRAGMENTS.map((f, i) => (
              <motion.div
                key={f.source}
                animate={{
                  opacity: merged(i) ? 0.38 : 1,
                  x: merged(i) ? 10 : 0,
                }}
                transition={{ duration: 0.5, ease: easingArray.outExpo }}
                className={`items-center justify-between rounded-card border px-4 py-2 ${
                  f.mobile ? "flex" : "hidden md:flex"
                } ${merged(i) ? "border-gray-200" : "border-gray-300"}`}
              >
                <div className="min-w-0">
                  <p className="truncate text-body-sm font-medium">{f.name}</p>
                  <p className="truncate text-body-sm text-gray-500">{f.detail}</p>
                </div>
                <span className="ml-4 shrink-0 font-mono text-body-sm text-gray-500">
                  {f.source}
                </span>
              </motion.div>
            ))}
            <AnimatePresence>
              {showMergeBadge && (
                <motion.p
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: easingArray.outExpo }}
                  className="flex items-center gap-2 px-1 font-mono text-body-sm text-gray-600"
                >
                  <Icon name="check" size={14} className="text-chartreuse" />
                  {FRAGMENTS.length} duplicates resolved into one profile
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Assembled profile */}
          <div className="rounded-card bg-gray-900 p-6 text-white" aria-hidden="true">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-body-sm text-gray-400">CUSTOMER 360</p>
                <p className="mt-1 font-display text-h4 font-medium">Sarah Chen</p>
              </div>
              <AnimatePresence>
                {showAmpId && (
                  <motion.span
                    initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: easingArray.outExpo }}
                    className="flex shrink-0 items-center gap-2 rounded-pill bg-chartreuse px-4 py-px font-mono text-body-sm text-black"
                  >
                    <Icon name="check" size={13} />
                    AmpID am_7f3d92
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <dl className="mt-6 space-y-4">
              {FIELDS.map((f, i) => {
                const visible = reduced || s > i + 1;
                return (
                  <motion.div
                    key={f.label}
                    animate={{ opacity: visible ? 1 : 0.25 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-baseline justify-between gap-4 border-b border-gray-700 pb-2"
                  >
                    <dt className="font-mono text-body-sm text-gray-400">{f.label}</dt>
                    <dd className="text-body-sm font-medium">{visible ? f.value : "..."}</dd>
                  </motion.div>
                );
              })}
            </dl>
          </div>
        </div>
      </ProductFrame>
    </div>
  );
}
