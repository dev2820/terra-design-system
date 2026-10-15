"use client";

import * as React from "react";

import type { CheckboxChangeEventDetails } from "../checkbox";
import { useRender } from "../core";
import { useFieldState } from "../field/field";
import { useFieldsetContext } from "../fieldset/fieldset-context";
import {
  CheckboxGroupContext,
  useCheckboxGroupContext,
  type CheckboxGroupState,
} from "./checkbox-group-context";

export type CheckboxGroupChangeEventDetails = CheckboxChangeEventDetails;
export type { CheckboxGroupState } from "./checkbox-group-context";

function normalizeValue(value: readonly string[] | undefined) {
  return [...new Set(value)];
}

function getStateAttributes(state: CheckboxGroupState) {
  return {
    "data-disabled": state.disabled ? "" : undefined,
    "data-readonly": state.readOnly ? "" : undefined,
  };
}

export interface CheckboxGroupRootProps extends Omit<
  React.ComponentProps<"fieldset">,
  "aria-hidden" | "defaultValue" | "onChange" | "required" | "role" | "value"
> {
  name: string;
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (value: string[], details: CheckboxGroupChangeEventDetails) => void;
  readOnly?: boolean;
}

export function Root(props: CheckboxGroupRootProps) {
  const {
    name,
    value: valueProp,
    defaultValue,
    onValueChange,
    disabled: disabledProp = false,
    readOnly = false,
    form,
    ...rest
  } = props;
  const [uncontrolledValue, setValue] = React.useState(() => normalizeValue(defaultValue));
  const controlled = valueProp !== undefined;
  const value = controlled ? normalizeValue(valueProp) : uncontrolledValue;
  const fieldState = useFieldState();
  const fieldsetDisabled = useFieldsetContext("Root", true) ?? false;
  const state: CheckboxGroupState = {
    disabled: disabledProp || fieldsetDisabled || fieldState?.disabled === true,
    readOnly,
  };
  const groupRef = React.useRef<HTMLFieldSetElement | null>(null);

  React.useEffect(() => {
    const $form = groupRef.current?.form;

    if (!$form) {
      return undefined;
    }

    const handleReset = (event: Event) => {
      // Native inputs reset after the reset event's default action.
      setTimeout(() => {
        if (event.defaultPrevented) {
          return;
        }

        const resetValue = controlled ? value : normalizeValue(defaultValue);

        if (!controlled) {
          setValue(resetValue);
        }

        groupRef.current
          ?.querySelectorAll<HTMLInputElement>(
            'label[data-checkbox-group-item] input[type="checkbox"]',
          )
          .forEach((input) => {
            input.checked = resetValue.includes(input.value);
          });
      }, 0);
    };

    $form.addEventListener("reset", handleReset);

    return () => $form.removeEventListener("reset", handleReset);
  }, [controlled, defaultValue, form, value]);

  function toggle(itemValue: string, checked: boolean, details: CheckboxGroupChangeEventDetails) {
    const nextValue = checked
      ? value.includes(itemValue)
        ? [...value]
        : [...value, itemValue]
      : value.filter((valueItem) => valueItem !== itemValue);

    onValueChange?.(nextValue, details);

    if (!controlled && !details.isCanceled) {
      setValue(nextValue);
    }
  }

  const element = useRender({
    defaultTagName: "fieldset",
    render: undefined,
    props: rest,
    internalProps: { disabled: state.disabled, form, ...getStateAttributes(state), ref: groupRef },
  });

  return (
    <CheckboxGroupContext value={{ name, form, value, state, toggle }}>
      {element}
    </CheckboxGroupContext>
  );
}

export type CheckboxGroupLegendProps = React.ComponentProps<"legend">;

export function Legend(props: CheckboxGroupLegendProps) {
  const group = useCheckboxGroupContext("Legend");

  return useRender({
    defaultTagName: "legend",
    render: undefined,
    props,
    internalProps: getStateAttributes(group.state),
  });
}
