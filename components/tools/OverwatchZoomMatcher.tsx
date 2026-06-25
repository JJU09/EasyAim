"use client";

import { useMemo, useState } from "react";
import {
  zoomRelativeFromFov,
  zoomRelativeFromMagnification,
  round,
} from "@/lib/sens/convert";
import { NumberField, ResultCard } from "./fields";

type Mode = "mag" | "fov";
const magPresets = [1, 1.25, 1.5, 2];

export function OverwatchZoomMatcher() {
  const [mode, setMode] = useState<Mode>("mag");
  const [mag, setMag] = useState(1.5);
  const [baseFov, setBaseFov] = useState(103);
  const [zoomFov, setZoomFov] = useState(70);

  const relative = useMemo(() => {
    return mode === "mag"
      ? zoomRelativeFromMagnification(mag)
      : zoomRelativeFromFov(baseFov, zoomFov);
  }, [mode, mag, baseFov, zoomFov]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-4">
        <div className="flex rounded-lg border border-border bg-surface p-1 text-sm">
          {(
            [
              ["mag", "줌 배율로"],
              ["fov", "FOV로"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 rounded-md px-3 py-2 transition-colors ${
                mode === m ? "bg-brand text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === "mag" ? (
          <>
            <NumberField
              label="조준경 줌 배율"
              value={mag}
              onChange={setMag}
              step={0.05}
              min={1}
              suffix="×"
              hint="조준경이 화면을 몇 배 확대하는지. 대부분의 조준경은 1.3~2.0× 사이입니다."
            />
            <div className="flex flex-wrap gap-2">
              {magPresets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setMag(p)}
                  className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    mag === p
                      ? "border-brand/60 bg-brand/10 text-brand"
                      : "border-border text-muted hover:text-fg"
                  }`}
                >
                  {p.toFixed(2)}×
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <NumberField
              label="기본 FOV"
              value={baseFov}
              onChange={setBaseFov}
              step={1}
              suffix="°"
              hint="오버워치 기본 시야각(최대 103)."
            />
            <NumberField
              label="조준경 FOV"
              value={zoomFov}
              onChange={setZoomFov}
              step={1}
              suffix="°"
            />
          </>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <ResultCard
          label="조준 시 상대 감도 (Relative Aim Sensitivity While Zoomed)"
          value={String(round(relative, 1))}
          unit="%"
          emphasis
        />
        <div className="rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <p className="mb-2 font-medium text-fg">설정 위치</p>
          <p>
            오버워치 2 → 설정 → 컨트롤 → (영웅 선택) →
            <span className="text-fg"> 조준 시 상대 감도</span> 값에 위 숫자를 입력하세요.
          </p>
        </div>
        <p className="text-xs leading-relaxed text-muted">
          이 값은 화면 중앙 기준 1:1(focal length, 0% 모니터 거리) 매칭입니다. 조준경을
          켜도 타겟이 화면에서 같은 속도로 움직여 “동일한 손맛”을 느끼게 해줍니다.
        </p>
      </div>
    </div>
  );
}
