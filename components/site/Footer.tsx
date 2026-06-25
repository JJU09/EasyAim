import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold text-fg">EasyAim</span> — FPS 입문자를 위한
          조준 학습 도구
        </p>
        <div className="flex gap-4">
          <Link href="/guide" className="hover:text-fg">
            가이드
          </Link>
          <Link href="/practice" className="hover:text-fg">
            연습
          </Link>
          <Link href="/tools" className="hover:text-fg">
            도구
          </Link>
        </div>
      </div>
    </footer>
  );
}
