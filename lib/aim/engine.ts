/**
 * Framework-agnostic 2D tracking-drill engine.
 *
 * The crosshair is moved by raw mouse deltas (`applyMouse`), a target strafes
 * across the playfield, and the engine accumulates how long the crosshair stays
 * on the target. `accuracy` (% of elapsed time on target) is the score.
 */

export type DrillConfig = {
  width: number;
  height: number;
  /** Target radius in px. */
  targetRadius: number;
  /** Base horizontal target speed in px/s. */
  targetSpeed: number;
  /** Multiplier applied to raw mouse deltas. */
  sensitivity: number;
};

const COLORS = {
  bg: "#0f1115",
  grid: "#1b1f27",
  target: "#ff5c5c",
  targetHit: "#2ee6a8",
  crosshair: "#e7e9ee",
};

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

export class TrackingEngine {
  config: DrillConfig;

  private cx = 0;
  private cy = 0;
  private tx = 0;
  private ty = 0;
  private vx = 0;
  private vy = 0;
  private dirTimer = 0;

  onTargetMs = 0;
  elapsedMs = 0;
  onTarget = false;
  /** Crosshair has overshot past the target's centre line (leading side). */
  overaim = false;

  constructor(config: DrillConfig) {
    this.config = config;
    this.reset();
  }

  setConfig(partial: Partial<DrillConfig>) {
    this.config = { ...this.config, ...partial };
  }

  resize(width: number, height: number) {
    this.config.width = width;
    this.config.height = height;
    this.cx = clamp(this.cx, 0, width);
    this.cy = clamp(this.cy, 0, height);
  }

  reset() {
    const { width, height, targetSpeed } = this.config;
    this.cx = width / 2;
    this.cy = height / 2;
    this.tx = width / 2;
    this.ty = height / 2;
    this.vx = targetSpeed * (Math.random() < 0.5 ? -1 : 1);
    this.vy = 0;
    this.dirTimer = this.nextInterval();
    this.onTargetMs = 0;
    this.elapsedMs = 0;
    this.onTarget = false;
    this.overaim = false;
  }

  private nextInterval() {
    // Lower direction-change frequency = smoother, more beginner-friendly.
    return 0.8 + Math.random() * 1.2; // seconds
  }

  /** Move the crosshair by a raw mouse delta (Pointer Lock mode). */
  applyMouse(dx: number, dy: number) {
    const { sensitivity, width, height } = this.config;
    this.cx = clamp(this.cx + dx * sensitivity, 0, width);
    this.cy = clamp(this.cy + dy * sensitivity, 0, height);
  }

  /** Place the crosshair at an absolute playfield position (cursor mode). */
  setCrosshair(x: number, y: number) {
    const { width, height } = this.config;
    this.cx = clamp(x, 0, width);
    this.cy = clamp(y, 0, height);
  }

  update(dtMs: number) {
    const dt = dtMs / 1000;
    const { width, height, targetRadius, targetSpeed } = this.config;
    this.elapsedMs += dtMs;

    // Target strafes horizontally only, on the centre line.
    this.ty = height / 2;

    // Occasionally reverse direction and vary the speed a little.
    this.dirTimer -= dt;
    if (this.dirTimer <= 0) {
      const reverse = Math.random() < 0.7 ? -1 : 1;
      const speed = targetSpeed * (0.7 + Math.random() * 0.5);
      this.vx = Math.sign(this.vx || 1) * reverse * speed;
      this.dirTimer = this.nextInterval();
    }

    this.tx += this.vx * dt;

    // Bounce off the left/right edges.
    const m = targetRadius + 6;
    if (this.tx < m) {
      this.tx = m;
      this.vx = Math.abs(this.vx);
    } else if (this.tx > width - m) {
      this.tx = width - m;
      this.vx = -Math.abs(this.vx);
    }

    // Score: is the crosshair within the target?
    const dist = Math.hypot(this.cx - this.tx, this.cy - this.ty);
    this.onTarget = dist <= targetRadius;
    if (this.onTarget) this.onTargetMs += dtMs;

    // Overaim: off the target and overshot past its centre line, on the side
    // the target is currently moving toward.
    const leadingSide =
      (this.vx >= 0 && this.cx > this.tx) || (this.vx < 0 && this.cx < this.tx);
    this.overaim = !this.onTarget && leadingSide;
  }

  get accuracy(): number {
    return this.elapsedMs > 0 ? (this.onTargetMs / this.elapsedMs) * 100 : 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { width, height, targetRadius } = this.config;

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, width, height);

    // faint horizontal track line
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // vertical line through the target centre (turns red on overaim)
    ctx.save();
    ctx.setLineDash([6, 5]);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = this.overaim ? COLORS.target : COLORS.targetHit;
    ctx.globalAlpha = this.overaim ? 0.85 : 0.4;
    ctx.beginPath();
    ctx.moveTo(this.tx, 0);
    ctx.lineTo(this.tx, height);
    ctx.stroke();
    ctx.restore();

    // target
    const hit = this.onTarget;
    ctx.beginPath();
    ctx.arc(this.tx, this.ty, targetRadius, 0, Math.PI * 2);
    ctx.fillStyle = hit ? COLORS.targetHit : COLORS.target;
    ctx.globalAlpha = hit ? 0.35 : 0.25;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 2;
    ctx.strokeStyle = hit ? COLORS.targetHit : COLORS.target;
    ctx.stroke();

    // crosshair
    const ch = this.cx;
    const cv = this.cy;
    ctx.strokeStyle = COLORS.crosshair;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ch - 10, cv);
    ctx.lineTo(ch - 3, cv);
    ctx.moveTo(ch + 3, cv);
    ctx.lineTo(ch + 10, cv);
    ctx.moveTo(ch, cv - 10);
    ctx.lineTo(ch, cv - 3);
    ctx.moveTo(ch, cv + 3);
    ctx.lineTo(ch, cv + 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ch, cv, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.crosshair;
    ctx.fill();

    // overaim warning near the crosshair
    if (this.overaim) {
      ctx.fillStyle = COLORS.target;
      ctx.font = "600 13px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("오버에임", ch, cv - 18);
      ctx.textAlign = "start";
    }
  }
}
