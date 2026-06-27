import * as THREE from "three";

/** Distance from the camera to where targets sit (world units). */
export const TARGET_DISTANCE = 16;
const PITCH_LIMIT = 1.45;

/** Horizontal field of view (degrees), matching a 103 FOV FPS setting. */
const HORIZONTAL_FOV = 103;

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

/** three.js cameras use a *vertical* FOV — derive it from the horizontal FOV. */
function verticalFovDeg(aspect: number): number {
  const h = (HORIZONTAL_FOV * Math.PI) / 180;
  return (2 * Math.atan(Math.tan(h / 2) / aspect) * 180) / Math.PI;
}

/**
 * Shared 3D drill scene: renderer, FPS camera (mouse rotates yaw/pitch), a
 * floor grid + wall for spatial reference, lights, and a screen-centre
 * raycaster. Tracking and flick engines extend this and add their own target
 * behaviour + scoring.
 */
export class AimScene3D {
  protected renderer: THREE.WebGLRenderer;
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected raycaster = new THREE.Raycaster();
  protected sensitivity: number;

  private yaw = 0;
  private pitch = 0;
  private grid: THREE.GridHelper;
  private wallGeo: THREE.PlaneGeometry;
  private wallMat: THREE.MeshStandardMaterial;

  constructor(canvas: HTMLCanvasElement, sensitivity: number) {
    this.sensitivity = sensitivity;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setClearColor(0x0f1115, 1);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x0f1115, 18, 46);

    this.camera = new THREE.PerspectiveCamera(verticalFovDeg(16 / 9), 16 / 9, 0.1, 100);
    this.camera.position.set(0, 0, 0);

    this.grid = new THREE.GridHelper(80, 40, 0x2e8f6e, 0x1b1f27);
    this.grid.position.y = -3;
    this.scene.add(this.grid);

    this.wallGeo = new THREE.PlaneGeometry(80, 24);
    this.wallMat = new THREE.MeshStandardMaterial({ color: 0x14161b });
    const wall = new THREE.Mesh(this.wallGeo, this.wallMat);
    wall.position.set(0, 6, -TARGET_DISTANCE - 6);
    this.scene.add(wall);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(4, 10, 6);
    this.scene.add(dir);

    this.updateCamera();
  }

  setSensitivity(s: number) {
    this.sensitivity = s;
  }

  resize(width: number, height: number) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.fov = verticalFovDeg(this.camera.aspect);
    this.camera.updateProjectionMatrix();
  }

  /** Rotate the camera by a raw mouse delta. */
  applyMouse(dx: number, dy: number) {
    this.yaw -= dx * this.sensitivity;
    this.pitch = clamp(this.pitch - dy * this.sensitivity, -PITCH_LIMIT, PITCH_LIMIT);
    this.updateCamera();
  }

  protected resetView() {
    this.yaw = 0;
    this.pitch = 0;
    this.updateCamera();
  }

  private updateCamera() {
    this.camera.rotation.set(this.pitch, this.yaw, 0, "YXZ");
  }

  /** True if a ray from the screen centre hits the object. */
  protected centerHits(obj: THREE.Object3D): boolean {
    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    return this.raycaster.intersectObject(obj).length > 0;
  }

  /** Project a world point to normalized device coords (matrices refreshed). */
  protected projectNdc(pos: THREE.Vector3): THREE.Vector3 {
    this.camera.updateMatrixWorld();
    this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert();
    return pos.clone().project(this.camera);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.grid.geometry.dispose();
    (this.grid.material as THREE.Material).dispose();
    this.wallGeo.dispose();
    this.wallMat.dispose();
    this.renderer.dispose();
  }
}
