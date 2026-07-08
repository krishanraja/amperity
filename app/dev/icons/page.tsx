import type { Metadata } from "next";
import { Icon, iconNames } from "@/components/icons";

export const metadata: Metadata = {
  title: "Icon set QA",
  robots: { index: false, follow: false },
};

/**
 * Hidden QA page: every icon rendered together so the set can be
 * checked as one family (grid, stroke, node-dot consistency).
 */
export default function IconsDevPage() {
  return (
    <main id="main" className="mx-auto max-w-site px-gutter py-16 lg:px-gutter-lg">
      <p className="font-mono text-eyebrow uppercase text-gray-500">
        DEV / ICON FAMILY QA
      </p>
      <h1 className="mt-4 font-display text-h2 font-medium">
        {iconNames.length} icons, one family
      </h1>
      <div className="mt-12 grid grid-cols-3 gap-2 md:grid-cols-6">
        {iconNames.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center gap-4 rounded-card border border-gray-200 px-2 py-6"
          >
            <Icon name={name} size={28} />
            <span className="font-mono text-body-sm text-gray-500">{name}</span>
          </div>
        ))}
      </div>
      <h2 className="mt-16 font-display text-h4 font-medium">On dark</h2>
      <div className="mt-6 grid grid-cols-3 gap-2 rounded-card bg-gray-900 p-6 text-white md:grid-cols-6">
        {iconNames.map((name) => (
          <div key={name} className="flex items-center justify-center py-4">
            <Icon name={name} size={28} />
          </div>
        ))}
      </div>
    </main>
  );
}
