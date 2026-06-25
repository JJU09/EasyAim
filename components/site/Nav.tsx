"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crosshair } from "./Crosshair";

const links = [
  { href: "/guide", label: "가이드" },
  { href: "/practice", label: "연습" },
  { href: "/tools", label: "도구" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-fg"
        >
          <Crosshair size={22} className="text-brand" />
          <span>
            Easy<span className="text-brand">Aim</span>
          </span>
        </Link>

        <ul className="flex items-center gap-1 text-sm">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-md px-3 py-2 transition-colors ${
                    active
                      ? "bg-surface text-brand"
                      : "text-muted hover:bg-surface hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
