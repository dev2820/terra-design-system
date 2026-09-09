import axe from "axe-core";
import { Component, createRef, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Avatar } from "./index";

const fixtures: Array<{ container: HTMLDivElement; root: Root }> = [];

afterEach(() => {
  for (const fixture of fixtures) {
    flushSync(() => fixture.root.unmount());
    fixture.container.remove();
  }

  fixtures.length = 0;
  vi.unstubAllGlobals();
});

function render(children: ReactNode) {
  const container = document.createElement("div");
  const root = createRoot(container);

  document.body.append(container);
  fixtures.push({ container, root });
  flushSync(() => root.render(children));

  return container;
}

class TestErrorBoundary extends Component<
  { children: ReactNode },
  { error: globalThis.Error | null }
> {
  state: { error: globalThis.Error | null } = { error: null };

  static getDerivedStateFromError(error: globalThis.Error) {
    return { error };
  }

  render() {
    const { error } = this.state;

    return error ? error.message : this.props.children;
  }
}

class ImagePreloader {
  static instances: ImagePreloader[] = [];

  complete = false;
  naturalWidth = 0;
  referrerPolicy = "";
  crossOrigin: string | null = null;
  sizes = "";
  srcset = "";
  src = "";
  private listeners = new Map<string, () => void>();

  constructor() {
    ImagePreloader.instances.push(this);
  }

  addEventListener(type: string, listener: () => void) {
    this.listeners.set(type, listener);
  }

  removeEventListener(type: string) {
    this.listeners.delete(type);
  }

  load() {
    this.complete = true;
    this.naturalWidth = 1;
    this.listeners.get("load")?.();
  }

  fail() {
    this.complete = true;
    this.naturalWidth = 0;
    this.listeners.get("error")?.();
  }
}

function stubImagePreloader() {
  ImagePreloader.instances = [];
  vi.stubGlobal("Image", ImagePreloader);
}

