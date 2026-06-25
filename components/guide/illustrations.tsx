/**
 * Theme-aware SVG diagrams embedded in the guide MDX. Colors come from the
 * Tailwind `fill-*` / `stroke-*` utilities generated from the @theme palette.
 */

const svgClass = "h-auto w-full max-w-md";

/** Small crosshair mark drawn at (x, y). */
function Cross({ x, y, c = "fill-fg" }: { x: number; y: number; c?: string }) {
  const s = c.replace("fill-", "stroke-");
  return (
    <g>
      <line x1={x - 11} y1={y} x2={x - 4} y2={y} className={s} strokeWidth="2" />
      <line x1={x + 4} y1={y} x2={x + 11} y2={y} className={s} strokeWidth="2" />
      <line x1={x} y1={y - 11} x2={x} y2={y - 4} className={s} strokeWidth="2" />
      <line x1={x} y1={y + 4} x2={x} y2={y + 11} className={s} strokeWidth="2" />
      <circle cx={x} cy={y} r="1.6" className={c} />
    </g>
  );
}

/* ── Guide 1: desk / posture ─────────────────────────────────────────── */
export function DeskSetupDiagram() {
  return (
    <svg viewBox="0 0 440 320" className={svgClass} role="img" aria-label="책상 자세를 위에서 본 그림">
      <defs>
        <marker id="a-desk" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 z" className="fill-muted" />
        </marker>
      </defs>
      {/* desk surface */}
      <rect x="16" y="18" width="408" height="286" rx="6" className="fill-none stroke-border" strokeWidth="1.5" />
      {/* monitor (far edge) */}
      <rect x="158" y="40" width="124" height="14" rx="3" className="fill-surface-2 stroke-muted" strokeWidth="2" />
      <line x1="208" y1="54" x2="208" y2="62" className="stroke-muted" strokeWidth="2" />
      <line x1="232" y1="54" x2="232" y2="62" className="stroke-muted" strokeWidth="2" />
      <text x="220" y="33" fontSize="12" textAnchor="middle" className="fill-muted">모니터</text>
      {/* large mousepad (right) */}
      <rect x="286" y="116" width="130" height="134" rx="8" className="fill-bg stroke-brand" strokeWidth="1.5" />
      <text x="351" y="135" fontSize="11" textAnchor="middle" className="fill-brand">큰 마우스패드</text>
      <ellipse cx="351" cy="194" rx="13" ry="20" className="fill-surface-2 stroke-fg" strokeWidth="1.5" />
      <line x1="351" y1="178" x2="351" y2="190" className="stroke-muted" strokeWidth="1" />
      {/* keyboard */}
      <rect x="120" y="150" width="132" height="46" rx="5" className="fill-surface-2 stroke-muted" strokeWidth="2" />
      <g className="stroke-border" strokeWidth="1">
        <line x1="120" y1="166" x2="252" y2="166" />
        <line x1="120" y1="181" x2="252" y2="181" />
      </g>
      <text x="186" y="214" fontSize="11" textAnchor="middle" className="fill-muted">키보드</text>
      {/* player (near edge): shoulders + head from above */}
      <ellipse cx="210" cy="292" rx="76" ry="18" className="fill-surface-2 stroke-muted" strokeWidth="2" />
      <circle cx="210" cy="282" r="16" className="fill-bg stroke-fg" strokeWidth="2" />
      {/* left arm to keyboard */}
      <path d="M156 286 L140 248 L176 196" className="stroke-fg" strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {/* right arm to mouse */}
      <path d="M264 286 L296 246" className="stroke-fg" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M296 246 L344 206" className="stroke-fg" strokeWidth="4" fill="none" strokeLinecap="round" />
      <line x1="330" y1="226" x2="360" y2="256" className="stroke-border" strokeWidth="1.5" />
      <text x="362" y="252" fontSize="11" className="fill-muted">마우스 잡는</text>
      <text x="362" y="266" fontSize="11" className="fill-muted">팔·손</text>
      {/* viewing distance (depth) */}
      <line x1="44" y1="56" x2="44" y2="278" className="stroke-muted" strokeWidth="1.5" markerStart="url(#a-desk)" markerEnd="url(#a-desk)" />
      <text x="34" y="167" fontSize="11" textAnchor="middle" transform="rotate(-90 34 167)" className="fill-muted">화면까지 50–70cm</text>
    </svg>
  );
}

