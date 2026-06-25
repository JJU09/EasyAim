import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { OverwatchZoomMatcher } from "@/components/tools/OverwatchZoomMatcher";

export const metadata: Metadata = {
  title: "오버워치 줌 감도 1:1 매칭",
  description:
    "조준경(줌) 감도를 일반 감도와 1:1로 맞추는 ‘조준 시 상대 감도’ 값을 계산합니다.",
};

export default function OverwatchZoomPage() {
  return (
    <>
      <PageHeader
        eyebrow="도구"
        title="오버워치 줌 감도 1:1 매칭"
        description="아나·위도우메이커·애쉬처럼 조준경을 쓰는 영웅의 줌 감도를 일반 감도와 같은 손맛으로 맞춥니다."
      />
      <section className="mx-auto w-full max-w-4xl px-4 py-12">
        <OverwatchZoomMatcher />
      </section>
    </>
  );
}
