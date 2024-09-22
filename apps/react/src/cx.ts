import clsx, { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export const twMerge = extendTailwindMerge({
  prefix: '',
});

export function cx(...args: ClassValue[]): string {
  return twMerge(clsx(...args));
}
