import type { Metadata } from "next";
import { AmpAIExchange, JourneyBuilder, ResolutionView } from "@/components/product";

export const metadata: Metadata = {
  title: "Product UI QA",
  robots: { index: false, follow: false },
};

/** Hidden QA page for the three illustrative product moments. */
export default function ProductDevPage() {
  return (
    <main id="main" className="mx-auto max-w-site space-y-16 px-gutter py-16 lg:px-gutter-lg">
      <p className="font-mono text-eyebrow uppercase text-gray-500">
        DEV / PRODUCT UI QA
      </p>
      <ResolutionView className="max-w-measure" />
      <AmpAIExchange className="max-w-measure" />
      <JourneyBuilder className="max-w-measure" />
    </main>
  );
}
