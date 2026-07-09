"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FilterChips } from "@/components/ui/FilterChips";
import { StoryArt } from "@/components/templates/StoryArt";
import { Icon } from "@/components/icons";
import { easingArray } from "@/styles/tokens";
import type { CustomerStory } from "@/content/customers";

/** Filterable customer-story grid with animated reflow. */
export function CustomerGrid({ stories }: { stories: CustomerStory[] }) {
  const [active, setActive] = useState<string | null>(null);
  const categories = useMemo(
    () => [...new Set(stories.map((s) => s.category))].sort(),
    [stories],
  );
  const filtered = active ? stories.filter((s) => s.category === active) : stories;

  return (
    <div>
      <FilterChips options={categories} active={active} onChange={setActive} allLabel="All stories" />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((story) => (
          <motion.div
            key={story.slug}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easingArray.outExpo }}
          >
            <Link
              href={`/customers/${story.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-card border border-gray-200 shadow-card transition duration-ui ease-out-quad hover:-translate-y-1 hover:shadow-lift"
            >
              <StoryArt slug={story.slug} className="h-40 bg-gray-900" />
              <div className="flex flex-1 flex-col p-8">
                <p className="font-mono text-eyebrow uppercase text-gray-500">
                  {story.industry}
                </p>
                <h3 className="mt-2 font-display text-h4 font-medium text-gray-900">
                  {story.name}
                </h3>
                <p className="mt-4 text-body text-gray-600">{story.teaser}</p>
                <span className="mt-auto flex min-h-11 items-center gap-2 pt-8 text-body font-medium text-gray-900">
                  Read the story
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="transition-transform duration-micro ease-out-quad group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
