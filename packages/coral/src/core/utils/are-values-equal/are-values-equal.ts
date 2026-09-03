export function areValuesEqual(first: unknown, second: unknown) {
  if (Array.isArray(first) && Array.isArray(second)) {
    return first.length === second.length && first.every((value, index) => value === second[index]);
  }

  return Object.is(first, second);
}
