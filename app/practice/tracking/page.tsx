import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { TrackingDrill3D } from "@/components/practice/TrackingDrill3D";

export const metadata: Metadata = {
  title: "트래킹 연습",
  description:
    "3D 공간에서 시야를 돌려 움직이는 타겟을 추적하는 트래킹 드릴. 실제 cm/360 감도로 연습합니다.",
};

export default function TrackingPage() {
  return (
    <>
      <PageHeader
        eyebrow="연습 · 트래킹"
        title="트래킹 드릴"
        description="마우스로 시야를 돌려 움직이는 타겟에 크로스헤어를 계속 올려두세요. 화면에 올라가 있던 시간의 비율이 정확도 점수가 됩니다."
      />
      <section className="mx-auto w-full max-w-4xl px-4 py-12">
        <TrackingDrill3D />
        <div className="mt-10 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <p className="mb-2 font-medium text-fg">처음이라면</p>
          <ul className="list-inside list-disc space-y-1">
            <li>난이도 ‘쉬움’, 시간 30초로 시작해 보세요.</li>
            <li>
              타겟 중앙의 세로선에 조준선을 붙이되, 넘어가지 않게(오버에임) 부드럽게
              따라가세요. 방향이 바뀌면 무리해서 예측하지 말고 잠깐 멈췄다 다시
              붙으세요.
            </li>
            <li>
              이 드릴은 실제 cm/360 감도로 동작합니다. 손맛이 어색하면{" "}
              <Link href="/tools/cm360" className="text-brand hover:underline">
                cm/360 계산기
              </Link>
              로 내 게임 감도를 맞춰보세요.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
