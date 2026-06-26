/**
 * Per-game sensitivity scale.
 *
 * `yaw` = degrees of in-game rotation per mouse count (dot) at in-game
 * sensitivity 1.0. This is the universal constant used to convert between
 * games. Values are the well-established community constants
 * (e.g. Source engine `m_yaw` = 0.022).
 *
 * Only games with a *linear* sensitivity scale are listed — games whose
 * sensitivity depends on FOV in a non-linear way (R6 Siege, Fortnite,
 * Call of Duty) are intentionally omitted to avoid inaccurate conversions.
 */
export type Game = {
  id: string;
  name: string;
  /** Degrees per mouse count at in-game sensitivity 1.0. */
  yaw: number;
  /** A typical sensitivity, used to prefill inputs. */
  defaultSens: number;
};

export const GAMES: Game[] = [
  { id: "valorant", name: "발로란트", yaw: 0.07, defaultSens: 0.4 },
  { id: "cs2", name: "CS2 / CS:GO", yaw: 0.022, defaultSens: 1.2 },
  { id: "apex", name: "에이펙스 레전드", yaw: 0.022, defaultSens: 1.2 },
  { id: "overwatch2", name: "오버워치 2", yaw: 0.0066, defaultSens: 5 },
  { id: "quake", name: "퀘이크 라이브", yaw: 0.022, defaultSens: 1.2 },
  { id: "tf2", name: "팀 포트리스 2", yaw: 0.022, defaultSens: 1.2 },
];

export function getGame(id: string): Game | undefined {
  return GAMES.find((g) => g.id === id);
}

/**
 * Overwatch scoped heroes and their fixed zoom *vertical* FOV (degrees),
 * used by the zoom-sensitivity matcher.
 */
export type OwScope = {
  id: string;
  label: string;
  /** Zoom vertical FOV in degrees. */
  vfov: number;
};

export const OW_SCOPES: OwScope[] = [
  { id: "widow-ana", label: "위도우메이커 · 아나", vfov: 30 },
  { id: "ashe-cassidy", label: "애쉬 · 캐서디", vfov: 40 },
  { id: "emre", label: "엠레", vfov: 42.5 },
  { id: "freja", label: "프레야", vfov: 47.5 },
];
