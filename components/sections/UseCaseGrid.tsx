"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FilterChips } from "@/components/ui/FilterChips";
import { Icon } from "@/components/icons";
import { easingArray } from "@/styles/tokens";
import {
  useCases,
  useCaseCategories,
  useCaseIndustries,
} from "@/content/useCases";

/** Use-case library: filter by category and industry, animated reflow. */
export function UseCaseGrid() {
  const [category, setCategory] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);

  const filtered = useCases.filter(
    (uc) =>
      (!category || uc.category === category) &&
      (!industry || uc.industries.includes(industry as never)),
  );

  return (
    <div>
      <div className="space-y-4">
        <div>
          <p className="mb-2 font-mono text-eyebrow uppercase text-gray-500">Category</p>
          <FilterChips options={useCaseCategories} active={category} onChange={setCategory} />
        </div>
        <div>
          <p className="mb-2 font-mono text-eyebrow uppercase text-gray-500">Industry</p>
          <FilterChips options={useCaseIndustries} active={industry} onChange={setIndustry} />
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((uc) => (
          <motion.div
            key={uc.slug}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easingArray.outExpo }}
            className="flex h-full flex-col rounded-card border border-gray-200 p-8 shadow-card"
          >
            <Icon name={uc.icon} size={28} className="text-gray-900" />
            <p className="mt-6 font-mono text-eyebrow uppercase text-gray-500">{uc.category}</p>
            <h3 className="mt-2 font-display text-h4 font-medium text-gray-900">{uc.title}</h3>
            <p className="mt-4 text-body text-gray-600">{uc.body}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {uc.industries.map((ind) => (
                <span
                  key={ind}
                  className="rounded-pill border border-gray-200 px-4 py-px font-mono text-body-sm text-gray-500"
                >
                  {ind}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 flex items-center gap-2 font-mono text-body-sm text-gray-500">
          <Icon name="search" size={16} />
          No use cases match that combination. Clear a filter to see more.
        </p>
      )}
    </div>
  );
}
