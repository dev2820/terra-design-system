"use client";

import * as React from "react";

const FieldsetContext = React.createContext<boolean | null>(null);

export function useFieldsetContext(part: string, optional: true): boolean | null;
export function useFieldsetContext(part: string, optional?: false): boolean;
export function useFieldsetContext(part: string, optional = false) {
  const context = React.use(FieldsetContext);

  if (context === null && !optional) {
    throw new globalThis.Error(`Fieldset.${part} must be used within Fieldset.Root.`);
  }

  return context;
}

export { FieldsetContext };
