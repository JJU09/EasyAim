import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

/** Global MDX element styling — matches the dark theme. Required by @next/mdx. */
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-2 text-3xl font-bold tracking-tight text-fg">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-fg">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 text-xl font-semibold text-fg">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 leading-relaxed text-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-muted marker:text-brand">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted marker:text-brand">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-fg">{children}</strong>
  ),
  a: ({ href = "", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const className = "text-brand underline-offset-2 hover:underline";
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l-2 border-brand/60 bg-surface px-4 py-2 text-muted">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-brand">
      {children}
    </code>
  ),
  hr: () => <hr className="my-8 border-border" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
