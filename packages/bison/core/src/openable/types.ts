export interface OpenableProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface OpenableState {
  open: boolean;
}

export type OpenableEvent =
  | { type: "open" }
  | { type: "close" }
  | { type: "toggle" }
  | { type: "open.set"; open: boolean };
