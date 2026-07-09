"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FilterChips } from "@/components/ui/FilterChips";
import { Icon } from "@/components/icons";
import { easingArray } from "@/styles/tokens";
import { integrations, integrationCategories } from "@/content/integrations";

/**
 * Searchable, filterable integration grid. Logos would be third-party
 * trademarks, so connectors render as mono text chips. Search and
 * category filter both narrow the set with an animated reflow.
 */
export function IntegrationGrid() {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      integrations.filter(
        (it) =>
          (!category || it.category === category) &&
          (!query || it.name.toLowerCase().includes(query.toLowerCase())),
      ),
    [category, query],
  );

  return (
    <div>
      <div className="flex flex-col gap-6">
        <label className="relative block">
          <span className="sr-only">Search integrations</span>
          <Icon
            name="search"
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 400+ connectors"
            className="min-h-12 w-full rounded-card border border-gray-300 bg-white pl-12 pr-4 text-body text-gray-900 placeholder:text-gray-500 focus:border-chartreuse focus:outline-none"
          />
        </label>
        <FilterChips options={integrationCategories} active={category} onChange={setCategory} />
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((it) => (
          <motion.div
            key={it.name}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: easingArray.outExpo }}
            className="flex min-h-24 flex-col justify-between rounded-card border border-gray-200 p-6"
          >
            <span className="font-display text-body font-medium text-gray-900">{it.name}</span>
            <span className="font-mono text-body-sm text-gray-500">{it.category}</span>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 flex items-center gap-2 font-mono text-body-sm text-gray-500">
          <Icon name="search" size={16} />
          No connectors match. Try another search or clear the filter.
        </p>
      )}
    </div>
  );
}
