"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { easingArray } from "@/styles/tokens";
import type { FaqItem } from "@/content/faq";

/**
 * Accordion: animates height with ease-in-out-quart at 300ms, chevron
 * rotates in sync. Single-open. Each control carries aria-expanded.
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-h4 font-medium text-gray-900">
                  {item.q}
                </span>
                <Icon
                  name="chevron-down"
                  size={22}
                  className={`shrink-0 text-gray-500 transition-transform duration-ui ease-in-out-quart ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easingArray.inOutQuart }}
                  className="overflow-hidden"
                >
                  <p className="max-w-measure pb-6 text-body text-gray-600">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
