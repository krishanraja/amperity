import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/templates/IndustryPage";
import { industries, industrySlugs } from "@/content/industries";

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = industries[slug];
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.headlineLines.join(" "),
      description: data.metaDescription,
      images: [{ url: "/og/solutions.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: ["/og/solutions.png"] },
  };
}

export default async function IndustryRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = industries[slug];
  if (!data) notFound();
  return <IndustryPage data={data} />;
}
