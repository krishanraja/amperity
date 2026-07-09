"use client";

import { motion, useInView, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealBlock } from "@/components/motion/Reveal";
import { useReducedOrSaveData } from "@/components/motion/hooks";
import { manifesto } from "@/content/home";

/**
 * The Reframe: the homepage's argument peak, staged as a resolving
 * spine. A vertical rail connects three nodes (the beats). A chartreuse
 * line draws down the rail scrubbed to scroll, and each node resolves as
 * its beat enters the reading zone; the third blooms chartreuse, the
 * resolved profile that is the answer. The brand's fragments-become-one
 * idea enacted, not just described.
 *
 * The rail is measured to span exactly from the first node to the last,
 * so it terminates on the resolved node instead of tailing into space.
 * Not pinned: the page scrolls normally. Under reduced motion the rail
 * renders resolved and beats appear statically.
 */
export function Manifesto() {
  const listRef = useRef<HTMLUListElement | null>(null);
  const firstNodeRef = useRef<HTMLSpanElement | null>(null);
  const lastNodeRef = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedOrSaveData();
  const [rail, setRail] = useState<{ top: number; height: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 72%", "end 72%"],
  });
  const beats = manifesto.beats;

  useEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const first = firstNodeRef.current;
      const last = lastNodeRef.current;
      if (!list || !first || !last) return;
      const listBox = list.getBoundingClientRect();
      const firstBox = first.getBoundingClientRect();
      const lastBox = last.getBoundingClientRect();
      const top = firstBox.top + firstBox.height / 2 - listBox.top;
      const height = lastBox.top + lastBox.height / 2 - (firstBox.top + firstBox.height / 2);
      setRail({ top, height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section className="grain relative bg-gray-900 py-section-lg-m text-white lg:py-section-lg">
      <div className="mx-auto max-w-site px-gutter lg:px-gutter-lg">
        <p className="font-mono text-eyebrow uppercase text-gray-400">{manifesto.eyebrow}</p>

        <ul ref={listRef} className="relative mt-14 space-y-16 lg:mt-20 lg:space-y-24">
          {/* Rail track and chartreuse progress, measured to run node 1
              to node 3. Centered on the w-12 node column (left-6). */}
          <div
            className="absolute left-4 w-px bg-gray-700 lg:left-6"
            style={rail ? { top: rail.top, height: rail.height } : { top: 0, height: 0 }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-4 w-px origin-top bg-chartreuse lg:left-6"
            style={{
              top: rail?.top ?? 0,
              height: rail?.height ?? 0,
              scaleY: reduced ? 1 : scrollYProgress,
            }}
            aria-hidden="true"
          />

          {beats.map((beat, i) => {
            const last = i === beats.length - 1;
            return (
              <li key={i} className="relative flex gap-4 lg:gap-8">
                <div className="flex w-8 shrink-0 justify-center pt-1 lg:w-12">
                  <BeatNode
                    last={last}
                    reduced={reduced}
                    nodeRef={i === 0 ? firstNodeRef : last ? lastNodeRef : undefined}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`font-mono text-eyebrow uppercase ${
                      last ? "text-chartreuse" : "text-gray-500"
                    }`}
                  >
                    {beat.label}
                  </p>
                  <Reveal
                    lines={beat.lines}
                    className={`mt-4 font-display text-h2 font-medium lg:text-h1 ${
                      i === 0 ? "text-gray-400" : i === 1 ? "text-gray-200" : "text-white"
                    }`}
                  />
                  {beat.support && (
                    <RevealBlock delay={0.1} className="mt-6 max-w-measure">
                      <p className="text-lead text-gray-400">{beat.support}</p>
                    </RevealBlock>
                  )}
                  {beat.punch && (
                    <RevealBlock delay={0.2} className="mt-8">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-h1 font-medium text-white">
                        {beat.punch.map((line, j) => (
                          <span key={j} className="inline-flex items-center gap-4">
                            {line}
                            {j === beat.punch!.length - 1 && <ResolvedNode reduced={reduced} />}
                          </span>
                        ))}
                      </div>
                    </RevealBlock>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * A node anchored to a beat, sitting on the rail. Outlined until the
 * beat scrolls into the reading zone, then it fills; reversible on
 * scroll back. The final node is chartreuse.
 */
function BeatNode({
  last,
  reduced,
  nodeRef,
}: {
  last: boolean;
  reduced: boolean;
  nodeRef?: React.Ref<HTMLSpanElement>;
}) {
  const localRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(localRef, { margin: "-45% 0px -45% 0px" });
  const filled = reduced || inView;
  const size = last ? 12 : 9;
  return (
    <span
      ref={(el) => {
        localRef.current = el;
        if (typeof nodeRef === "function") nodeRef(el);
        else if (nodeRef) (nodeRef as React.MutableRefObject<HTMLSpanElement | null>).current = el;
      }}
      aria-hidden="true"
      className="relative flex h-6 w-6 items-center justify-center"
    >
      <span
        className={`absolute inline-flex h-6 w-6 rounded-pill border transition-colors duration-500 ease-out-quad ${
          filled ? (last ? "border-chartreuse" : "border-gray-500") : "border-gray-700"
        }`}
      />
      <motion.span
        className={`inline-flex rounded-pill ${last ? "bg-chartreuse" : "bg-white"}`}
        initial={false}
        animate={{ scale: filled ? 1 : 0, opacity: filled ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: size, width: size }}
      />
    </span>
  );
}

/** The final resolved node beside "Zero copies.", with a one-time bloom. */
function ResolvedNode({ reduced }: { reduced: boolean }) {
  return (
    <span
      className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      {!reduced && (
        <motion.span
          className="absolute inline-flex h-full w-full rounded-pill bg-chartreuse"
          initial={{ opacity: 0.5, scale: 0.6 }}
          whileInView={{ opacity: 0, scale: 1.9 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      )}
      <span className="relative inline-flex h-4 w-4 rounded-pill bg-chartreuse" />
    </span>
  );
}