/* ── Guide 2: hand on mouse (finger positions) ──────────────────────── */
export function GripHandDiagram() {
  return (
    <svg viewBox="0 0 380 270" className={svgClass} role="img" aria-label="마우스를 잡은 손 — 손가락 위치">
      {/* mouse */}
      <ellipse cx="190" cy="120" rx="52" ry="84" className="fill-surface-2 stroke-border" strokeWidth="2" />
      <line x1="190" y1="40" x2="190" y2="110" className="stroke-border" strokeWidth="2" />
      <rect x="184" y="58" width="12" height="22" rx="6" className="fill-bg stroke-muted" strokeWidth="1.5" />
      {/* hand: fingers then palm on top to join the bases */}
      <g className="stroke-fg" strokeWidth="13" strokeLinecap="round" fill="none">
        <path d="M176 198 L168 74" />
        <path d="M202 200 L214 72" />
        <path d="M214 202 L244 128" />
        <path d="M220 206 L250 162" />
        <path d="M160 212 L134 152" />
      </g>
      <ellipse cx="190" cy="216" rx="46" ry="26" className="fill-surface-2 stroke-fg" strokeWidth="2" />
      {/* contact highlights (the two ‘push’ points) */}
      <circle cx="134" cy="150" r="10" className="fill-none stroke-brand" strokeWidth="2.5" />
      <circle cx="244" cy="140" r="10" className="fill-none stroke-brand" strokeWidth="2.5" />
      {/* labels */}
      <text x="150" y="46" fontSize="11" textAnchor="middle" className="fill-muted">검지</text>
      <text x="226" y="44" fontSize="11" textAnchor="middle" className="fill-muted">중지</text>
      <line x1="122" y1="150" x2="96" y2="150" className="stroke-border" strokeWidth="1.5" />
      <text x="92" y="147" fontSize="12" textAnchor="end" className="fill-brand">엄지</text>
      <line x1="256" y1="140" x2="288" y2="140" className="stroke-border" strokeWidth="1.5" />
      <text x="292" y="137" fontSize="12" className="fill-brand">약지·새끼</text>
      <text x="292" y="152" fontSize="10" className="fill-muted">밑동</text>
    </svg>
  );
}

/* ── Guide 3a: external rotation ─────────────────────────────────────── */
export function WristRotationDiagram() {
  return (
    <svg viewBox="0 0 360 220" className={svgClass} role="img" aria-label="손목 외회전 비교">
      {/* left: flat */}
      <line x1="24" y1="160" x2="164" y2="160" className="stroke-border" strokeWidth="2" />
      <ellipse cx="94" cy="146" rx="52" ry="15" className="fill-surface-2 stroke-muted" strokeWidth="2" />
      <text x="94" y="190" fontSize="12" textAnchor="middle" className="fill-target">✗ 평평하게 엎음</text>
      <text x="94" y="206" fontSize="10" textAnchor="middle" className="fill-muted">가동범위 좁음</text>
      {/* right: rotated ~20deg, pinky side down */}
      <line x1="196" y1="160" x2="336" y2="160" className="stroke-border" strokeWidth="2" />
      <g transform="rotate(-20 266 150)">
        <ellipse cx="266" cy="146" rx="52" ry="15" className="fill-surface-2 stroke-brand" strokeWidth="2" />
        {/* thumb side marker (raised side) */}
        <circle cx="314" cy="146" r="5" className="fill-brand" />
      </g>
      <text x="266" y="190" fontSize="12" textAnchor="middle" className="fill-brand">✓ 살짝 외회전</text>
      <text x="266" y="206" fontSize="10" textAnchor="middle" className="fill-muted">엄지 쪽이 살짝 ↑</text>
    </svg>
  );
}

/* ── Guide 3b: wrist motion 좌우 vs 앞뒤 ─────────────────────────────── */
export function WristMotionDiagram() {
  return (
    <svg viewBox="0 0 360 220" className={svgClass} role="img" aria-label="손목 움직임 좌우 vs 앞뒤">
      {/* left: side-to-side, small range */}
      <circle cx="94" cy="170" r="4" className="fill-muted" />
      <path d="M94 170 L70 96" className="stroke-target" strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <path d="M94 170 L118 96" className="stroke-target" strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <path d="M94 170 L94 92" className="stroke-fg" strokeWidth="2.5" fill="none" />
      <path d="M73 108 A 84 84 0 0 1 115 108" className="stroke-target" strokeWidth="1.5" fill="none" />
      <text x="94" y="200" fontSize="12" textAnchor="middle" className="fill-target">✗ 좌우 (편위)</text>
      <text x="94" y="215" fontSize="10" textAnchor="middle" className="fill-muted">좁고 부담 ↑</text>
      {/* right: front-back, large range */}
      <circle cx="266" cy="170" r="4" className="fill-muted" />
      <path d="M266 170 L196 138" className="stroke-brand" strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <path d="M266 170 L266 86" className="stroke-brand" strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <path d="M266 170 L232 104" className="stroke-fg" strokeWidth="2.5" fill="none" />
      <path d="M201 146 A 82 82 0 0 1 266 88" className="stroke-brand" strokeWidth="1.5" fill="none" />
      <text x="266" y="200" fontSize="12" textAnchor="middle" className="fill-brand">✓ 앞뒤 (굴곡·신전)</text>
      <text x="266" y="215" fontSize="10" textAnchor="middle" className="fill-muted">넓고 안전</text>
    </svg>
  );
}

