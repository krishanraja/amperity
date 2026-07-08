"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { ProgressRule } from "./ScrollAccent";
import { useReducedOrSaveData } from "./hooks";

export type Chapter = {
  id: string;
  eyebrow: string;
  copy: ReactNode;
  visual: ReactNode;
};

/**
 * Sticky chapter: a pinned viewport panel whose copy and visual swap as
 * the user scrolls, driven continuously by scroll position so scrubbing
 * backwards reverses it. One per page maximum. On touch and small
 * screens it degrades to stacked sections with a scrubbed progress rule
 * per chapter, no pinned scroll-jacking.
 */
export function StickyChapter({ chapters }: { chapters: Chapter[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedOrSaveData();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const n = chapters.length;

  return (
    <div ref={ref}>
      {/* Desktop: pinned, scroll-scrubbed. Removed entirely under
          reduced motion, where the stacked layout serves all widths. */}
      {!reduced && (
      <div
        className="hidden lg:block"
        style={{ height: `${n * 120}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-site grid-cols-2 gap-24 px-gutter-lg">
            <div className="relative">
              {chapters.map((c, i) => (
                <ChapterCopy
                  key={c.id}
                  chapter={c}
                  index={i}
                  count={n}
                  progress={scrollYProgress}
                />
              ))}
            </div>
            <div className="relative">
              {chapters.map((c, i) => (
                <ChapterVisual
                  key={c.id}
                  chapter={c}
                  index={i}
                  count={n}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
      {/* Touch and small screens: stacked, no pinning */}
      <div className={reduced ? "" : "lg:hidden"}>
        <StackedChapters chapters={chapters} />
      </div>
    </div>
  );
}

function useChapterWindow(progress: MotionValue<number>, index: number, count: number) {
  // Each chapter owns an equal slice of scroll progress; crossfade at
  // the seams. Computed explicitly so the value maps continuously to
  // scrollbar position and clamps outside the chapter's window.
  const start = index / count;
  const end = (index + 1) / count;
  const fade = 0.18 / count;
  return useTransform(progress, (p: number) => {
    const fadeIn = index === 0 ? 1 : Math.min(1, Math.max(0, (p - start) / fade));
    const fadeOut =
      index === count - 1 ? 1 : Math.min(1, Math.max(0, (end - p) / fade));
    return Math.min(fadeIn, fadeOut);
  });
}

function ChapterCopy({
  chapter,
  index,
  count,
  progress,
}: {
  chapter: Chapter;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const opacity = useChapterWindow(progress, index, count);
  const y = useTransform(opacity, [0, 1], [16, 0]);
  return (
    <motion.div
      data-chapter-copy={chapter.id}
      style={{ opacity, y }}
      className={index === 0 ? "relative" : "absolute inset-0 flex flex-col justify-center"}
    >
      {chapter.copy}
    </motion.div>
  );
}

function ChapterVisual({
  chapter,
  index,
  count,
  progress,
}: {
  chapter: Chapter;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const opacity = useChapterWindow(progress, index, count);
  const scale = useTransform(opacity, [0, 1], [0.97, 1]);
  return (
    <motion.div
      data-chapter-visual={chapter.id}
      style={{ opacity, scale }}
      className={index === 0 ? "relative" : "absolute inset-0 flex items-center"}
    >
      {chapter.visual}
    </motion.div>
  );
}

function StackedChapters({ chapters }: { chapters: Chapter[] }) {
  return (
    <div className="mx-auto max-w-site space-y-20 px-gutter lg:px-gutter-lg">
      {chapters.map((c) => (
        <div key={c.id} className="flex gap-6">
          <ProgressRule />
          <div className="flex-1 space-y-8">
            <div>{c.copy}</div>
            <div>{c.visual}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
