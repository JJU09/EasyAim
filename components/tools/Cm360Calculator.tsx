"use client";

import { useMemo, useState } from "react";
import { GAMES, getGame } from "@/lib/sens/games";
import {
  cm360FromSens,
  inches360FromSens,
  sensFromCm360,
  round,
} from "@/lib/sens/convert";
import { useSettings } from "@/store/useSettings";
import { NumberField, SelectField, ResultCard } from "./fields";

const gameOptions = GAMES.map((g) => ({ value: g.id, label: g.name }));
type Mode = "fromSens" | "fromCm";

export function Cm360Calculator() {
  const [gameId, setGameId] = useState("valorant");
  const [mode, setMode] = useState<Mode>("fromSens");
  const [sens, setSens] = useState(getGame("valorant")!.defaultSens);

  const dpi = useSettings((s) => s.dpi);
  const setDpi = useSettings((s) => s.setDpi);
  const cm360Setting = useSettings((s) => s.cm360);
  const setCm360 = useSettings((s) => s.setCm360);

  const game = getGame(gameId)!;

  const result = useMemo(() => {
    if (mode === "fromSens") {
      return {
        cm360: cm360FromSens(sens, game.yaw, dpi),
        inches: inches360FromSens(sens, game.yaw, dpi),
        sens,
      };
    }
    const s = sensFromCm360(cm360Setting, game.yaw, dpi);
    return {
      cm360: cm360Setting,
      inches: cm360Setting / 2.54,
      sens: s,
    };
  }, [mode, sens, cm360Setting, game, dpi]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-4">
        <div className="flex rounded-lg border border-border bg-surface p-1 text-sm">
          {(
            [
              ["fromSens", "감도 → cm/360"],
              ["fromCm", "cm/360 → 감도"],
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

        <SelectField
          label="게임"
          value={gameId}
          options={gameOptions}
          onChange={setGameId}
        />
        <NumberField
          label="마우스 DPI"
          value={dpi}
          onChange={setDpi}
          step={50}
          suffix="DPI"
        />
        {mode === "fromSens" ? (
          <NumberField
            label={`${game.name} 감도`}
            value={sens}
            onChange={setSens}
            step={0.01}
          />
        ) : (
          <NumberField
            label="목표 cm/360"
            value={cm360Setting}
            onChange={setCm360}
            step={1}
            suffix="cm"
            hint="여기서 바꾼 값은 연습 기본값으로도 저장됩니다."
          />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <ResultCard
          label="cm/360"
          value={String(round(result.cm360, 2))}
          unit="cm"
          emphasis={mode === "fromSens"}
        />
        <ResultCard label="inch/360" value={String(round(result.inches, 2))} unit="in" />
        {mode === "fromCm" ? (
          <ResultCard
            label={`${game.name} 감도`}
            value={String(round(result.sens, 4))}
            emphasis
          />
        ) : null}
        <p className="text-xs leading-relaxed text-muted">
          cm/360은 360°를 도는 데 필요한 실제 마우스 이동 거리입니다. 숫자가 클수록 낮은
          감도(로우 센)예요.
        </p>
      </div>
    </div>
  );
}
