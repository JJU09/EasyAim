import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { TrackingDrill3D } from "@/components/practice/TrackingDrill3D";

export const metadata: Metadata = {
  title: "트래킹 드릴 (3D)",
  description: "3D 공간에서 시야를 돌려 타겟을 추적하는 트래킹 드릴.",
};

export default function Tracking3DPage() {
  return (
    <>
      <PageHeader
        eyebrow="연습 · 트래킹"
        title="트래킹 드릴 (3D)"
        description="마우스로 시야(카메라)를 돌려 움직이는 타겟을 추적합니다. 크로스헤어는 화면 중앙에 고정되며, 실제 cm/360 감도로 연습합니다."
      />
      <section className="mx-auto w-full max-w-4xl px-4 py-12">
        <TrackingDrill3D />
      </section>
    </>
  );
}
