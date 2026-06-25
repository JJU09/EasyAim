import { LinkButton } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/Card";
import { Crosshair } from "@/components/site/Crosshair";

export default function Home() {
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

      {/* Pillars */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          <FeatureCard
            href="/guide"
            title="가이드"
            badge="배우기"
            icon={<Crosshair size={22} />}
            description="자세·장비·세팅부터 그립, 손목 사용, 트래킹 심상까지 순서대로 따라 하는 입문 가이드."
          />
          <FeatureCard
            href="/practice/tracking"
            title="트래킹 연습"
            badge="따라 하기"
            icon={<Crosshair size={22} />}
            description="움직이는 타겟을 크로스헤어로 추적하며 정확도를 측정합니다. 점수와 최고 기록이 저장됩니다."
          />
          <FeatureCard
            href="/tools"
            title="감도 도구"
            badge="세팅"
            icon={<Crosshair size={22} />}
            description="게임별 감도 변환, cm/360·DPI 계산, 오버워치 줌 감도 매칭을 빠르게 처리합니다."
          />
        </div>
      </section>
    </div>
  );
}
