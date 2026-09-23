"use client";

import type * as React from "react";

export interface SeparatorProps extends Omit<
  React.ComponentProps<"hr">,
  "aria-orientation" | "aria-hidden"
> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export function Separator(props: SeparatorProps) {
  const { orientation = "horizontal", decorative = false, ...rest } = props;

  return (
    <hr
      {...rest}
      aria-orientation={!decorative && orientation === "vertical" ? "vertical" : undefined}
      aria-hidden={decorative ? true : undefined}
      data-orientation={orientation}
    />
  );
}
