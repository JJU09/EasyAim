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

/**
 * Overwatch "Relative Aim Sensitivity While Zoomed" (%) that makes the scoped
 * view track 1:1 with hipfire at the centre of the screen — i.e. focal-length
 * / 0% monitor-distance matching. For a scope that magnifies by `magnification`,
 * the answer is simply 100 / magnification.
 */
export function zoomRelativeFromMagnification(magnification: number): number {
  return 100 / magnification;
}

/**
 * Same 0% monitor-distance match expressed via field-of-view instead of a
 * magnification factor. FOVs are in degrees (horizontal or vertical, as long
 * as both use the same axis).
 */
export function zoomRelativeFromFov(baseFov: number, zoomFov: number): number {
  const toHalfRad = (deg: number) => (deg / 2) * (Math.PI / 180);
  return 100 * (Math.tan(toHalfRad(zoomFov)) / Math.tan(toHalfRad(baseFov)));
}

/** Round to a sensible number of decimals for display. */
export function round(value: number, decimals = 3): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
