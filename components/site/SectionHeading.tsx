import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional right-aligned link (e.g. "전체 보기"). */
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-sm font-medium text-brand">{eyebrow}</p>
        ) : null}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-muted">{description}</p>
        ) : null}
      </div>
      {href && linkLabel ? (
        <Link
          href={href}
          className="shrink-0 text-sm text-muted transition-colors hover:text-brand"
        >
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );
}
