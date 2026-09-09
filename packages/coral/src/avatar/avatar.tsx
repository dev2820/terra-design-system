"use client";

import * as React from "react";

import { useRender } from "../core/index";

export type AvatarImageLoadingStatus = "loading" | "loaded" | "error";

type InternalImageLoadingStatus = "idle" | AvatarImageLoadingStatus;

interface AvatarContextValue {
  imageLoadingStatus: InternalImageLoadingStatus;
  setImageLoadingStatus: React.Dispatch<React.SetStateAction<InternalImageLoadingStatus>>;
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

function useAvatarContext(part: string) {
  const context = React.use(AvatarContext);

  if (context === null) {
    throw new Error(`Avatar.${part} must be used within Avatar.Root.`);
  }

  return context;
}

function getStateAttributes(status: InternalImageLoadingStatus) {
  return {
    "data-loading": status === "loading" ? "" : undefined,
    "data-loaded": status === "loaded" ? "" : undefined,
    "data-error": status === "error" ? "" : undefined,
  };
}

export interface AvatarRootProps extends React.ComponentProps<"span"> {}

export function Root(props: AvatarRootProps) {
  const { ref, ...rest } = props;
  const [imageLoadingStatus, setImageLoadingStatus] =
    React.useState<InternalImageLoadingStatus>("idle");
  const context = React.useMemo(
    () => ({ imageLoadingStatus, setImageLoadingStatus }),
    [imageLoadingStatus],
  );
  const element = useRender({
    defaultTagName: "span",
    render: undefined,
    props: { ...rest, ref },
    internalProps: getStateAttributes(imageLoadingStatus),
  });

  return <AvatarContext value={context}>{element}</AvatarContext>;
}

export interface AvatarImageProps extends Omit<React.ComponentProps<"img">, "alt"> {
  alt: string;
  keepMounted?: boolean;
  onLoadingStatusChange?: (status: AvatarImageLoadingStatus) => void;
}

export function Image(props: AvatarImageProps) {
  const {
    alt,
    keepMounted = false,
    onLoadingStatusChange,
    sizes,
    srcSet,
    src,
    crossOrigin,
    referrerPolicy,
    ref,
    ...rest
  } = props;
  const avatar = useAvatarContext("Image");
  const setRootImageLoadingStatus = avatar.setImageLoadingStatus;
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const onLoadingStatusChangeRef = React.useRef(onLoadingStatusChange);
  const [imageLoadingStatus, setImageLoadingStatus] =
    React.useState<InternalImageLoadingStatus>("idle");

  onLoadingStatusChangeRef.current = onLoadingStatusChange;

  React.useLayoutEffect(() => {
    if (keepMounted) {
      return undefined;
    }

    if (!src && !srcSet) {
      setImageLoadingStatus("error");
      return undefined;
    }

    let active = true;
    const image = new window.Image();

    function updateStatus(status: AvatarImageLoadingStatus) {
      if (active) {
        setImageLoadingStatus(status);
      }
    }

    setImageLoadingStatus("loading");
    const handlePreload = () => updateStatus("loaded");
    const handlePreloadError = () => updateStatus("error");

    image.addEventListener("load", handlePreload);
    image.addEventListener("error", handlePreloadError);

    if (referrerPolicy !== undefined) {
      image.referrerPolicy = referrerPolicy;
    }

    image.crossOrigin = crossOrigin ?? null;

    if (sizes !== undefined) {
      image.sizes = sizes;
    }

    if (srcSet !== undefined) {
      image.srcset = srcSet;
    }

    if (src !== undefined) {
      image.src = src;
    }

    if (image.complete) {
      updateStatus(image.naturalWidth > 0 ? "loaded" : "error");
    }

    return () => {
      active = false;
      image.removeEventListener("load", handlePreload);
      image.removeEventListener("error", handlePreloadError);
    };
  }, [crossOrigin, keepMounted, referrerPolicy, sizes, src, srcSet]);

  React.useLayoutEffect(() => {
    if (!keepMounted) {
      return;
    }

    const image = imageRef.current;

    if (!image || (!src && !srcSet)) {
      setImageLoadingStatus("error");
    } else if (!image.complete) {
      setImageLoadingStatus("loading");
    } else {
      setImageLoadingStatus(image.naturalWidth > 0 ? "loaded" : "error");
    }
  }, [crossOrigin, keepMounted, referrerPolicy, sizes, src, srcSet]);

  React.useLayoutEffect(() => {
    setRootImageLoadingStatus(imageLoadingStatus);
  }, [imageLoadingStatus, setRootImageLoadingStatus]);

  React.useEffect(() => {
    if (imageLoadingStatus !== "idle") {
      onLoadingStatusChangeRef.current?.(imageLoadingStatus);
    }
  }, [imageLoadingStatus]);

  React.useLayoutEffect(() => {
    return () => setRootImageLoadingStatus("idle");
  }, [setRootImageLoadingStatus]);

  function handleLoad() {
    setImageLoadingStatus("loaded");
  }

  function handleError() {
    setImageLoadingStatus("error");
  }

  const sourceProps: React.ComponentProps<"img"> = {
    ...rest,
    alt,
    crossOrigin,
    referrerPolicy,
    sizes,
    srcSet,
    src,
    ref,
  };
  const internalProps = {
    ...getStateAttributes(imageLoadingStatus),
    ...(keepMounted && imageLoadingStatus !== "loaded" ? { "aria-hidden": true } : {}),
    ref: imageRef,
    onLoad: handleLoad,
    onError: handleError,
  };
  const element = useRender({
    defaultTagName: "img",
    render: undefined,
    props: sourceProps,
    internalProps,
  });

  return keepMounted || imageLoadingStatus === "loaded" ? element : null;
}

export interface AvatarFallbackProps extends React.ComponentProps<"span"> {
  delay?: number;
}

export function Fallback(props: AvatarFallbackProps) {
  const { delay = 0, ref, ...rest } = props;
  const avatar = useAvatarContext("Fallback");
  const [delayPassed, setDelayPassed] = React.useState(delay <= 0);

  React.useEffect(() => {
    if (delay <= 0) {
      setDelayPassed(true);
      return undefined;
    }

    const timer = setTimeout(() => setDelayPassed(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const element = useRender({
    defaultTagName: "span",
    render: undefined,
    props: { ...rest, ref },
    internalProps: getStateAttributes(avatar.imageLoadingStatus),
  });
  const visible = avatar.imageLoadingStatus !== "loaded" && (delay <= 0 || delayPassed);

  return visible ? element : null;
}
