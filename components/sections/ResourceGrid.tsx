"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FilterChips } from "@/components/ui/FilterChips";
import { Icon } from "@/components/icons";
import { easingArray } from "@/styles/tokens";
import { resources, resourceTypes } from "@/content/resources";

/** Resource card library with type filters. Cards link out or to #. */
export function ResourceGrid() {
  const [type, setType] = useState<string | null>(null);
  const filtered = type ? resources.filter((r) => r.type === type) : resources;

  return (
    <div>
      <FilterChips options={resourceTypes} active={type} onChange={setType} allLabel="All" />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <motion.a
            key={r.title}
            href={r.href}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easingArray.outExpo }}
            className="group flex h-full flex-col rounded-card border border-gray-200 p-8 shadow-card transition duration-ui ease-out-quad hover:-translate-y-1 hover:shadow-lift"
          >
            <p className="font-mono text-eyebrow uppercase text-gray-500">{r.type}</p>
            <h3 className="mt-4 font-display text-h4 font-medium text-gray-900">{r.title}</h3>
            <p className="mt-4 text-body text-gray-600">{r.blurb}</p>
            <span className="mt-auto flex min-h-11 items-center gap-2 pt-8 text-body font-medium text-gray-900">
              Read
              <Icon
                name="arrow-up-right"
                size={16}
                className="transition-transform duration-micro ease-out-quad group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
