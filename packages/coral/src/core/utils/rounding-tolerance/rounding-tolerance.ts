export function roundingTolerance(value: number) {
  return Math.min(1e-7, Number.EPSILON * Math.max(1, value) * 4);
}
