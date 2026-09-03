export function joinIds(...groups: Array<string | readonly string[] | undefined>) {
  const ids = new Set<string>();

  for (const group of groups) {
    if (typeof group === "string") {
      for (const id of group.split(/\s+/)) {
        if (id) {
          ids.add(id);
        }
      }
    } else if (group) {
      for (const id of group) {
        if (id) {
          ids.add(id);
        }
      }
    }
  }

  return ids.size === 0 ? undefined : [...ids].join(" ");
}
