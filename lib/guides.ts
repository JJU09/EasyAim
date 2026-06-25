/**
 * Guide manifest — an ordered learning sequence. Body content lives in
 * `content/guides/<slug>.mdx`; this list drives the index page (with step
 * numbers), metadata and static params.
 */
export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  /** Rough reading time, minutes. */
  minutes: number;
};

export const GUIDES: GuideMeta[] = [
  {
    slug: "setup-and-settings",
    title: "자세, 장비, 세팅",
    description:
      "에임은 복합적입니다. 책상·의자·마우스·패드·모니터부터 DPI·감도까지, 입문자에게 무난한 기본값을 한 번에 잡습니다.",
    minutes: 6,
  },
  {
    slug: "beginner-grip",
    title: "따라하기 쉬운 그립법",
    description:
      "마우스 양 측면을 두 지점으로 잡고 ‘민다’고 생각하는, 입문자가 바로 따라 할 수 있는 그립.",
    minutes: 4,
  },
  {
    slug: "wrist-and-arm",
    title: "손목 사용과 팔·어깨",
    description:
      "손목 가동범위를 끝까지 쓰지 않는 이유와, 손목·팔·어깨가 어떻게 역할을 나눠 가지는지.",
    minutes: 4,
  },
  {
    slug: "tracking-mindset",
    title: "트래킹의 심상과 연습",
    description:
      "타겟을 지나는 ‘세로선’에 조준선을 붙이는 심상과, 오버에임 없이 좌우를 따라가는 연습 — 라이브 드릴 포함.",
    minutes: 6,
  },
];

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
