import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SettingsState = {
  /** Mouse DPI (counts per inch). */
  dpi: number;
  /** Real-world distance (cm) to turn 360° — the universal aim anchor. */
  cm360: number;
  /** Relative sensitivity multiplier for the in-browser practice drills. */
  practiceSens: number;
  /** Best score per drill, keyed by drill id (e.g. "tracking-30"). */
  bests: Record<string, number>;

  setDpi: (dpi: number) => void;
  setCm360: (cm360: number) => void;
  setPracticeSens: (practiceSens: number) => void;
  /** Record a drill score; returns true when it beats the stored best. */
  recordBest: (drillId: string, score: number) => boolean;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      dpi: 800,
      cm360: 30,
      practiceSens: 1,
      bests: {},

      setDpi: (dpi) => set({ dpi }),
      setCm360: (cm360) => set({ cm360 }),
      setPracticeSens: (practiceSens) => set({ practiceSens }),

      recordBest: (drillId, score) => {
        const prev = get().bests[drillId] ?? 0;
        if (score <= prev) return false;
        set((state) => ({ bests: { ...state.bests, [drillId]: score } }));
        return true;
      },
    }),
    { name: "easyaim-settings" }
  )
);
