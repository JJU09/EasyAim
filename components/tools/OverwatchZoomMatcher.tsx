"use client";

import { useMemo, useState } from "react";
import { overwatchZoomRelative, round } from "@/lib/sens/convert";
import { OW_SCOPES } from "@/lib/sens/games";
import { NumberField, ResultCard } from "./fields";

const CUSTOM = "custom";

export function OverwatchZoomMatcher() {
  const [baseFov, setBaseFov] = useState(103);
  const [scopeId, setScopeId] = useState<string>(OW_SCOPES[0].id);
  const [customVfov, setCustomVfov] = useState(35);

  const isCustom = scopeId === CUSTOM;
  const vfov = isCustom
    ? customVfov
    : (OW_SCOPES.find((s) => s.id === scopeId)?.vfov ?? 30);

  const relative = useMemo(
    () => overwatchZoomRelative(baseFov, vfov),
    [baseFov, vfov]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-4">
        <NumberField
          label="기본 시야각 (FOV)"
          value={baseFov}
          onChange={setBaseFov}
          step={1}
          min={1}
          suffix="°"
          hint="오버워치 설정의 시야각 값 (기본 103)."
        />

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg">조준경 (영웅)</span>
          <div className="grid grid-cols-2 gap-2">
            {OW_SCOPES.map((scope) => (
              <button
                key={scope.id}
                type="button"
                onClick={() => setScopeId(scope.id)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  scopeId === scope.id
                    ? "border-brand/60 bg-brand/10 text-brand"
                    : "border-border text-muted hover:text-fg"
                }`}
              >
                <span className="block">{scope.label}</span>
                <span className="text-xs text-muted">{scope.vfov}° VFOV</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setScopeId(CUSTOM)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                isCustom
                  ? "border-brand/60 bg-brand/10 text-brand"
                  : "border-border text-muted hover:text-fg"
              }`}
            >
              직접 입력
            </button>
          </div>
        </div>

        {isCustom ? (
          <NumberField
            label="조준경 수직 시야각 (VFOV)"
            value={customVfov}
            onChange={setCustomVfov}
            step={0.5}
            min={1}
            suffix="°"
            hint="조준 시 화면의 세로 시야각."
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <ResultCard
          label="조준 시 상대 감도 (Relative Aim Sensitivity While Zoomed)"
          value={String(round(relative, 2))}
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

        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="mb-3 text-sm font-medium text-fg">
            FOV {round(baseFov, 0)}° 기준 영웅별 값
          </p>
          <ul className="flex flex-col gap-1.5 text-sm">
            {OW_SCOPES.map((scope) => (
              <li key={scope.id} className="flex justify-between">
                <span className="text-muted">{scope.label}</span>
                <span className="font-mono text-fg">
                  {round(overwatchZoomRelative(baseFov, scope.vfov), 2)}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs leading-relaxed text-muted">
          화면 중앙 기준 1:1(focal length) 매칭이라 조준경을 켜도 “동일한 손맛”을 줍니다.
          오버워치는 수직 시야각을 16:9에 고정하므로 이 값은 <span className="text-fg">16:9
          이하</span> 해상도에 적용됩니다. 21:9 같은 울트라와이드는 줌이 좌우로 확장돼
          값이 달라집니다.
        </p>
      </div>
    </div>
  );
}
