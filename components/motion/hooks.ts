"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

function useMediaQuery(query: string, initial = false): boolean {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** True on devices with a precise hover-capable pointer (mouse, trackpad). */
export function usePointerFine(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** Mobile motion budget applies below the md breakpoint. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

/** Save-Data and prefers-reduced-motion are respected identically. */
export function useReducedOrSaveData(): boolean {
  const reduced = useReducedMotion();
  const [saveData, setSaveData] = useState(false);
  useEffect(() => {
    setSaveData(
      "connection" in navigator &&
        Boolean((navigator as { connection?: { saveData?: boolean } }).connection?.saveData),
    );
  }, []);
  return Boolean(reduced) || saveData;
}