describe("Avatar", () => {
  describe("구조", () => {
    it("각 Part를 정해진 네이티브 요소로 렌더링하고 ref를 연결한다", () => {
      const rootRef = createRef<HTMLSpanElement>();
      const imageRef = createRef<HTMLImageElement>();
      const fallbackRef = createRef<HTMLSpanElement>();
      const container = render(
        <Avatar.Root ref={rootRef}>
          <Avatar.Fallback ref={fallbackRef}>AB</Avatar.Fallback>
          <Avatar.Image ref={imageRef} keepMounted src="/profile.jpg" alt="프로필 사진" />
        </Avatar.Root>,
      );

      expect(rootRef.current?.tagName).toBe("SPAN");
      expect(fallbackRef.current?.tagName).toBe("SPAN");
      expect(imageRef.current?.tagName).toBe("IMG");
      expect(imageRef.current?.getAttribute("src")).toBe("/profile.jpg");
      expect(imageRef.current?.alt).toBe("프로필 사진");
      expect(container.querySelector("img")?.getAttribute("aria-hidden")).toBe("true");
    });

    it("Root 밖에서 Part를 사용하면 사용법을 설명하는 오류를 던진다", () => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      try {
        const container = render(
          <TestErrorBoundary>
            <Avatar.Fallback>AB</Avatar.Fallback>
          </TestErrorBoundary>,
        );

        expect(container.textContent).toBe("Avatar.Fallback must be used within Avatar.Root.");
      } finally {
        error.mockRestore();
      }
    });
  });

  describe("이미지 로딩", () => {
    it("기본 모드에서는 미리 불러온 이미지가 준비된 뒤 fallback과 교체한다", () => {
      stubImagePreloader();
      const onLoadingStatusChange = vi.fn();
      const container = render(
        <Avatar.Root>
          <Avatar.Fallback>AB</Avatar.Fallback>
          <Avatar.Image
            src="/profile.jpg"
            srcSet="/profile@2x.jpg 2x"
            sizes="64px"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            alt="프로필 사진"
            onLoadingStatusChange={onLoadingStatusChange}
          />
        </Avatar.Root>,
      );
      const root = container.firstElementChild;
      const preloader = ImagePreloader.instances[0];

      expect(container.querySelector("img")).toBeNull();
      expect(container.textContent).toBe("AB");
      expect(root?.hasAttribute("data-loading")).toBe(true);
      expect(preloader?.src).toBe("/profile.jpg");
      expect(preloader?.srcset).toBe("/profile@2x.jpg 2x");
      expect(preloader?.sizes).toBe("64px");
      expect(preloader?.crossOrigin).toBe("anonymous");
      expect(preloader?.referrerPolicy).toBe("no-referrer");

      flushSync(() => preloader?.load());

      expect(container.querySelector("img")?.alt).toBe("프로필 사진");
      expect(container.textContent).toBe("");
      expect(root?.hasAttribute("data-loaded")).toBe(true);
      expect(onLoadingStatusChange).toHaveBeenLastCalledWith("loaded");
    });

    it("이미지를 불러오지 못하면 fallback과 error 상태를 유지한다", () => {
      stubImagePreloader();
      const onLoadingStatusChange = vi.fn();
      const container = render(
        <Avatar.Root>
          <Avatar.Fallback>AB</Avatar.Fallback>
          <Avatar.Image
            src="/missing.jpg"
            alt="프로필 사진"
            onLoadingStatusChange={onLoadingStatusChange}
          />
        </Avatar.Root>,
      );
      const root = container.firstElementChild;

      flushSync(() => ImagePreloader.instances[0]?.fail());

      expect(container.querySelector("img")).toBeNull();
      expect(container.textContent).toBe("AB");
      expect(root?.hasAttribute("data-error")).toBe(true);
      expect(onLoadingStatusChange).toHaveBeenLastCalledWith("error");
    });

    it("delay가 지난 뒤에만 fallback을 표시한다", async () => {
      stubImagePreloader();
      const container = render(
        <Avatar.Root>
          <Avatar.Fallback delay={20}>AB</Avatar.Fallback>
          <Avatar.Image src="/profile.jpg" alt="프로필 사진" />
        </Avatar.Root>,
      );

      expect(container.textContent).toBe("");

      await vi.waitFor(() => expect(container.textContent).toBe("AB"));
    });

    it("keepMounted 이미지의 네이티브 event와 상태를 합성한다", () => {
      const onLoad = vi.fn();
      const imageRef = createRef<HTMLImageElement>();
      const container = render(
        <Avatar.Root>
          <Avatar.Fallback>AB</Avatar.Fallback>
          <Avatar.Image
            ref={imageRef}
            keepMounted
            src="/profile.jpg"
            alt="프로필 사진"
            onLoad={onLoad}
          />
        </Avatar.Root>,
      );
      const image = imageRef.current;

      expect(image?.getAttribute("aria-hidden")).toBe("true");

      flushSync(() => image?.dispatchEvent(new Event("load")));

      expect(onLoad).toHaveBeenCalledOnce();
      expect(image?.hasAttribute("aria-hidden")).toBe(false);
      expect(image?.hasAttribute("data-loaded")).toBe(true);
      expect(container.textContent).toBe("");
    });

    it("keepMounted 이미지가 실패하면 DOM에 둔 채 보조기술에서 숨긴다", () => {
      const onError = vi.fn();
      const container = render(
        <Avatar.Root>
          <Avatar.Fallback>AB</Avatar.Fallback>
          <Avatar.Image keepMounted src="/missing.jpg" alt="프로필 사진" onError={onError} />
        </Avatar.Root>,
      );
      const image = container.querySelector("img");

      flushSync(() => image?.dispatchEvent(new Event("error")));

      expect(onError).toHaveBeenCalledOnce();
      expect(image?.getAttribute("aria-hidden")).toBe("true");
      expect(image?.hasAttribute("data-error")).toBe(true);
      expect(container.textContent).toBe("AB");
    });
  });

  describe("접근성", () => {
    it("정보 이미지와 fallback 상태에 자동 검사 위반이 없다", async () => {
      const container = render(
        <Avatar.Root>
          <Avatar.Fallback>사용자</Avatar.Fallback>
          <Avatar.Image keepMounted src="/profile.jpg" alt="사용자 프로필" />
        </Avatar.Root>,
      );
      const results = await axe.run(container);

      expect(results.violations).toEqual([]);
    });

    it("장식 이미지에 빈 대체 텍스트를 전달할 수 있다", () => {
      const container = render(
        <Avatar.Root>
          <Avatar.Fallback aria-hidden>AB</Avatar.Fallback>
          <Avatar.Image keepMounted src="/profile.jpg" alt="" />
        </Avatar.Root>,
      );

      expect(container.querySelector("img")?.alt).toBe("");
    });
  });
});
