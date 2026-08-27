import type { ElementProps, NormalizeProps } from "@bison/core";
import { afterEach, describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";

import { connect } from "./connect";
import { machine } from "./machine";
import type { AccordionActor, AccordionProps } from "./types";

type TestElementProps = {
  element: {
    id?: string;
    hidden?: boolean;
    role?: string;
    "aria-labelledby"?: string;
  };
  button: {
    type?: HTMLButtonElement["type"];
    id?: string;
    "aria-controls"?: string;
    "aria-expanded"?: boolean;
    "aria-disabled"?: boolean;
    onClick?: () => void;
  };
};

const normalize: NormalizeProps<TestElementProps> = {
  element: (props: ElementProps) => props as TestElementProps["element"],
  button: (props: ElementProps) => props as TestElementProps["button"],
};

const fixtureRoots: HTMLElement[] = [];

afterEach(() => {
  for (const root of fixtureRoots) {
    root.remove();
  }

  fixtureRoots.length = 0;
});

function setOptionalAttribute(element: Element, name: string, value: string | boolean | undefined) {
  if (value === undefined) {
    element.removeAttribute(name);
    return;
  }

  element.setAttribute(name, String(value));
}

function setup(
  props: AccordionProps<false>,
  options: { region?: boolean; values?: string[] } = {},
) {
  const values = options.values ?? ["first", "second"];
  const root = document.createElement("div");
  const form = document.createElement("form");
  const triggers = new Map<string, HTMLButtonElement>();
  const triggerHandlers = new Map<string, () => void>();
  const panels = new Map<string, HTMLElement>();
  const panelLinks = new Map<string, HTMLAnchorElement>();
  let state = machine.initial(props);
  let submissionCount = 0;
  let render: () => void;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submissionCount += 1;
  });

  for (const value of values) {
    const heading = document.createElement("h2");
    const trigger = document.createElement("button");
    const panel = document.createElement("div");
    const panelLink = document.createElement("a");

    trigger.textContent = `${value} Trigger`;
    panelLink.href = `#${value}`;
    panelLink.textContent = `${value} Link`;
    panel.append(panelLink);
    heading.append(trigger);
    form.append(heading, panel);
    trigger.addEventListener("click", () => triggerHandlers.get(value)?.());

    triggers.set(value, trigger);
    panels.set(value, panel);
    panelLinks.set(value, panelLink);
  }

  root.append(form);
  document.body.append(root);
  fixtureRoots.push(root);

  const actor: AccordionActor<false> = {
    getSnapshot: () => ({ props, state }),
    send: (event) => {
      state = machine.transition(state, event, props);
      render();
    },
  };

  render = () => {
    const api = connect(actor, normalize);

    for (const value of values) {
      const trigger = triggers.get(value);
      const panel = panels.get(value);

      if (!trigger || !panel) {
        throw new Error(`Accordion item을 찾을 수 없습니다: ${value}`);
      }

      const triggerProps = api.getTriggerProps({ value });
      const panelProps = api.getPanelProps(
        options.region === undefined ? { value } : { value, region: options.region },
      );

      trigger.type = triggerProps.type ?? "submit";
      trigger.id = triggerProps.id ?? "";
      triggerHandlers.set(value, triggerProps.onClick ?? (() => {}));
      setOptionalAttribute(trigger, "aria-controls", triggerProps["aria-controls"]);
      setOptionalAttribute(trigger, "aria-expanded", triggerProps["aria-expanded"]);
      setOptionalAttribute(trigger, "aria-disabled", triggerProps["aria-disabled"]);

      panel.id = panelProps.id ?? "";
      panel.hidden = panelProps.hidden ?? false;
      setOptionalAttribute(panel, "role", panelProps.role);
      setOptionalAttribute(panel, "aria-labelledby", panelProps["aria-labelledby"]);
    }
  };

  render();

  function getTrigger(value: string) {
    const trigger = triggers.get(value);

    if (!trigger) {
      throw new Error(`Trigger를 찾을 수 없습니다: ${value}`);
    }

    return trigger;
  }

  function getPanel(value: string) {
    const panel = panels.get(value);

    if (!panel) {
      throw new Error(`Panel을 찾을 수 없습니다: ${value}`);
    }

    return panel;
  }

  function getPanelLink(value: string) {
    const panelLink = panelLinks.get(value);

    if (!panelLink) {
      throw new Error(`Panel Link를 찾을 수 없습니다: ${value}`);
    }

    return panelLink;
  }

  return {
    form,
    getPanel,
    getPanelLink,
    getTrigger,
    get submissionCount() {
      return submissionCount;
    },
  };
}

