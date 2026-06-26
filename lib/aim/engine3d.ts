import * as THREE from "three";
import { AimScene3D, TARGET_DISTANCE } from "./scene3d";

/**
 * 3D tracking drill. A target sphere strafes left/right; the mouse rotates the
 * camera (crosshair is fixed at screen centre) and scoring is the fraction of
 * time a screen-centre raycast stays on the target. A vertical centre line runs
 * through the target and turns red on overaim — mirroring the 2D drill.
 */

export type Drill3DConfig = {
  targetRadius: number;
  targetSpeed: number;
  sensitivity: number;
};

const TARGET_X_RANGE = 11;

export class TrackingEngine3D extends AimScene3D {
  config: Drill3DConfig;

  private target: THREE.Mesh;
  private targetMat: THREE.MeshStandardMaterial;
  private centerLine: THREE.Mesh;
  private centerLineMat: THREE.MeshBasicMaterial;

  private tx = 0;
  private vx = 0;
  private dirTimer = 0;

  onTargetMs = 0;
  elapsedMs = 0;
  onTarget = false;
  /** Crosshair has overshot past the target's centre line (leading side). */
  overaim = false;

  constructor(canvas: HTMLCanvasElement, config: Drill3DConfig) {
    super(canvas, config.sensitivity);
    this.config = config;

    this.targetMat = new THREE.MeshStandardMaterial({
      color: 0xff5c5c,
      emissive: 0x501414,
    });
    this.target = new THREE.Mesh(
      new THREE.SphereGeometry(config.targetRadius, 28, 18),
      this.targetMat
    );
    this.target.position.set(0, 0, -TARGET_DISTANCE);
    this.scene.add(this.target);

    this.centerLineMat = new THREE.MeshBasicMaterial({
      color: 0x2ee6a8,
      transparent: true,
      opacity: 0.5,
    });
    this.centerLine = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 12, 0.06),
      this.centerLineMat
    );
    this.centerLine.position.set(0, 1, -TARGET_DISTANCE);
    this.scene.add(this.centerLine);

    this.reset();
  }

  setConfig(partial: Partial<Drill3DConfig>) {
    this.config = { ...this.config, ...partial };
    if (partial.sensitivity != null) this.setSensitivity(partial.sensitivity);
    const geo = this.target.geometry as THREE.SphereGeometry;
    if (geo.parameters.radius !== this.config.targetRadius) {
      this.target.geometry.dispose();
      this.target.geometry = new THREE.SphereGeometry(
        this.config.targetRadius,
        28,
        18
      );
    }
  }

  reset() {
    this.resetView();
    this.tx = 0;
    this.vx = this.config.targetSpeed * (Math.random() < 0.5 ? -1 : 1);
    this.dirTimer = this.nextInterval();
    this.onTargetMs = 0;
    this.elapsedMs = 0;
    this.onTarget = false;
    this.overaim = false;
    this.target.position.set(0, 0, -TARGET_DISTANCE);
    this.centerLine.position.x = 0;
    this.centerLineMat.color.setHex(0x2ee6a8);
  }

  private nextInterval() {
    return 0.8 + Math.random() * 1.2;
  }

  update(dtMs: number) {
    const dt = dtMs / 1000;
    const { targetSpeed } = this.config;
    this.elapsedMs += dtMs;

    this.dirTimer -= dt;
    if (this.dirTimer <= 0) {
      const reverse = Math.random() < 0.7 ? -1 : 1;
      const speed = targetSpeed * (0.7 + Math.random() * 0.5);
      this.vx = Math.sign(this.vx || 1) * reverse * speed;
      this.dirTimer = this.nextInterval();
    }

    this.tx += this.vx * dt;
    if (this.tx < -TARGET_X_RANGE) {
      this.tx = -TARGET_X_RANGE;
      this.vx = Math.abs(this.vx);
    } else if (this.tx > TARGET_X_RANGE) {
      this.tx = TARGET_X_RANGE;
      this.vx = -Math.abs(this.vx);
    }
    this.target.position.x = this.tx;
    this.centerLine.position.x = this.tx;

    this.onTarget = this.centerHits(this.target);
    if (this.onTarget) this.onTargetMs += dtMs;

    const ndc = this.projectNdc(this.target.position);
    const onScreen = ndc.z < 1 && Math.abs(ndc.x) < 1.3;
    const leading = (this.vx >= 0 && ndc.x < 0) || (this.vx < 0 && ndc.x > 0);
    this.overaim = !this.onTarget && onScreen && leading;

    this.targetMat.color.setHex(this.onTarget ? 0x2ee6a8 : 0xff5c5c);
    this.targetMat.emissive.setHex(this.onTarget ? 0x14503c : 0x501414);
    this.centerLineMat.color.setHex(this.overaim ? 0xff5c5c : 0x2ee6a8);
  }

  get accuracy(): number {
    return this.elapsedMs > 0 ? (this.onTargetMs / this.elapsedMs) * 100 : 0;
  }

  dispose() {
    this.target.geometry.dispose();
    this.targetMat.dispose();
    this.centerLine.geometry.dispose();
    this.centerLineMat.dispose();
    super.dispose();
  }
}
