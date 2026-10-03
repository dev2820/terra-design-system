function clamp(value: number, max: number): number;
function clamp(value: number, min: number, max: number): number;
function clamp(value: number, b1: number, b2?: number): number {
  if (b2 !== undefined) return Math.max(Math.min(value, b2), b1);
  return Math.min(value, b1);
}

export { clamp };
