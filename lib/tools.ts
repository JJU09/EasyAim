/**
 * Tool registry — single source of truth for the /tools hub, the home page
 * and any future search/sitemap. Add a tool here + create its page.
 */
export type ToolCategory = "감도" | "크로스헤어" | "기타";

export type ToolMeta = {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  /** "live" → linked; "soon" → shown as a dimmed roadmap card. */
  status: "live" | "soon";
};

/** Section order on the hub. */
export const TOOL_CATEGORIES: ToolCategory[] = ["감도", "크로스헤어", "기타"];

export const TOOLS: ToolMeta[] = [
  {
    slug: "sensitivity",
    title: "게임별 감도 변환기",
    description:
      "발로란트·CS2·오버워치·에이펙스 등 게임 간 감도를 같은 손맛으로 변환합니다.",
    category: "감도",
    status: "live",
  },
  {
    slug: "cm360",
    title: "cm/360 · DPI 계산기",
    description:
      "DPI와 게임 감도로 360° 회전에 필요한 실제 거리(cm)를 계산하고 역산합니다.",
    category: "감도",
    status: "live",
  },
  {
    slug: "overwatch-zoom",
    title: "오버워치 줌 감도 1:1 매칭",
    description: "조준경(줌) 감도를 일반 감도와 1:1로 맞추는 값을 영웅별로 계산합니다.",
    category: "감도",
    status: "live",
  },
  {
    slug: "crosshair",
    title: "크로스헤어 생성기",
    description: "연습·게임용 크로스헤어를 커스터마이징하고 미리보기.",
    category: "크로스헤어",
    status: "soon",
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function toolHref(tool: ToolMeta): string | undefined {
  return tool.status === "live" ? `/tools/${tool.slug}` : undefined;
}
