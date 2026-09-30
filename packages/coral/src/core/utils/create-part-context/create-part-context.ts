"use client";

import * as React from "react";

export function createPartContext<Value>(componentName: string, providerPart = "Root") {
  const Context = React.createContext<Value | null>(null);

  function useContext(part: string, optional: true): Value | null;
  function useContext(part: string, optional?: false): Value;
  function useContext(part: string, optional = false) {
    const context = React.use(Context);

    if (context === null && !optional) {
      throw new globalThis.Error(
        `${componentName}.${part} must be used within ${componentName}.${providerPart}.`,
      );
    }

    return context;
  }

  return [Context, useContext] as const;
}
