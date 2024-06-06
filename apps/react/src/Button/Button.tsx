import type { ComponentProps } from 'react';

import { css } from '../../styled-system/css';

export type ButtonProps = ComponentProps<'button'>;

export const Button = ({ children }: ButtonProps) => {
  return (
    <button
      className={css({
        bg: 'red.300',
        fontFamily: 'Inter',
        px: '4',
        py: '3',
        borderRadius: 'md',
        _hover: { bg: 'red.400' },
      })}
    >
      {children}
    </button>
  );
};
