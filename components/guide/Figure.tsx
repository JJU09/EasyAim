import type { ReactNode } from "react";

/** Diagram wrapper used inside guide MDX — panel + optional caption. */
export function Figure({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: string;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-center bg-[#0f1115] p-5 sm:p-7">
        {children}
      </div>
      {caption ? (
        <figcaption className="border-t border-border px-4 py-2.5 text-center text-xs text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
