import Link from "next/link";
import type { ReactNode } from "react";

type FeatureCardProps = {
  href: string;
  title: string;
  description: string;
  icon?: ReactNode;
  badge?: string;
};

/** Linked surface card used across hub pages. */
export function FeatureCard({
  href,
  title,
  description,
  icon,
  badge,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-brand/60 hover:bg-surface-2"
    >
      <div className="flex items-center justify-between">
        {icon ? <span className="text-brand">{icon}</span> : null}
        {badge ? (
          <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
            {badge}
          </span>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold text-fg group-hover:text-brand">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </Link>
  );
}
