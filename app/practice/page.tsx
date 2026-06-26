import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { CatalogCard } from "@/components/ui/CatalogCard";
import { DRILLS, DRILL_SKILLS, drillHref } from "@/lib/drills";

export const metadata: Metadata = {
  title: "연습",
  description: "브라우저에서 바로 따라 하는 에임 연습 드릴.",
};

export default function PracticePage() {
  return (
    <>
      <PageHeader
        eyebrow="연습"
        title="에임 연습 드릴"
        description="마우스로 직접 따라 하며 감을 잡으세요. 데스크톱 + 마우스 환경을 권장합니다."
      />
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-10">
          {DRILL_SKILLS.map((skill) => {
            const items = DRILLS.filter((d) => d.skill === skill);
            if (items.length === 0) return null;
            return (
              <div key={skill}>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                  {skill}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((drill) => (
                    <CatalogCard
                      key={drill.slug}
                      title={drill.title}
                      description={drill.description}
                      href={drillHref(drill)}
                      meta={drill.difficulty}
                      soon={drill.status === "soon"}
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
