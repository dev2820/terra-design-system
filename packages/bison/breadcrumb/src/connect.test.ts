import type { ElementProps, NormalizeProps } from "@bison/core";
import { afterEach, describe, expect, it } from "vitest";

import { connect } from "./connect";
import type { BreadcrumbActor, BreadcrumbProps } from "./types";

interface TestElementProps {
  role?: "navigation";
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

interface TestLinkProps {
  "aria-current"?: "page";
}

interface TestBreadcrumbPropTypes {
  element: TestElementProps;
  link: TestLinkProps;
}

const normalize: NormalizeProps<TestBreadcrumbPropTypes> = {
  element: (props: ElementProps) => props as TestElementProps,
  link: (props: ElementProps) => props as TestLinkProps,
};

const fixtureRoots: HTMLElement[] = [];

afterEach(() => {
  for (const root of fixtureRoots) {
    root.remove();
  }

  fixtureRoots.length = 0;
});

function setOptionalAttribute(element: Element, name: string, value: string | undefined) {
  if (value === undefined) {
    element.removeAttribute(name);
    return;
  }

  element.setAttribute(name, value);
}

function setup(props: BreadcrumbProps) {
  const root = document.createElement("div");
  const label = document.createElement("h2");
  const navigation = document.createElement("nav");
  const list = document.createElement("ol");
  const parentItem = document.createElement("li");
  const currentItem = document.createElement("li");
  const parentLink = document.createElement("a");
  const currentLink = document.createElement("a");
  const actor: BreadcrumbActor = {
    getSnapshot: () => ({ props, state: undefined }),
    send: () => {},
  };
  const api = connect(actor, normalize);
  const rootProps = api.getRootProps();
  const parentLinkProps = api.getLinkProps();
  const currentLinkProps = api.getLinkProps({ current: true });

  label.id = "breadcrumb-label";
  label.textContent = "현재 위치";
  parentLink.href = "#parent";
  parentLink.textContent = "상위 페이지";
  currentLink.href = "#current";
  currentLink.textContent = "현재 페이지";
  parentItem.append(parentLink);
  currentItem.append(currentLink);
  list.append(parentItem, currentItem);
  navigation.append(list);
  root.append(label, navigation);
  document.body.append(root);
  fixtureRoots.push(root);

  setOptionalAttribute(navigation, "role", rootProps.role);
  setOptionalAttribute(navigation, "aria-label", rootProps["aria-label"]);
  setOptionalAttribute(navigation, "aria-labelledby", rootProps["aria-labelledby"]);
  setOptionalAttribute(parentLink, "aria-current", parentLinkProps["aria-current"]);
  setOptionalAttribute(currentLink, "aria-current", currentLinkProps["aria-current"]);

  return { currentLink, label, navigation, parentLink };
}

describe("Breadcrumb", () => {
  describe("connect", () => {
    describe("html", () => {
      it("Link의 href를 유지하고 role을 덮어쓰지 않는다", () => {
        const fixture = setup({ label: "Breadcrumb" });

        expect(fixture.parentLink.href).toContain("#parent");
        expect(fixture.currentLink.href).toContain("#current");
        expect(fixture.parentLink.hasAttribute("role")).toBe(false);
        expect(fixture.currentLink.hasAttribute("role")).toBe(false);
      });
    });

    describe("accessibility", () => {
      it("Root를 이름 있는 navigation landmark로 노출한다", () => {
        const fixture = setup({ label: "Breadcrumb" });

        expect(fixture.navigation.getAttribute("role")).toBe("navigation");
        expect(fixture.navigation.getAttribute("aria-label")).toBe("Breadcrumb");
        expect(fixture.navigation.hasAttribute("aria-labelledby")).toBe(false);
      });

      it("외부 요소로 navigation landmark의 이름을 제공한다", () => {
        const fixture = setup({ labelledBy: "breadcrumb-label" });

        expect(fixture.navigation.getAttribute("aria-labelledby")).toBe(fixture.label.id);
        expect(
          document.getElementById(fixture.navigation.getAttribute("aria-labelledby") ?? ""),
        ).toBe(fixture.label);
        expect(fixture.navigation.hasAttribute("aria-label")).toBe(false);
      });

      it("current Link에만 aria-current page를 설정한다", () => {
        const fixture = setup({ label: "Breadcrumb" });

        expect(fixture.currentLink.getAttribute("aria-current")).toBe("page");
        expect(fixture.parentLink.hasAttribute("aria-current")).toBe(false);
      });
    });
  });
});
