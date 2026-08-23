import type { ElementProps, NormalizeProps } from "@bison/core";
import { afterEach, describe, expect, it } from "vitest";

import { connect } from "./connect";
import type { AlertActor } from "./types";

interface AlertPropTypes {
  element: {
    role?: string;
  };
}

const normalize: NormalizeProps<AlertPropTypes> = {
  element: (props: ElementProps) => props as AlertPropTypes["element"],
};

const fixtureRoots: HTMLElement[] = [];

afterEach(() => {
  for (const root of fixtureRoots) {
    root.remove();
  }

  fixtureRoots.length = 0;
});

function setup() {
  const fixtureRoot = document.createElement("div");
  const button = document.createElement("button");
  const alert = document.createElement("div");
  const actor: AlertActor = {
    getSnapshot: () => ({ props: {}, state: undefined }),
    send: () => {},
  };

  button.textContent = "기존 작업";
  fixtureRoot.append(button, alert);
  document.body.append(fixtureRoot);
  fixtureRoots.push(fixtureRoot);

  function render(message = "") {
    const api = connect(actor, normalize);
    const rootProps = api.getRootProps();

    if (rootProps.role === undefined) {
      alert.removeAttribute("role");
    } else {
      alert.setAttribute("role", rootProps.role);
    }

    alert.textContent = message;
  }

  render();

  return { alert, button, render };
}

describe("Alert", () => {
  describe("connect", () => {
    describe("accessibility", () => {
      it("Root를 Alert live region으로 노출한다", () => {
        const fixture = setup();

        expect(fixture.alert.getAttribute("role")).toBe("alert");
      });

      it("메시지가 추가되어도 현재 Focus를 유지한다", () => {
        const fixture = setup();

        fixture.button.focus();
        fixture.render("중요한 메시지");

        expect(document.activeElement).toBe(fixture.button);
      });
    });
  });
});
