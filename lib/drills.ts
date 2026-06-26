/**
 * Practice drill registry — single source of truth for the /practice hub.
 * Add a drill here + create its page.
 */
export type DrillSkill = "트래킹" | "플리킹" | "타겟 전환";
export type DrillDifficulty = "입문" | "중급" | "고급";

export type DrillMeta = {
  slug: string;
  title: string;
  description: string;
  skill: DrillSkill;
  difficulty: DrillDifficulty;
  /** "live" → linked; "soon" → shown as a dimmed roadmap card. */
  status: "live" | "soon";
};

/** Section order on the hub. */
export const DRILL_SKILLS: DrillSkill[] = ["트래킹", "플리킹", "타겟 전환"];

export const DRILLS: DrillMeta[] = [
  {
    slug: "tracking",
    title: "트래킹",
    description:
      "움직이는 타겟에 크로스헤어를 계속 올려두며 정확도를 측정합니다. 기본기의 핵심.",
    skill: "트래킹",
    difficulty: "입문",
    status: "live",
  },
  {
    slug: "flick",
    title: "플리킹",
    description: "한 번에 타겟으로 튕겨 맞추는 순간 에임 연습.",
    skill: "플리킹",
    difficulty: "중급",
    status: "soon",
  },
  {
    slug: "target-switch",
    title: "타겟 전환",
    description: "여러 타겟을 빠르게 옮겨가며 맞추는 전환 속도 연습.",
    skill: "타겟 전환",
    difficulty: "중급",
    status: "soon",
  },
];

export function getDrill(slug: string): DrillMeta | undefined {
  return DRILLS.find((d) => d.slug === slug);
}

export function drillHref(drill: DrillMeta): string | undefined {
  return drill.status === "live" ? `/practice/${drill.slug}` : undefined;
}
