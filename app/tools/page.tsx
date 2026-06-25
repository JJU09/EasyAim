import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { FeatureCard } from "@/components/ui/Card";
import { Crosshair } from "@/components/site/Crosshair";

export const metadata: Metadata = {
  title: "감도 도구",
  description: "게임별 감도 변환, cm/360·DPI 계산, 오버워치 줌 감도 매칭 도구.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="도구"
        title="감도 도구"
        description="입문자가 가장 많이 막히는 감도 세팅을 빠르게 해결하세요. 모든 계산은 실제 거리(cm/360)를 기준으로 합니다."
      />
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            href="/tools/sensitivity"
            title="게임별 감도 변환기"
            icon={<Crosshair size={22} />}
            description="발로란트·CS2·오버워치·에이펙스 등 게임 간 감도를 같은 손맛으로 변환합니다."
          />
          <FeatureCard
            href="/tools/cm360"
            title="cm/360 · DPI 계산기"
            icon={<Crosshair size={22} />}
            description="DPI와 게임 감도로 360° 회전에 필요한 실제 거리(cm)를 계산하고 역산합니다."
          />
          <FeatureCard
            href="/tools/overwatch-zoom"
            title="오버워치 줌 감도 매칭"
            icon={<Crosshair size={22} />}
            description="조준경(줌) 감도를 일반 감도와 1:1로 맞추는 값을 영웅별로 계산합니다."
          />
        </div>
      </section>
    </>
  );
}
