import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand text-bg hover:bg-brand-dim font-medium shadow-[0_0_0_1px] shadow-brand/30",
  ghost: "border border-border text-fg hover:bg-surface",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm transition-colors";

type LinkButtonProps = ComponentProps<typeof Link> & { variant?: Variant };

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkButtonProps) {
  return <Link className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
