import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { FlickDrill3D } from "@/components/practice/FlickDrill3D";

export const metadata: Metadata = {
  title: "플리킹 드릴",
  description: "나타나는 타겟으로 빠르게 시야를 튕겨 맞추는 3D 플리킹 드릴.",
};

export default function FlickPage() {
  return (
    <>
      <PageHeader
        eyebrow="연습 · 플리킹"
        title="플리킹 드릴"
        description="타겟이 나타나면 빠르게 시야를 튕겨 크로스헤어를 맞추고 클릭하세요. 명중 수와 명중률로 측정합니다."
      />
      <section className="mx-auto w-full max-w-4xl px-4 py-12">
        <FlickDrill3D />
      </section>
    </>
  );
}
