import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "가이드",
  description: "FPS 에임의 기초를 입문자 눈높이로 정리한 가이드.",
};

export default function GuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="가이드"
        title="에임 가이드"
        description="자세·장비·세팅부터 그립, 손목 사용, 트래킹 심상, 손가락 미세조정까지 — 순서대로 따라 하는 입문 가이드."
      />
      <section className="mx-auto w-full max-w-3xl px-4 py-12">
        <div className="mb-8 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <p>
            에임에는 <span className="text-fg">정답이 없습니다.</span> 장비·세팅·손과
            팔의 사용 비중·머릿속 심상이 모두 얽혀 사람마다 최적이 다르고, 여기 적힌
            내용에 동의하지 않는 고수도 분명 있습니다. 그래도 이 가이드는{" "}
            <span className="text-fg">
              입문자가 이해하고 바로 따라 할 수 있는 가장 대중적인 기본값
            </span>
            을 제시합니다. 익숙해진 뒤 자신에게 맞게 바꿔 나가세요.
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {GUIDES.map((guide, i) => (
            <li key={guide.slug}>
              <Link
                href={`/guide/${guide.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-brand/60 hover:bg-surface-2"
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border font-mono text-sm text-brand">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-fg group-hover:text-brand">
                      {guide.title}
                    </h2>
                    <span className="shrink-0 text-xs text-muted">
                      {guide.minutes}분
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    {guide.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
