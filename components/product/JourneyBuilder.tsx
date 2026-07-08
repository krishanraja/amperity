"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { chartreuse, gray } from "@/styles/tokens";
import { useReducedOrSaveData } from "@/components/motion/hooks";
import { Icon } from "@/components/icons";
import type { IconName } from "@/components/icons";
import { ProductFrame } from "./Frame";

/**
 * Illustrative product moment: a minimal node-graph of a live journey
 * with one branch highlighted. Enrollment figure is a generic
 * placeholder.
 */

function NodeCard({
  eyebrow,
  label,
  icon,
  live = false,
}: {
  eyebrow: string;
  label: string;
  icon: IconName;
  live?: boolean;
}) {
  return (
    <div
      className={`rounded-card border px-4 py-2 ${
        live ? "border-chartreuse" : "border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-body-sm text-gray-500">{eyebrow}</p>
        {live && (
          <span className="rounded-pill bg-chartreuse px-2 font-mono text-body-sm text-black">
            LIVE
          </span>
        )}
      </div>
      <p className="mt-1 flex items-center gap-2 text-body-sm font-medium">
        <Icon name={icon} size={18} className="shrink-0 text-gray-500" />
        {label}
      </p>
    </div>
  );
}

export function JourneyBuilder({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedOrSaveData();
  const animate = inView && !reduced;

  return (
    <div ref={ref} className={className}>
      <ProductFrame title="amperity / journeys">
        <div aria-hidden="true">
          {/* Desktop: horizontal graph */}
          <div className="hidden items-center gap-0 md:grid md:grid-cols-12">
            <div className="col-span-3">
              <NodeCard eyebrow="TRIGGER" label="Lapse risk above 70%" icon="prediction" />
            </div>
            {/* Connector with traveling pulse */}
            <div className="relative col-span-2 h-px bg-gray-300">
              {animate && (
                <motion.span
                  className="absolute top-0 h-2 w-2 -translate-y-1/2 rounded-pill bg-chartreuse"
                  animate={{ left: ["0%", "92%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
            <div className="col-span-2">
              <NodeCard eyebrow="WAIT" label="2 days" icon="realtime" />
            </div>
            {/* Branch curves */}
            <div className="col-span-1 self-stretch">
              <svg
                viewBox="0 0 56 200"
                preserveAspectRatio="none"
                className="h-full w-full"
                fill="none"
              >
                <motion.path
                  d="M0 100 C28 100 28 40 56 40"
                  stroke={chartreuse}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="6 5"
                  animate={animate ? { strokeDashoffset: [0, -22] } : undefined}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                />
                <path
                  d="M0 100 C28 100 28 160 56 160"
                  stroke={gray[300]}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="col-span-4 space-y-6">
              <NodeCard eyebrow="BRANCH / OPENED EMAIL" label="Personalized offer" icon="personalization" live />
              <NodeCard eyebrow="BRANCH / NO OPEN" label="Paid media audience" icon="paidmedia" />
            </div>
          </div>

          {/* Mobile: vertical graph, larger type, simple rules */}
          <div className="flex flex-col gap-2 md:hidden">
            <NodeCard eyebrow="TRIGGER" label="Lapse risk above 70%" icon="prediction" />
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <NodeCard eyebrow="WAIT" label="2 days" icon="realtime" />
            <div className="ml-6 h-6 w-px bg-chartreuse" />
            <NodeCard eyebrow="BRANCH / OPENED EMAIL" label="Personalized offer" icon="personalization" live />
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <NodeCard eyebrow="BRANCH / NO OPEN" label="Paid media audience" icon="paidmedia" />
          </div>

          <p className="mt-6 flex items-center gap-2 font-mono text-body-sm text-gray-500">
            <span className="inline-block h-2 w-2 rounded-pill bg-chartreuse" />
            1,204 customers enrolled today
          </p>
        </div>
      </ProductFrame>
    </div>
  );
}
