import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { TrackingDrill } from "@/components/practice/TrackingDrill";

export const metadata: Metadata = {
  title: "트래킹 연습",
  description:
    "움직이는 타겟을 크로스헤어로 추적하며 정확도를 측정하는 브라우저 트래킹 드릴.",
};

export default function TrackingPage() {
  return (
    <>
      <PageHeader
        eyebrow="연습 · 트래킹"
        title="트래킹 드릴"
        description="움직이는 타겟에 크로스헤어를 계속 올려두세요. 화면에 올라가 있던 시간의 비율이 정확도 점수가 됩니다."
      />
      <section className="mx-auto w-full max-w-4xl px-4 py-12">
        <TrackingDrill />
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
              감도가 너무 빠르거나 느리면{" "}
              <Link href="/tools/cm360" className="text-brand hover:underline">
                cm/360 계산기
              </Link>
              로 적정값을 찾아보세요.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
