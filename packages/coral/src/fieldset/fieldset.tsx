"use client";

import * as React from "react";

import { FieldsetContext, useFieldsetContext } from "./fieldset-context";

export type FieldsetRootProps = React.ComponentProps<"fieldset">;

export function Root(props: FieldsetRootProps) {
  const { disabled: disabledProp = false, ref, ...rest } = props;
  const parentDisabled = useFieldsetContext("Root", true) ?? false;
  const disabled = parentDisabled || disabledProp;

  return (
    <FieldsetContext value={disabled}>
      <fieldset {...rest} ref={ref} disabled={disabled} data-disabled={disabled ? "" : undefined} />
    </FieldsetContext>
  );
}

export type FieldsetLegendProps = React.ComponentProps<"legend">;

export function Legend(props: FieldsetLegendProps) {
  const { ref, ...rest } = props;
  const disabled = useFieldsetContext("Legend");

  return <legend {...rest} ref={ref} data-disabled={disabled ? "" : undefined} />;
}
