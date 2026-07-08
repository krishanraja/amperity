import type { ReactNode } from "react";

/**
 * Device-neutral frame for the illustrative product moments: thin
 * border, 12px radius, mono title bar with a live node dot. Never a
 * fake browser chrome, never a screenshot.
 */
export function ProductFrame({
  title,
  children,
  dark = false,
  className,
}: {
  /** Mono title, e.g. "amperity / identity resolution" */
  title: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-card border shadow-card ${
        dark ? "border-gray-700 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-900"
      } ${className ?? ""}`}
    >
      <div
        className={`flex items-center justify-between border-b px-6 py-2 ${
          dark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <span className={`font-mono text-body-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
          {title}
        </span>
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-chartreuse opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-pill bg-chartreuse" />
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
