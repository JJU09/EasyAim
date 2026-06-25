type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {eyebrow ? (
          <p className="mb-2 text-sm font-medium text-brand">{eyebrow}</p>
        ) : null}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-muted">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
