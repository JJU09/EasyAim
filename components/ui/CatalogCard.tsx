import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  /** Present when the item is live; omit for "soon". */
  href?: string;
  /** Small right-aligned label (e.g. difficulty). */
  meta?: string;
  icon?: ReactNode;
  soon?: boolean;
};

/** Catalog item used on the tools & practice hubs. Links when live, dims when soon. */
export function CatalogCard({ title, description, href, meta, icon, soon }: Props) {
  const Head = (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon ? <span className="text-brand">{icon}</span> : null}
          <h3
            className={`text-lg font-semibold ${
              soon ? "text-muted" : "text-fg group-hover:text-brand"
            }`}
          >
            {title}
          </h3>
        </div>
        {soon ? (
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted">
            준비 중
          </span>
        ) : meta ? (
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted">
            {meta}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </>
  );

  const base = "flex flex-col rounded-xl border p-5";

  if (soon || !href) {
    return (
      <div className={`${base} border-border bg-surface/50 opacity-70`} aria-disabled>
        {Head}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} group border-border bg-surface transition-colors hover:border-brand/60 hover:bg-surface-2`}
    >
      {Head}
    </Link>
  );
}
