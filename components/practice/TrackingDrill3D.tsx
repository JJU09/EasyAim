"use client";

import { useEffect, useRef, useState } from "react";
import { TrackingEngine3D } from "@/lib/aim/engine3d";
import { requestPointerLock, exitPointerLock } from "@/lib/aim/pointerLock";
import { useSettings } from "@/store/useSettings";

const DIFFICULTY = {
  easy: { label: "쉬움", radius: 1.0, speed: 4.5 },
  normal: { label: "보통", radius: 0.75, speed: 6.5 },
  hard: { label: "어려움", radius: 0.55, speed: 9 },
} as const;
type DiffKey = keyof typeof DIFFICULTY;
const DURATIONS = [30, 60] as const;

type Status = "idle" | "running" | "finished";

/** Camera yaw/pitch radians per mouse count, from the user's cm/360 + DPI. */
function radiansPerCount(cm360: number, dpi: number): number {
  const counts360 = (cm360 / 2.54) * dpi;
  return (2 * Math.PI) / counts360;
}

export function TrackingDrill3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<TrackingEngine3D | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const timeLeftRef = useRef(0);
  const hudAccumRef = useRef(0);
  const statusRef = useRef<Status>("idle");
  const wasLockedRef = useRef(false);
  const startRunRef = useRef<() => void>(() => {});

  const cm360 = useSettings((s) => s.cm360);
  const dpi = useSettings((s) => s.dpi);
  const recordBest = useSettings((s) => s.recordBest);
  const bests = useSettings((s) => s.bests);

  const [difficulty, setDifficulty] = useState<DiffKey>("normal");
  const [duration, setDuration] = useState<number>(30);
  const [status, setStatus] = useState<Status>("idle");
  const [hud, setHud] = useState({ timeLeft: 0, accuracy: 0, overaim: false });
  const [result, setResult] = useState<{ accuracy: number; best: boolean } | null>(
    null
  );
  const [supported, setSupported] = useState(true);

  const durationRef = useRef(duration);
  const difficultyRef = useRef(difficulty);
  const sensRef = useRef(radiansPerCount(cm360, dpi));
  const recordBestRef = useRef(recordBest);
  useEffect(() => {
    durationRef.current = duration;
    difficultyRef.current = difficulty;
    sensRef.current = radiansPerCount(cm360, dpi);
    recordBestRef.current = recordBest;
  });

  const bestKey = `tracking3d:${duration}:${difficulty}`;
  const best = bests[bestKey] ?? 0;

  useEffect(() => {
    const hasFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(hasFinePointer);

    const canvas = canvasRef.current;
    if (!canvas) return;

    let engine: TrackingEngine3D;
    try {
      engine = new TrackingEngine3D(canvas, {
        targetRadius: DIFFICULTY.normal.radius,
        targetSpeed: DIFFICULTY.normal.speed,
        sensitivity: sensRef.current,
      });
    } catch {
      setSupported(false);
      return;
    }
    engineRef.current = engine;

    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      engine.resize(rect.width, rect.height);
      engine.render();
    };

    const setStatusBoth = (s: Status) => {
      statusRef.current = s;
      setStatus(s);
    };

    const loop = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      let dt = ts - lastTsRef.current;
      lastTsRef.current = ts;
      if (dt > 50) dt = 50;

      engine.update(dt);
      timeLeftRef.current -= dt;
      engine.render();

      hudAccumRef.current += dt;
      if (hudAccumRef.current >= 100) {
        setHud({
          timeLeft: Math.max(0, timeLeftRef.current),
          accuracy: engine.accuracy,
          overaim: engine.overaim,
        });
        hudAccumRef.current = 0;
      }

      if (timeLeftRef.current <= 0) {
        finish(true);
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const startRun = () => {
      const d = DIFFICULTY[difficultyRef.current];
      engine.setConfig({
        targetRadius: d.radius,
        targetSpeed: d.speed,
        sensitivity: sensRef.current,
      });
      engine.reset();
      timeLeftRef.current = durationRef.current * 1000;
      lastTsRef.current = null;
      hudAccumRef.current = 0;
      setResult(null);
      setHud({ timeLeft: durationRef.current * 1000, accuracy: 0, overaim: false });
      setStatusBoth("running");
      rafRef.current = requestAnimationFrame(loop);
    };

    const finish = (completed: boolean) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      const acc = engine.accuracy;
      setStatusBoth("finished");
      setHud({ timeLeft: 0, accuracy: acc, overaim: false });
      let isBest = false;
      if (completed) {
        const key = `tracking3d:${durationRef.current}:${difficultyRef.current}`;
        isBest = recordBestRef.current(key, Number(acc.toFixed(1)));
      }
      setResult({ accuracy: acc, best: isBest });
      engine.render();
      exitPointerLock();
    };

    const onMouseMove = (ev: MouseEvent) => {
      if (statusRef.current === "running") {
        engineRef.current?.applyMouse(ev.movementX, ev.movementY);
      }
    };

    const onLockChange = () => {
      const locked = document.pointerLockElement === canvas;
      if (!locked && wasLockedRef.current && statusRef.current === "running") {
        finish(false);
      }
      wasLockedRef.current = locked;
    };

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape" && statusRef.current === "running") finish(false);
    };

    startRunRef.current = startRun;

    fit();
    window.addEventListener("resize", fit);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onLockChange);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", fit);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onLockChange);
      document.removeEventListener("keydown", onKeyDown);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      engine.dispose();
    };
  }, []);

  const startDrill = () => {
    if (!supported) return;
    startRunRef.current();
    const canvas = canvasRef.current;
    if (canvas) requestPointerLock(canvas);
  };

  const secondsLeft = Math.ceil(hud.timeLeft / 1000);

  return (
    <div className="flex flex-col gap-6">
      {!supported ? (
        <p className="rounded-lg border border-target/40 bg-target/5 px-4 py-3 text-sm text-fg">
          이 드릴은 마우스 + WebGL 지원 데스크톱 브라우저가 필요합니다.
        </p>
      ) : null}

      <div className="relative">
        <canvas
          ref={canvasRef}
          onClick={status !== "running" ? startDrill : undefined}
          className="aim-surface aspect-video w-full rounded-xl border border-border bg-[#0f1115]"
        />

        {/* fixed centre crosshair — turns red on overaim, label is absolutely
            positioned so it never shifts the crosshair */}
        {status === "running" ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              className={hud.overaim ? "text-target" : "text-fg"}
            >
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="11" x2="7" y2="11" />
                <line x1="15" y1="11" x2="21" y2="11" />
                <line x1="11" y1="1" x2="11" y2="7" />
                <line x1="11" y1="15" x2="11" y2="21" />
              </g>
              <circle cx="11" cy="11" r="1.4" fill="currentColor" />
            </svg>
            {hud.overaim ? (
              <span className="absolute left-1/2 top-[calc(50%+18px)] -translate-x-1/2 rounded bg-bg/70 px-1.5 text-xs font-medium text-target">
                오버에임
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Running HUD */}
        {status === "running" ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="rounded-md bg-bg/70 px-3 py-1.5 font-mono text-sm text-fg">
              ⏱ {secondsLeft}s
            </span>
            <span className="rounded-md bg-bg/70 px-3 py-1.5 font-mono text-sm text-brand">
              {hud.accuracy.toFixed(1)}%
            </span>
            <span className="rounded-md bg-bg/70 px-3 py-1.5 text-xs text-muted">
              ESC로 종료
            </span>
          </div>
        ) : null}

        {/* Idle overlay */}
        {status === "idle" ? (
          <button
            type="button"
            onClick={startDrill}
            disabled={!supported}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-bg/40 backdrop-blur-[1px] transition-colors hover:bg-bg/30 disabled:cursor-not-allowed"
          >
            <span className="rounded-lg bg-brand px-6 py-3 font-medium text-bg">
              클릭하여 시작
            </span>
            <span className="text-sm text-muted">
              마우스로 시야를 돌려 타겟을 추적하세요
            </span>
          </button>
        ) : null}

        {/* Finished overlay */}
        {status === "finished" && result ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-bg/70 backdrop-blur-sm">
            <p className="text-sm text-muted">정확도</p>
            <p className="font-mono text-6xl font-bold text-brand">
              {result.accuracy.toFixed(1)}
              <span className="text-2xl text-muted">%</span>
            </p>
            {result.best ? (
              <span className="rounded-full border border-brand/50 bg-brand/10 px-3 py-1 text-sm text-brand">
                🏆 최고 기록 갱신!
              </span>
            ) : (
              <span className="text-sm text-muted">최고 기록 {best.toFixed(1)}%</span>
            )}
            <button
              type="button"
              onClick={startDrill}
              className="mt-2 rounded-lg bg-brand px-6 py-2.5 font-medium text-bg hover:bg-brand-dim"
            >
              다시 시작
            </button>
          </div>
        ) : null}
      </div>

      {/* Settings */}
      <div
        className={`grid gap-5 sm:grid-cols-3 ${
          status === "running" ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg">난이도</span>
          <div className="flex gap-2">
            {(Object.keys(DIFFICULTY) as DiffKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setDifficulty(k)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  difficulty === k
                    ? "border-brand/60 bg-brand/10 text-brand"
                    : "border-border text-muted hover:text-fg"
                }`}
              >
                {DIFFICULTY[k].label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg">시간</span>
          <div className="flex gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuration(d)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  duration === d
                    ? "border-brand/60 bg-brand/10 text-brand"
                    : "border-border text-muted hover:text-fg"
                }`}
              >
                {d}초
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg">실제 감도</span>
          <div className="rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-muted">
            <span className="font-mono text-fg">{cm360}</span> cm/360 ·{" "}
            <span className="font-mono text-fg">{dpi}</span> DPI
          </div>
          <p className="text-xs text-muted">
            <a href="/tools/cm360" className="text-brand hover:underline">
              cm/360 계산기
            </a>
            에서 바꾸면 여기에 반영됩니다.
          </p>
        </div>
      </div>

      <p className="text-sm text-muted">
        현재 설정 최고 기록:{" "}
        <span className="font-mono text-fg">{best.toFixed(1)}%</span>
      </p>
    </div>
  );
}
