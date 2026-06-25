import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Cm360Calculator } from "@/components/tools/Cm360Calculator";

export const metadata: Metadata = {
  title: "cm/360 · DPI 계산기",
  description: "DPI와 게임 감도로 360° 회전 거리(cm)를 계산하고 역산합니다.",
};

export default function Cm360Page() {
  return (
    <>
      <PageHeader
        eyebrow="도구"
        title="cm/360 · DPI 계산기"
        description="내 세팅이 실제로 얼마나 빠른지 cm/360으로 확인하고, 원하는 cm/360에 맞는 감도를 역산하세요."
      />
      <section className="mx-auto w-full max-w-4xl px-4 py-12">
        <Cm360Calculator />
      </section>
    </>
  );
}
