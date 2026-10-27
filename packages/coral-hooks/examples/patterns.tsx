import type { ComponentProps, CSSProperties } from "react";

import {
  Tabs,
  useTabs,
  ToggleGroup,
  useToggleGroup,
  Checkbox,
  useCheckbox,
  Slider,
  useSlider,
  type TabsOptions,
  type ToggleGroupOptions,
  type CheckboxOptions,
  type SliderOptions,
} from "../src";

export type API = "hooks" | "parts";
export const tabItems = [{ value: "a" }, { value: "b", disabled: true }, { value: "c" }];

type TabsExampleProps = TabsOptions & {
  api: API;
  listProps?: ComponentProps<"div">;
  tabProps?: Omit<ComponentProps<"button">, "value">;
  children?: React.ReactNode;
};
function HookTabs({ listProps, tabProps, children, ...options }: Omit<TabsExampleProps, "api">) {
  const tabs = useTabs(options);
  return (
    <section {...tabs.getRootProps()}>
      <div {...tabs.getListProps({ "aria-label": "문서", ...listProps })}>
        {options.items.map((item) => (
          <button key={item.value} {...tabs.getTabProps(item.value, tabProps)}>
            {item.value}
          </button>
        ))}
      </div>
      {options.items
        .filter((item) => item.panel !== false)
        .map((item) => (
          <div key={item.value} {...tabs.getPanelProps(item.value)}>
            내용 {item.value}
          </div>
        ))}
      {children}
    </section>
  );
}
export function TabsExample({ api, listProps, tabProps, children, ...options }: TabsExampleProps) {
  return api === "hooks" ? (
    <HookTabs
      {...options}
      {...(listProps ? { listProps } : {})}
      {...(tabProps ? { tabProps } : {})}
    >
      {children}
    </HookTabs>
  ) : (
    <Tabs.Root {...options} render={<section />}>
      <Tabs.List aria-label="문서" {...listProps}>
        {options.items.map((item) => (
          <Tabs.Tab key={item.value} value={item.value} {...tabProps}>
            {item.value}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {options.items
        .filter((item) => item.panel !== false)
        .map((item) => (
          <Tabs.Panel key={item.value} value={item.value}>
            내용 {item.value}
          </Tabs.Panel>
        ))}
      {children}
    </Tabs.Root>
  );
}

type GroupExampleProps = ToggleGroupOptions & {
  api: API;
  items?: readonly string[];
  rootProps?: Omit<ComponentProps<"div">, "defaultValue">;
  itemProps?: Omit<ComponentProps<"button">, "value">;
  children?: React.ReactNode;
};
function HookGroup({
  items = ["a", "b", "c"],
  rootProps,
  itemProps,
  children,
  ...options
}: Omit<GroupExampleProps, "api">) {
  const group = useToggleGroup(options);
  return (
    <section {...group.getRootProps({ "aria-label": "서식", ...rootProps })}>
      {items.map((value) => (
        <button key={value} {...group.getItemProps(value, itemProps)}>
          {value}
        </button>
      ))}
      {children}
    </section>
  );
}
export function GroupExample({
  api,
  items = ["a", "b", "c"],
  rootProps,
  itemProps,
  children,
  ...options
}: GroupExampleProps) {
  return api === "hooks" ? (
    <HookGroup
      {...options}
      items={items}
      {...(rootProps ? { rootProps } : {})}
      {...(itemProps ? { itemProps } : {})}
    >
      {children}
    </HookGroup>
  ) : (
    <ToggleGroup.Root {...options} aria-label="서식" render={<section />} {...rootProps}>
      {items.map((value) => (
        <ToggleGroup.Item key={value} value={value} {...itemProps}>
          {value}
        </ToggleGroup.Item>
      ))}
      {children}
    </ToggleGroup.Root>
  );
}

type CheckExampleProps = CheckboxOptions & {
  api: API;
  custom?: boolean;
  inputProps?: ComponentProps<"input">;
};
function HookCheckbox({ custom, inputProps, ...options }: Omit<CheckExampleProps, "api">) {
  const checkbox = useCheckbox(options);
  return (
    <span {...checkbox.getRootProps()}>
      {custom && <span {...checkbox.getControlProps()}>✓</span>}
      <input
        {...(custom
          ? checkbox.getHiddenInputProps(inputProps)
          : checkbox.getInputProps(inputProps))}
      />
      <label {...checkbox.getLabelProps()}>알림</label>
    </span>
  );
}
export function CheckboxExample({ api, custom, inputProps, ...options }: CheckExampleProps) {
  return api === "hooks" ? (
    <HookCheckbox
      {...options}
      {...(custom === undefined ? {} : { custom })}
      {...(inputProps ? { inputProps } : {})}
    />
  ) : (
    <Checkbox.Root {...options}>
      {custom && <Checkbox.Control>✓</Checkbox.Control>}
      {custom ? <Checkbox.HiddenInput {...inputProps} /> : <Checkbox.Input {...inputProps} />}
      <Checkbox.Label>알림</Checkbox.Label>
    </Checkbox.Root>
  );
}

type SliderExampleProps = SliderOptions & {
  api: API;
  custom?: boolean;
  rootProps?: Omit<ComponentProps<"div">, "defaultValue">;
  controlProps?: ComponentProps<"div">;
  inputProps?: ComponentProps<"input">;
};
const thumbStyle: CSSProperties = {
  width: 20,
  height: 20,
  background: "ButtonFace",
  border: "1px solid",
};
function controlStyle(options: SliderOptions): CSSProperties {
  return {
    width: options.orientation === "vertical" ? 24 : 200,
    height: options.orientation === "vertical" ? 200 : 24,
    border: "1px solid",
    margin: 24,
  };
}
function HookSlider({
  custom,
  rootProps,
  controlProps,
  inputProps,
  ...options
}: Omit<SliderExampleProps, "api">) {
  const slider = useSlider(options);
  return (
    <section {...slider.getRootProps(rootProps)}>
      {slider.value.map((_, index) => (
        <label key={index} {...slider.getLabelProps(index)}>
          가격 {index + 1}
        </label>
      ))}
      {custom ? (
        <div {...slider.getControlProps({ style: controlStyle(options), ...controlProps })}>
          {slider.value.map((_, index) => (
            <span key={index} {...slider.getThumbProps(index, { style: thumbStyle })}>
              <input {...slider.getHiddenInputProps(index, inputProps)} />
            </span>
          ))}
        </div>
      ) : (
        slider.value.map((_, index) => (
          <input key={index} {...slider.getInputProps(index, inputProps)} />
        ))
      )}
    </section>
  );
}
export function SliderExample({
  api,
  custom,
  rootProps,
  controlProps,
  inputProps,
  ...options
}: SliderExampleProps) {
  const count = options.value?.length ?? options.defaultValue?.length ?? 1;
  return api === "hooks" ? (
    <HookSlider
      {...options}
      {...(custom === undefined ? {} : { custom })}
      {...(rootProps ? { rootProps } : {})}
      {...(controlProps ? { controlProps } : {})}
      {...(inputProps ? { inputProps } : {})}
    />
  ) : (
    <Slider.Root {...options} render={<section />} {...rootProps}>
      {Array.from({ length: count }, (_, index) => (
        <Slider.Label key={index} index={index}>
          가격 {index + 1}
        </Slider.Label>
      ))}
      {custom ? (
        <Slider.Control style={controlStyle(options)} {...controlProps}>
          {Array.from({ length: count }, (_, index) => (
            <Slider.Thumb key={index} index={index} style={thumbStyle}>
              <Slider.HiddenInput index={index} {...inputProps} />
            </Slider.Thumb>
          ))}
        </Slider.Control>
      ) : (
        Array.from({ length: count }, (_, index) => (
          <Slider.Input key={index} index={index} {...inputProps} />
        ))
      )}
    </Slider.Root>
  );
}
