import * as THREE from "three";
import { AimScene3D, TARGET_DISTANCE } from "./scene3d";

/**
 * 3D flick drill. A static target appears at a random spot inside a cone; the
 * player flicks the camera onto it and clicks (`fire`). A hit respawns the
 * target elsewhere. Score = hit rate (hits / shots) and average reaction time.
 */

export type Flick3DConfig = {
  targetRadius: number;
  /** Half-angle of the spawn cone (radians) — horizontal / vertical. */
  spawnAzimuth: number;
  spawnElevation: number;
  sensitivity: number;
};

export class FlickEngine3D extends AimScene3D {
  config: Flick3DConfig;

  private target: THREE.Mesh;
  private targetMat: THREE.MeshStandardMaterial;
  private spawnAt = 0;
  private reactionTotal = 0;

  hits = 0;
  shots = 0;
  lastReactionMs = 0;
  /** Crosshair currently over the target (visual feedback). */
  onTarget = false;

  constructor(canvas: HTMLCanvasElement, config: Flick3DConfig) {
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
    this.scene.add(this.target);

    this.reset();
  }

  setConfig(partial: Partial<Flick3DConfig>) {
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
    this.hits = 0;
    this.shots = 0;
    this.reactionTotal = 0;
    this.lastReactionMs = 0;
    this.onTarget = false;
    this.spawnTarget();
  }

  private spawnTarget() {
    const { spawnAzimuth, spawnElevation } = this.config;
    const a = (Math.random() * 2 - 1) * spawnAzimuth;
    const e = (Math.random() * 2 - 1) * spawnElevation;
    const d = TARGET_DISTANCE;
    this.target.position.set(d * Math.sin(a), d * Math.sin(e), -d * Math.cos(a));
    this.spawnAt = performance.now();
  }

  /** Fire at the crosshair. Returns whether it hit. */
  fire(): boolean {
    this.shots += 1;
    const hit = this.centerHits(this.target);
    if (hit) {
      this.hits += 1;
      this.lastReactionMs = performance.now() - this.spawnAt;
      this.reactionTotal += this.lastReactionMs;
      this.spawnTarget();
    }
    return hit;
  }

  update() {
    this.onTarget = this.centerHits(this.target);
    this.targetMat.emissive.setHex(this.onTarget ? 0x14503c : 0x501414);
    this.targetMat.color.setHex(this.onTarget ? 0x2ee6a8 : 0xff5c5c);
  }

  get accuracy(): number {
    return this.shots > 0 ? (this.hits / this.shots) * 100 : 0;
  }

  get avgReactionMs(): number {
    return this.hits > 0 ? this.reactionTotal / this.hits : 0;
  }

  dispose() {
    this.target.geometry.dispose();
    this.targetMat.dispose();
    super.dispose();
  }
}
