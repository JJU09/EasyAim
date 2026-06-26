/**
 * Sensitivity math. The universal anchor is cm/360 — the real-world mouse
 * travel (in centimetres) required to turn a full 360° in game.
 *
 * `yaw` is degrees of rotation per mouse count at in-game sensitivity 1.0
 * (see ./games.ts).
 */

const INCH_TO_CM = 2.54;

/** Mouse counts (dots) needed to turn a full 360°. */
export function countsPer360(sens: number, yaw: number): number {
  return 360 / (sens * yaw);
}

/** cm of mouse travel to turn 360°, given sensitivity, game yaw and DPI. */
export function cm360FromSens(sens: number, yaw: number, dpi: number): number {
  return (countsPer360(sens, yaw) / dpi) * INCH_TO_CM;
}

/** Inverse of {@link cm360FromSens}: the in-game sensitivity for a target cm/360. */
export function sensFromCm360(cm360: number, yaw: number, dpi: number): number {
  const counts = (cm360 / INCH_TO_CM) * dpi;
  const degPerCount = 360 / counts;
  return degPerCount / yaw;
}

/** inches of mouse travel to turn 360°. */
export function inches360FromSens(sens: number, yaw: number, dpi: number): number {
  return cm360FromSens(sens, yaw, dpi) / INCH_TO_CM;
}

/**
 * Convert a sensitivity from one game to another so that the cm/360 (feel)
 * is preserved. DPI is optional and only matters when it differs between the
 * two configs (e.g. converting across two PCs).
 */
export function convertSens(args: {
  sens: number;
  fromYaw: number;
  toYaw: number;
  fromDpi?: number;
  toDpi?: number;
}): number {
  const { sens, fromYaw, toYaw, fromDpi = 800, toDpi = 800 } = args;
  return (sens * fromYaw * fromDpi) / (toYaw * toDpi);
}

/** Overwatch anchors vertical FOV to a 16:9 frame. */
const OW_HEIGHT_FACTOR = 16 / 9;

/**
 * Overwatch "Relative Aim Sensitivity While Zoomed" (%) for a 1:1 focal-length
 * match (the scoped view tracks the same on-screen distance as hipfire).
 *
 * Overwatch's FOV setting is *horizontal* and its vertical FOV is anchored to a
 * 16:9 frame, while each scope zooms to a fixed *vertical* FOV. So we compare
 * the scope's vertical FOV against the vertical FOV derived from the player's
 * horizontal FOV setting:
 *
 *   relative% = 100 · tan(zoomVFov/2) · (16/9) / tan(baseFov/2)
 *
 * Valid for 16:9 and narrower aspect ratios (Overwatch keeps vertical FOV
 * constant there). Verified against in-game values, e.g. 103 FOV →
 * Widowmaker (30 VFOV) = 37.89%, Ashe (40) = 51.47%, Freja (47.5) = 62.22%.
 *
 * @param baseFov  Player's horizontal FOV setting (1–103, default 103).
 * @param zoomVFov Scope's vertical FOV in degrees.
 */
export function overwatchZoomRelative(baseFov: number, zoomVFov: number): number {
  const halfTan = (deg: number) => Math.tan((deg / 2) * (Math.PI / 180));
  return (100 * halfTan(zoomVFov) * OW_HEIGHT_FACTOR) / halfTan(baseFov);
}

/** Round to a sensible number of decimals for display. */
export function round(value: number, decimals = 3): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
