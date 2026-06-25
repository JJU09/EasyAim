"use client";

import { useId, useState } from "react";

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  suffix?: string;
  hint?: string;
};

/** Numeric input with a local text buffer so partial/empty typing stays smooth. */
export function NumberField({
  label,
  value,
  onChange,
  step = 0.01,
  min = 0,
  suffix,
  hint,
}: NumberFieldProps) {
  const id = useId();
  const [text, setText] = useState(String(value));
  // Re-sync the text buffer when the controlled value changes externally
  // (e.g. a preset or store update) — adjust state during render, no effect.
  const [syncedValue, setSyncedValue] = useState(value);
  if (syncedValue !== value) {
    setSyncedValue(value);
    if (Number(text) !== value) setText(String(value));
  }

  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-fg">{label}</span>
      <div className="flex items-center rounded-lg border border-border bg-surface focus-within:border-brand/70">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            const n = parseFloat(e.target.value);
            if (!Number.isNaN(n)) onChange(n);
          }}
          className="w-full bg-transparent px-3 py-2.5 text-fg outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix ? (
          <span className="px-3 text-sm text-muted">{suffix}</span>
        ) : null}
      </div>
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

type Option = { value: string; label: string };

type SelectFieldProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-fg">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-border bg-surface px-3 py-2.5 text-fg outline-none focus:border-brand/70"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type ResultCardProps = {
  label: string;
  value: string;
  unit?: string;
  emphasis?: boolean;
};

export function ResultCard({ label, value, unit, emphasis }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        emphasis ? "border-brand/50 bg-brand/5" : "border-border bg-surface"
      }`}
    >
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 flex items-baseline gap-1">
        <span
          className={`font-mono text-3xl font-semibold tracking-tight ${
            emphasis ? "text-brand" : "text-fg"
          }`}
        >
          {value}
        </span>
        {unit ? <span className="text-sm text-muted">{unit}</span> : null}
      </p>
    </div>
  );
}
