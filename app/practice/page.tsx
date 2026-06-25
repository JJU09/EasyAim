import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { FeatureCard } from "@/components/ui/Card";
import { Crosshair } from "@/components/site/Crosshair";

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            href="/practice/tracking"
            title="트래킹"
            badge="핵심"
            icon={<Crosshair size={22} />}
            description="움직이는 타겟에 크로스헤어를 계속 올려두며 정확도를 측정합니다. 기본기의 핵심."
          />
        </div>
      </section>
    </>
  );
}
