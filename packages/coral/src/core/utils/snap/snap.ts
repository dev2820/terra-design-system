import { clamp } from "../clamp";
import { decimalPlaces } from "../decimal-places";
import { roundingTolerance } from "../rounding-tolerance";

export function snap(value: number, min: number, max: number, step: number) {
  // Preserve upward half-step rounding when decimal arithmetic introduces binary rounding error.
  const ratio = (clamp(value, min, max) - min) / step;
  const maxRatio = (max - min) / step;
  const steps = Math.min(
    Math.round(ratio + roundingTolerance(ratio)),
    Math.floor(maxRatio + roundingTolerance(maxRatio)),
  );
  const precision = Math.max(decimalPlaces(min), decimalPlaces(step));
  const result = min + steps * step;

  return clamp(precision <= 100 ? Number(result.toFixed(precision)) : result, min, max);
}
