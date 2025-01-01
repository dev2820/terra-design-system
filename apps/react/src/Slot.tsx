import {
  Children,
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactElement,
} from 'react';

import { cx } from './cx';

export function Slot(props: HTMLAttributes<HTMLElement>) {
  const { children, ...rest } = props;
  const validChildren = Children.toArray(children).filter(isValidElement);

  if (Children.count(validChildren) > 1) {
    throw new Error('Only one child allowed in asChild');
  }

  if (isValidElement(validChildren[0])) {
    const child = validChildren[0] as ReactElement;

    return cloneElement(child, {
      ...rest,
      ...child.props,
      style: {
        ...props.style,
        ...child.props.style,
      },
      className: cx(child.props.className, props.className),
    });
  }
  return null;
}

export type AsChildProps<DefaultElementProps> =
  | ({ asChild?: false } & DefaultElementProps)
  | { asChild: true; children: React.ReactNode };
