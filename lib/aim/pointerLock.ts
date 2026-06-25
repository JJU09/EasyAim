/** Thin wrappers around the Pointer Lock API used by the aim drills. */

export function requestPointerLock(el: HTMLElement): void {
  // Newer browsers return a Promise; older ones don't. Either is fine.
  const result = el.requestPointerLock() as unknown as Promise<void> | void;
  if (result && typeof (result as Promise<void>).catch === "function") {
    (result as Promise<void>).catch(() => {
      /* user gesture / already locked — ignore */
    });
  }
}

export function exitPointerLock(): void {
  if (document.pointerLockElement) document.exitPointerLock();
}

export function isPointerLocked(el: HTMLElement): boolean {
  return document.pointerLockElement === el;
}

/** Pointer Lock requires a secure context + desktop browser. */
export function isPointerLockSupported(): boolean {
  return (
    typeof document !== "undefined" &&
    "pointerLockElement" in document &&
    typeof HTMLElement !== "undefined" &&
    "requestPointerLock" in HTMLElement.prototype
  );
}
