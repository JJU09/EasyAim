import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogCard } from "@/components/ui/CatalogCard";
import { TOOLS, TOOL_CATEGORIES, toolHref } from "@/lib/tools";

export const metadata: Metadata = {
  title: "감도 도구",
  description: "게임별 감도 변환, cm/360·DPI 계산, 오버워치 줌 감도 매칭 도구.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="도구"
        title="도구"
        description="입문자가 가장 많이 막히는 세팅을 빠르게 해결하세요. 모든 계산은 실제 거리(cm/360)를 기준으로 합니다."
      />
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-10">
          {TOOL_CATEGORIES.map((category) => {
            const items = TOOLS.filter((t) => t.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                  {category}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool) => (
                    <CatalogCard
                      key={tool.slug}
                      title={tool.title}
                      description={tool.description}
                      href={toolHref(tool)}
                      soon={tool.status === "soon"}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