/* ── Guide 4: tracking line ──────────────────────────────────────────── */
export function TrackingLineDiagram() {
  return (
    <svg viewBox="0 0 380 220" className={svgClass} role="img" aria-label="트래킹 세로선 심상">
      {/* overshoot zone (right of line) */}
      <rect x="210" y="20" width="150" height="180" className="fill-target" opacity="0.08" />
      {/* target */}
      <circle cx="210" cy="112" r="34" className="fill-target" opacity="0.22" />
      <circle cx="210" cy="112" r="34" className="fill-none stroke-target" strokeWidth="2" />
      {/* center vertical line */}
      <line x1="210" y1="22" x2="210" y2="198" className="stroke-brand" strokeWidth="2" strokeDasharray="6 5" />
      <text x="216" y="36" fontSize="11" className="fill-brand">타겟 중앙 세로선</text>
      {/* crosshair hugging the line from the left */}
      <Cross x={192} y={112} c="fill-fg" />
      <text x="150" y="150" fontSize="11" textAnchor="middle" className="fill-fg">✓ 가깝게 붙이기</text>
      {/* overshoot label */}
      <text x="284" y="180" fontSize="11" textAnchor="middle" className="fill-target">✗ 넘지 말 것</text>
      <text x="284" y="194" fontSize="10" textAnchor="middle" className="fill-muted">(오버에임)</text>
    </svg>
  );
}

/* ── Guide 5a: cover pre-aim ─────────────────────────────────────────── */
export function CoverPreaimDiagram() {
  return (
    <svg viewBox="0 0 380 220" className={svgClass} role="img" aria-label="엄폐물 프리에임">
      {/* cover */}
      <rect x="40" y="96" width="120" height="104" rx="4" className="fill-surface-2 stroke-border" strokeWidth="2" />
      <text x="100" y="152" fontSize="12" textAnchor="middle" className="fill-muted">엄폐물</text>
      {/* head-height dashed line */}
      <line x1="160" y1="118" x2="330" y2="118" className="stroke-border" strokeWidth="1.5" strokeDasharray="5 5" />
      {/* enemy peeking from right edge of cover */}
      <circle cx="196" cy="116" r="13" className="fill-surface-2 stroke-fg" strokeWidth="2" />
      <path d="M196 129 L196 184 M196 144 L176 166 M196 144 L214 166" className="stroke-fg" strokeWidth="2" fill="none" />
      {/* pre-aim crosshair at cover edge / head height */}
      <Cross x={168} y={116} c="fill-brand" />
      <text x="250" y="100" fontSize="11" textAnchor="middle" className="fill-brand">여기 미리 조준</text>
      <text x="250" y="206" fontSize="11" textAnchor="middle" className="fill-muted">모서리 · 머리 높이</text>
    </svg>
  );
}

/* ── Guide 5b: hitbox aim zones ──────────────────────────────────────── */
export function HitboxDiagram() {
  return (
    <svg viewBox="0 0 260 250" className={svgClass} role="img" aria-label="히트박스 조준 위치">
      {/* head zone */}
      <circle cx="130" cy="56" r="26" className="fill-brand" opacity="0.18" />
      <circle cx="130" cy="56" r="20" className="fill-surface-2 stroke-brand" strokeWidth="2" />
      {/* body */}
      <rect x="98" y="86" width="64" height="86" rx="10" className="fill-accent" opacity="0.14" />
      <rect x="98" y="86" width="64" height="86" rx="10" className="fill-none stroke-accent" strokeWidth="2" />
      {/* arms/legs hint */}
      <path d="M98 104 L78 150 M162 104 L182 150 M114 172 L108 214 M146 172 L152 214" className="stroke-muted" strokeWidth="2" fill="none" />
      {/* labels */}
      <line x1="156" y1="56" x2="210" y2="56" className="stroke-border" strokeWidth="1.5" />
      <text x="214" y="53" fontSize="12" className="fill-brand">머리</text>
      <text x="214" y="68" fontSize="10" className="fill-muted">한 방 각</text>
      <line x1="162" y1="130" x2="210" y2="130" className="stroke-border" strokeWidth="1.5" />
      <text x="214" y="127" fontSize="12" className="fill-accent">몸통</text>
      <text x="214" y="142" fontSize="10" className="fill-muted">안정적 명중</text>
    </svg>
  );
}
