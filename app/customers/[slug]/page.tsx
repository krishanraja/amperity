import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomerStoryPage } from "@/components/templates/CustomerStoryPage";
import { customerStories } from "@/content/customers";

export function generateStaticParams() {
  return customerStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = customerStories.find((s) => s.slug === slug);
  if (!story) return {};
  return {
    title: `${story.name} customer story`,
    description: story.teaser,
    openGraph: {
      title: `${story.name} and Amperity`,
      description: story.teaser,
      images: [{ url: "/og/customers.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: ["/og/customers.png"] },
  };
}

export default async function CustomerStoryRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = customerStories.find((s) => s.slug === slug);
  if (!story) notFound();
  return <CustomerStoryPage story={story} />;
}
