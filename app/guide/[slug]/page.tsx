import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES, getGuide } from "@/lib/guides";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
}

export default async function GuideArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const { default: Content } = await import(`@/content/guides/${slug}.mdx`);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <Link href="/guide" className="text-sm text-muted hover:text-fg">
        ← 가이드 목록
      </Link>
      <p className="mt-6 text-sm text-brand">가이드 · {guide.minutes}분</p>
      <Content />
    </article>
  );
}
