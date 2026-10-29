import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { removeScroll } from "./remove-scroll";

let fixture: HTMLDivElement;
let restoreScroll: (() => void) | undefined;
let previousStyles: Array<[HTMLElement, string | null]>;
let previousScroll: [number, number];

beforeEach(() => {
  previousStyles = [document.documentElement, document.body].map((element) => [
    element,
    element.getAttribute("style"),
  ]);
  previousScroll = [window.scrollX, window.scrollY];
  document.documentElement.style.cssText =
    "overflow: auto; scrollbar-gutter: auto; scroll-behavior: auto;";
  document.body.style.cssText = "margin: 0;";
  fixture = document.createElement("div");
  document.body.append(fixture);
  window.scrollTo(0, 0);
});

afterEach(() => {
  restoreScroll?.();
  restoreScroll = undefined;
  vi.restoreAllMocks();
  fixture.remove();
  for (const [element, style] of previousStyles) {
    if (style === null) {
      element.removeAttribute("style");
    } else {
      element.setAttribute("style", style);
    }
  }
  window.scrollTo(...previousScroll);
});

// Overlay scrollbars can have zero width on the host OS. Only mock the measurement;
// keep computed styles and style restoration in the real browser.
function setScrollbarWidth(width: number) {
  vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(
    window.innerWidth - width,
  );
}

describe("removeScroll", () => {
  it("배경의 휠 스크롤을 잠그고 내부 스크롤을 허용하며 해제 후 배경 스크롤을 복원한다", async () => {
    fixture.style.height = "300vh";
    fixture.innerHTML = `
      <button style="position: fixed; top: 20px; left: 20px; width: 100px; height: 60px;">배경</button>
      <div style="position: fixed; top: 20px; left: 160px; width: 180px; height: 120px; overflow: auto;">
        <div style="height: 800px;">내부 스크롤 영역</div>
      </div>
    `;
    const background = fixture.querySelector("button")!;
    const viewport = fixture.querySelector("div")!;
    window.scrollTo(0, 100);
    expect(window.scrollY).toBe(100);

    restoreScroll = removeScroll(document);
    expect(getComputedStyle(document.documentElement).overflow).toBe("hidden");
    expect(getComputedStyle(document.body).overflow).toBe("hidden");

    await userEvent.wheel(background, { delta: { y: 200 } });
    await userEvent.wheel(viewport, { delta: { y: 100 } });
    await expect.poll(() => viewport.scrollTop).toBeGreaterThan(0);
    expect(window.scrollY).toBe(100);

    restoreScroll();
    await userEvent.wheel(background, { delta: { y: 200 } });
    await expect.poll(() => window.scrollY).toBeGreaterThan(100);
  });

  it("스타일시트의 기존 패딩에 스크롤바 너비를 더하고 해제 시 인라인 덮어쓰기를 제거한다", () => {
    fixture.innerHTML =
      "<style>html, body { overflow: auto; } body { padding-right: 9.5px; }</style>";
    document.documentElement.style.removeProperty("overflow");
    setScrollbarWidth(16);

    restoreScroll = removeScroll(document);
    expect(getComputedStyle(document.body).paddingRight).toBe("25.5px");

    restoreScroll();
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.paddingRight).toBe("");
    expect(getComputedStyle(document.documentElement).overflow).toBe("auto");
    expect(getComputedStyle(document.body).overflow).toBe("auto");
    expect(getComputedStyle(document.body).paddingRight).toBe("9.5px");
  });

  it("기존 인라인 값과 important 우선순위를 복원하고 다른 스타일 변경은 보존한다", () => {
    const root = document.documentElement;
    const body = document.body;
    root.style.setProperty("overflow", "scroll", "important");
    body.style.setProperty("overflow", "auto", "important");
    body.style.setProperty("padding-right", "11.5px", "important");
    setScrollbarWidth(16);

    restoreScroll = removeScroll(document);
    expect(getComputedStyle(root).overflow).toBe("hidden");
    expect(getComputedStyle(body).overflow).toBe("hidden");
    expect(getComputedStyle(body).paddingRight).toBe("27.5px");
    body.style.color = "rgb(1, 2, 3)";

    restoreScroll();
    expect(root.style.overflow).toBe("scroll");
    expect(root.style.getPropertyPriority("overflow")).toBe("important");
    expect(body.style.overflow).toBe("auto");
    expect(body.style.getPropertyPriority("overflow")).toBe("important");
    expect(body.style.paddingRight).toBe("11.5px");
    expect(body.style.getPropertyPriority("padding-right")).toBe("important");
    expect(body.style.color).toBe("rgb(1, 2, 3)");
  });

  it("스크롤바가 너비를 차지하지 않으면 기존 패딩을 유지한다", () => {
    document.body.style.paddingRight = "11.5px";
    setScrollbarWidth(0);

    restoreScroll = removeScroll(document);
    expect(document.body.style.paddingRight).toBe("11.5px");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it.each(["stable", "stable both-edges"])(
    "scrollbar-gutter가 %s이면 패딩을 추가로 보정하지 않는다",
    (gutter) => {
      document.documentElement.style.scrollbarGutter = gutter;
      document.body.style.paddingRight = "11.5px";
      setScrollbarWidth(16);

      restoreScroll = removeScroll(document);
      expect(document.body.style.paddingRight).toBe("11.5px");
      expect(document.documentElement.style.scrollbarGutter).toBe(gutter);
      expect(document.documentElement.style.overflow).toBe("hidden");
    },
  );

  it("전달받은 iframe 문서만 잠그고 복원한다", () => {
    const iframe = document.createElement("iframe");
    fixture.append(iframe);
    const frameDocument = iframe.contentDocument!;
    frameDocument.documentElement.style.overflow = "scroll";
    frameDocument.body.style.overflow = "auto";

    restoreScroll = removeScroll(frameDocument);
    expect(frameDocument.documentElement.style.overflow).toBe("hidden");
    expect(frameDocument.body.style.overflow).toBe("hidden");
    expect(document.documentElement.style.overflow).toBe("auto");
    expect(document.body.style.overflow).toBe("");

    restoreScroll();
    expect(frameDocument.documentElement.style.overflow).toBe("scroll");
    expect(frameDocument.body.style.overflow).toBe("auto");
  });
});
