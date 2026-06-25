"use client";

import { useMemo, useState } from "react";
import { GAMES, getGame } from "@/lib/sens/games";
import { cm360FromSens, convertSens, round } from "@/lib/sens/convert";
import { useSettings } from "@/store/useSettings";
import { NumberField, SelectField, ResultCard } from "./fields";

const gameOptions = GAMES.map((g) => ({ value: g.id, label: g.name }));

export function SensitivityConverter() {
  const [fromId, setFromId] = useState("valorant");
  const [toId, setToId] = useState("cs2");
  const [sens, setSens] = useState(getGame("valorant")!.defaultSens);

  const dpi = useSettings((s) => s.dpi);
  const setDpi = useSettings((s) => s.setDpi);
  const setCm360 = useSettings((s) => s.setCm360);

  const from = getGame(fromId)!;
  const to = getGame(toId)!;

  const { converted, cm360 } = useMemo(() => {
    const converted = convertSens({ sens, fromYaw: from.yaw, toYaw: to.yaw });
    const cm360 = cm360FromSens(sens, from.yaw, dpi);
    return { converted, cm360 };
  }, [sens, from, to, dpi]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      {/* Inputs */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <SelectField
            label="원본 게임"
            value={fromId}
            options={gameOptions}
            onChange={(v) => {
              setFromId(v);
              setSens(getGame(v)!.defaultSens);
            }}
          />
          <SelectField
            label="대상 게임"
            value={toId}
            options={gameOptions}
            onChange={setToId}
          />
        </div>
        <NumberField
          label={`${from.name} 감도`}
          value={sens}
          onChange={setSens}
          step={0.01}
        />
        <NumberField
          label="마우스 DPI"
          value={dpi}
          onChange={setDpi}
          step={50}
          suffix="DPI"
          hint="두 게임 모두 같은 DPI를 쓴다고 가정합니다. cm/360 표시에 사용돼요."
        />
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4">
        <ResultCard
          label={`${to.name} 감도`}
          value={String(round(converted, 4))}
          emphasis
        />
        <ResultCard label="cm/360 (손맛 기준)" value={String(round(cm360, 2))} unit="cm" />
        <button
          type="button"
          onClick={() => setCm360(round(cm360, 2))}
          className="self-start rounded-lg border border-border px-4 py-2 text-sm text-fg transition-colors hover:border-brand/60 hover:bg-surface"
        >
          이 cm/360을 연습 기본값으로 저장
        </button>
        <p className="text-xs leading-relaxed text-muted">
          변환은 실제 손 이동 거리(cm/360)가 동일하도록 계산됩니다. 같은 DPI라면 변환된
          감도는 DPI와 무관합니다.
        </p>
      </div>
    </div>
  );
}
