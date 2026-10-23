export function decimalPlaces(value: number) {
  const [coefficient, exponent = "0"] = String(value).split("e");
  return Math.max(0, (coefficient!.split(".")[1]?.length ?? 0) - Number(exponent));
}
