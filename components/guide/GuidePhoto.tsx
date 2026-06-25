import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  /** Public path, e.g. "/guides/grip.png". */
  src: string;
  alt: string;
  caption?: string;
  /** CSS aspect-ratio for the image frame, e.g. "16 / 9". */
  ratio?: string;
  /** Shown until the image file is added to /public (e.g. the SVG diagram). */
  fallback?: ReactNode;
};

/**
 * Renders a guide illustration. If the image file exists under /public it is
 * shown; otherwise the `fallback` (typically the SVG diagram) is rendered.
 *
 * This lets us drop AI-generated images into `public/guides/` with no code
 * change — the matching slot picks them up on the next build. Runs at build
 * time (guides are statically generated), so the fs check is free at runtime.
 */
export function GuidePhoto({ src, alt, caption, ratio = "16 / 9", fallback }: Props) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));

  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-border bg-surface">
      {exists ? (
        <div className="relative bg-[#0f1115]" style={{ aspectRatio: ratio }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-contain"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center bg-[#0f1115] p-5 sm:p-7">
          {fallback ?? (
            <div className="flex flex-col items-center gap-1 py-10 text-center">
              <span className="text-sm text-muted">이미지 자리</span>
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs text-brand">
                public{src}
              </code>
            </div>
          )}
        </div>
      )}
      {caption ? (
        <figcaption className="border-t border-border px-4 py-2.5 text-center text-xs text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