describe("Accordion", () => {
  describe("connect", () => {
    describe("html", () => {
      it("Trigger의 type을 button으로 설정한다", () => {
        const fixture = setup({ id: "accordion" });

        expect(fixture.getTrigger("first").type).toBe("button");
      });

      it("Trigger를 활성화해도 form을 제출하지 않는다", async () => {
        const fixture = setup({ id: "accordion" });

        await userEvent.click(fixture.getTrigger("first"));

        expect(fixture.submissionCount).toBe(0);
      });

      it("접힌 Panel을 숨긴다", () => {
        const fixture = setup({ id: "accordion" });

        expect(fixture.getPanel("first").hidden).toBe(true);
      });

      it("펼친 Panel을 표시한다", () => {
        const fixture = setup({ id: "accordion", defaultValue: "first" });

        expect(fixture.getPanel("first").hidden).toBe(false);
      });

      it("controlled value에 해당하는 Panel을 표시한다", () => {
        const fixture = setup({ id: "accordion", value: "first" });

        expect(fixture.getPanel("first").hidden).toBe(false);
      });
    });

    describe("accessibility", () => {
      it("펼친 Trigger의 aria-expanded를 true로 설정한다", () => {
        const fixture = setup({ id: "accordion", defaultValue: "first" });

        expect(fixture.getTrigger("first").getAttribute("aria-expanded")).toBe("true");
      });

      it("접힌 Trigger의 aria-expanded를 false로 설정한다", () => {
        const fixture = setup({ id: "accordion" });

        expect(fixture.getTrigger("first").getAttribute("aria-expanded")).toBe("false");
      });

      it("aria-controls가 연결된 Panel의 ID를 가리킨다", () => {
        const fixture = setup({ id: "accordion" });

        expect(fixture.getTrigger("first").getAttribute("aria-controls")).toBe(
          fixture.getPanel("first").id,
        );
      });

      it("접을 수 없는 펼친 Trigger의 aria-disabled를 true로 설정한다", () => {
        const fixture = setup({
          id: "accordion",
          defaultValue: "first",
          collapsible: false,
        });

        expect(fixture.getTrigger("first").getAttribute("aria-disabled")).toBe("true");
      });

      it("접을 수 있거나 접힌 Trigger에는 aria-disabled를 설정하지 않는다", () => {
        const collapsible = setup({
          id: "collapsible-accordion",
          defaultValue: "first",
          collapsible: true,
        });
        const collapsed = setup({ id: "collapsed-accordion" });

        expect(collapsible.getTrigger("first").hasAttribute("aria-disabled")).toBe(false);
        expect(collapsed.getTrigger("first").hasAttribute("aria-disabled")).toBe(false);
      });

      it("요청하면 Panel을 region으로 노출한다", () => {
        const fixture = setup({ id: "accordion" }, { region: true });

        expect(fixture.getPanel("first").getAttribute("role")).toBe("region");
      });

      it("요청하지 않으면 Panel을 region으로 노출하지 않는다", () => {
        const fixture = setup({ id: "accordion" });

        expect(fixture.getPanel("first").hasAttribute("role")).toBe(false);
      });

      it("region인 Panel의 aria-labelledby가 Trigger의 ID를 가리킨다", () => {
        const fixture = setup({ id: "accordion" }, { region: true });

        expect(fixture.getPanel("first").getAttribute("aria-labelledby")).toBe(
          fixture.getTrigger("first").id,
        );
      });

      it("region이 아닌 Panel에는 aria-labelledby를 설정하지 않는다", () => {
        const fixture = setup({ id: "accordion" });

        expect(fixture.getPanel("first").hasAttribute("aria-labelledby")).toBe(false);
      });
    });

    describe("keyboard", () => {
      it("Enter로 접힌 Trigger를 활성화하면 연결된 Panel을 펼친다", async () => {
        const fixture = setup({ id: "accordion" });
        const trigger = fixture.getTrigger("first");

        trigger.focus();
        await userEvent.keyboard("{Enter}");

        expect(trigger.getAttribute("aria-expanded")).toBe("true");
        expect(fixture.getPanel("first").hidden).toBe(false);
      });

      it("Space로 접힌 Trigger를 활성화하면 연결된 Panel을 펼친다", async () => {
        const fixture = setup({ id: "accordion" });
        const trigger = fixture.getTrigger("first");

        trigger.focus();
        await userEvent.keyboard("{Space}");

        expect(trigger.getAttribute("aria-expanded")).toBe("true");
        expect(fixture.getPanel("first").hidden).toBe(false);
      });

      it("Tab으로 다음 Trigger에 초점을 옮긴다", async () => {
        const fixture = setup({ id: "accordion" });
        const firstTrigger = fixture.getTrigger("first");
        const secondTrigger = fixture.getTrigger("second");

        firstTrigger.focus();
        await userEvent.tab();

        expect(document.activeElement).toBe(secondTrigger);
      });

      it("Shift+Tab으로 이전 Trigger에 초점을 옮긴다", async () => {
        const fixture = setup({ id: "accordion" });
        const firstTrigger = fixture.getTrigger("first");
        const secondTrigger = fixture.getTrigger("second");

        secondTrigger.focus();
        await userEvent.tab({ shift: true });

        expect(document.activeElement).toBe(firstTrigger);
      });

      it("펼친 Panel의 초점 가능한 요소를 Tab 순서에 포함한다", async () => {
        const fixture = setup({ id: "accordion", defaultValue: "first" });
        const firstTrigger = fixture.getTrigger("first");

        firstTrigger.focus();
        await userEvent.tab();

        expect(document.activeElement).toBe(fixture.getPanelLink("first"));
      });

      it("접힌 Panel의 초점 가능한 요소를 Tab 순서에서 제외한다", async () => {
        const fixture = setup({ id: "accordion" });
        const firstTrigger = fixture.getTrigger("first");

        firstTrigger.focus();
        await userEvent.tab();

        expect(document.activeElement).toBe(fixture.getTrigger("second"));
      });
    });
  });
});
