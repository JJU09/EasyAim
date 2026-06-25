import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { SensitivityConverter } from "@/components/tools/SensitivityConverter";

export const metadata: Metadata = {
  title: "게임별 감도 변환기",
  description:
    "발로란트·CS2·오버워치·에이펙스 등 게임 간 감도를 같은 손맛(cm/360)으로 변환합니다.",
};

export default function SensitivityPage() {
  return (
    <>
      <PageHeader
        eyebrow="도구"
        title="게임별 감도 변환기"
        description="한 게임의 감도를 다른 게임에서 같은 손 이동 거리로 느끼도록 변환합니다."
      />
      <section className="mx-auto w-full max-w-4xl px-4 py-12">
        <SensitivityConverter />
      </section>
    </>
  );
}
