import { describe, it, expect } from "vitest";
import { TrackingEngine } from "./engine";

// targetSpeed 0 keeps the target stationary at the centre → deterministic.
const make = () =>
  new TrackingEngine({
    width: 100,
    height: 100,
    targetRadius: 10,
    targetSpeed: 0,
    sensitivity: 1,
  });

describe("TrackingEngine scoring", () => {
  it("scores 100% while the crosshair sits on a stationary target", () => {
    const e = make();
    e.update(100);
    e.update(100);
    expect(e.onTarget).toBe(true);
    expect(e.accuracy).toBeCloseTo(100, 5);
  });

  it("drops off target when the crosshair moves away", () => {
    const e = make();
    e.applyMouse(100, 0); // far past the 10px radius
    e.update(100);
    expect(e.onTarget).toBe(false);
    expect(e.accuracy).toBeCloseTo(0, 5);
  });

  it("accuracy reflects the time-on-target ratio", () => {
    const e = make();
    e.update(100); // on target
    e.applyMouse(100, 0); // move off
    e.update(100); // off target
    expect(e.accuracy).toBeCloseTo(50, 5);
  });

  it("applyMouse scales by sensitivity and clamps to the field", () => {
    const e = make();
    e.applyMouse(99999, 99999); // clamp to (100,100)
    e.applyMouse(-99999, -99999); // clamp to (0,0)
    e.applyMouse(50, 50); // back to centre / target
    e.update(50);
    expect(e.onTarget).toBe(true);
  });

  it("setCrosshair places the crosshair at an absolute position (clamped)", () => {
    const e = make(); // stationary target at (50, 50), radius 10
    e.setCrosshair(50, 50);
    e.update(50);
    expect(e.onTarget).toBe(true);

    e.setCrosshair(999, -999); // clamp to (100, 0) — off target
    e.update(50);
    expect(e.onTarget).toBe(false);
  });
});
