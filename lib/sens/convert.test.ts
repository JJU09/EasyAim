import { describe, it, expect } from "vitest";
import {
  countsPer360,
  cm360FromSens,
  sensFromCm360,
  convertSens,
  overwatchZoomRelative,
} from "./convert";

const YAW = { cs2: 0.022, valorant: 0.07, overwatch: 0.0066 };

describe("cm/360 math", () => {
  it("counts per 360 at CS2 sens 1", () => {
    expect(countsPer360(1, YAW.cs2)).toBeCloseTo(16363.64, 1);
  });

  it("Valorant 0.4 @ 800 DPI ≈ 40.8 cm/360", () => {
    expect(cm360FromSens(0.4, YAW.valorant, 800)).toBeCloseTo(40.82, 1);
  });

  it("cm360 → sens is the inverse of sens → cm360", () => {
    const cm = cm360FromSens(1.2, YAW.cs2, 800);
    expect(sensFromCm360(cm, YAW.cs2, 800)).toBeCloseTo(1.2, 6);
  });
});

describe("game-to-game conversion", () => {
  it("Valorant → CS2 uses the known ~3.18x factor", () => {
    // CS sens = Valorant sens * (0.07 / 0.022) = * 3.1818
    expect(
      convertSens({ sens: 0.4, fromYaw: YAW.valorant, toYaw: YAW.cs2 })
    ).toBeCloseTo(1.2727, 3);
  });

  it("preserves cm/360 across the conversion", () => {
    const dpi = 800;
    const fromCm = cm360FromSens(0.4, YAW.valorant, dpi);
    const toSens = convertSens({ sens: 0.4, fromYaw: YAW.valorant, toYaw: YAW.cs2 });
    expect(cm360FromSens(toSens, YAW.cs2, dpi)).toBeCloseTo(fromCm, 6);
  });

  it("same game (Apex↔CS2, equal yaw) is identity", () => {
    expect(convertSens({ sens: 1.2, fromYaw: 0.022, toYaw: 0.022 })).toBeCloseTo(
      1.2,
      6
    );
  });

  it("accounts for differing DPI", () => {
    // Double the target DPI → half the sensitivity for the same feel.
    const result = convertSens({
      sens: 1.0,
      fromYaw: 0.022,
      toYaw: 0.022,
      fromDpi: 800,
      toDpi: 1600,
    });
    expect(result).toBeCloseTo(0.5, 6);
  });
});

describe("Overwatch zoom 1:1 matching (verified in-game values @ 103 FOV)", () => {
  it("Widowmaker / Ana (30 VFOV) → 37.89%", () => {
    expect(overwatchZoomRelative(103, 30)).toBeCloseTo(37.89, 2);
  });

  it("Ashe / Cassidy (40 VFOV) → 51.47%", () => {
    expect(overwatchZoomRelative(103, 40)).toBeCloseTo(51.47, 2);
  });

  it("Emre (42.5 VFOV) → 54.99%", () => {
    expect(overwatchZoomRelative(103, 42.5)).toBeCloseTo(54.99, 2);
  });

  it("Freja (47.5 VFOV) → 62.22%", () => {
    expect(overwatchZoomRelative(103, 47.5)).toBeCloseTo(62.22, 2);
  });

  it("lower base FOV → higher relative % (less extra zoom to undo)", () => {
    expect(overwatchZoomRelative(90, 30)).toBeGreaterThan(
      overwatchZoomRelative(103, 30)
    );
  });
});
