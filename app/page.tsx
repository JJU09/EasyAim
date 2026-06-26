import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { CatalogCard } from "@/components/ui/CatalogCard";
import { Crosshair } from "@/components/site/Crosshair";
import { SectionHeading } from "@/components/site/SectionHeading";
import { GUIDES } from "@/lib/guides";
import { TOOLS, toolHref } from "@/lib/tools";
import { DRILLS } from "@/lib/drills";

export default function Home() {
  const liveTools = TOOLS.filter((t) => t.status === "live");
  const roadmap = [
    ...DRILLS.filter((d) => d.status === "soon").map((d) => ({
      key: `drill-${d.slug}`,
      title: d.title,
      description: d.description,
      tag: "연습",
    })),
    ...TOOLS.filter((t) => t.status === "soon").map((t) => ({
      key: `tool-${t.slug}`,
      title: t.title,
      description: t.description,
      tag: "도구",
    })),
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
            <Crosshair size={14} className="text-brand" />
            FPS 에임, 기초부터 제대로
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            에임이 어려운 건
            <br />
            <span className="text-brand">방법을 몰라서</span>입니다
          </h1>
          <p className="max-w-xl text-balance text-lg leading-relaxed text-muted">
            트래킹의 원리를 가이드로 이해하고, 브라우저에서 바로 따라 하며 감을 잡으세요.
            게임별 감도 변환까지 한 곳에서 해결합니다.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/practice/tracking">
              <Crosshair size={16} />
              지금 연습 시작
            </LinkButton>
            <LinkButton href="/guide" variant="ghost">
              가이드 먼저 보기
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Learning path */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="배우기"
          title="기초부터, 순서대로"
          description="자세·세팅부터 그립·손목·트래킹 심상까지. 위에서 아래로 따라가면 됩니다."
          href="/guide"
          linkLabel="가이드 전체 보기"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES.map((guide, i) => (
            <Link
              key={guide.slug}
              href={`/guide/${guide.slug}`}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-brand/60 hover:bg-surface-2"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-full border border-border font-mono text-brand">
                  {i + 1}
                </span>
                <span className="text-xs text-muted">{guide.minutes}분</span>
              </div>
              <h3 className="font-semibold text-fg group-hover:text-brand">
                {guide.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Practice highlight */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <p className="text-sm font-medium text-brand">연습</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                읽고 끝내지 말고,
                <br />
                브라우저에서 바로 따라 하기
              </h2>
              <p className="text-muted">
                움직이는 타겟을 크로스헤어로 추적하며 정확도를 측정합니다. 타겟 중앙
                세로선에 조준선을 붙이는 감각을 손에 익히세요. 점수와 최고 기록이
                저장됩니다.
              </p>
              <div className="mt-1">
                <LinkButton href="/practice/tracking">
                  <Crosshair size={16} />
                  트래킹 드릴 시작
                </LinkButton>
              </div>
            </div>
            <div className="bg-grid flex items-center justify-center border-t border-border bg-[#0f1115] p-8 md:border-l md:border-t-0">
              <svg
                viewBox="0 0 320 190"
                className="h-auto w-full max-w-xs"
                role="img"
                aria-label="트래킹 드릴 미리보기"
              >
                <line
                  x1="0"
                  y1="95"
                  x2="320"
                  y2="95"
                  className="stroke-border"
                  strokeWidth="1.5"
                />
                <line
                  x1="190"
                  y1="18"
                  x2="190"
                  y2="172"
                  className="stroke-brand"
                  strokeWidth="1.5"
                  strokeDasharray="6 5"
                  opacity="0.5"
                />
                <circle cx="190" cy="95" r="30" className="fill-target" opacity="0.2" />
                <circle
                  cx="190"
                  cy="95"
                  r="30"
                  className="fill-none stroke-target"
                  strokeWidth="2"
                />
                <g className="stroke-fg" strokeWidth="2" strokeLinecap="round">
                  <line x1="167" y1="95" x2="174" y2="95" />
                  <line x1="182" y1="95" x2="189" y2="95" />
                  <line x1="178" y1="84" x2="178" y2="91" />
                  <line x1="178" y1="99" x2="178" y2="106" />
                </g>
                <circle cx="178" cy="95" r="1.6" className="fill-fg" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <SectionHeading
          eyebrow="도구"
          title="세팅은 빠르게"
          description="모든 계산은 실제 손 이동 거리(cm/360)를 기준으로 합니다."
          href="/tools"
          linkLabel="도구 전체 보기"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveTools.map((tool) => (
            <CatalogCard
              key={tool.slug}
              title={tool.title}
              description={tool.description}
              href={toolHref(tool)}
            />
          ))}
        </div>
      </section>

      {/* Roadmap */}
      {roadmap.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-4 pb-20">
          <SectionHeading
            eyebrow="로드맵"
            title="곧 추가됩니다"
            description="더 많은 연습 드릴과 도구가 준비 중입니다."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((item) => (
              <CatalogCard
                key={item.key}
                title={item.title}
                description={item.description}
                soon
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
