import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FunctionPage } from "@/components/templates/FunctionPage";
import { functions, functionSlugs } from "@/content/functions";

export function generateStaticParams() {
  return functionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = functions[slug];
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

export default async function DepartmentRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = functions[slug];
  if (!data) notFound();
  return <FunctionPage data={data} />;
}
