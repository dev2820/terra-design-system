import { type ComponentProps, forwardRef } from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';
import { detailVariants, headingVariants } from '../typography';

export const cardVariants = sva({
  className: 'card',
  slots: ['root', 'header', 'content', 'footer', 'title', 'description'],
  base: {
    root: {
      rounded: 'lg',
      overflow: 'hidden',
    },
    header: {
      p: 6,
    },
    content: {
      px: 6,
      pb: 6,
    },
    footer: {
      px: 6,
      pb: 6,
    },
    title: {
      color: 'neutral.800',
    },
    description: {
      color: 'neutral.500',
    },
  },
  variants: {
    variant: {
      elevated: {
        root: {
          shadow: 'md',
        },
      },
      filled: {
        root: {
          bg: 'neutral.100',
        },
      },
      outline: {
        root: {
          border: '1px solid',
          borderColor: 'neutral.200',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'elevated',
  },
});

type CardProviderProps = {
  classes: ReturnType<typeof cardVariants>;
};

const [CardProvider, useCardContext] = createReactContext<CardProviderProps>({
  name: 'card',
  hookName: 'useCardContext',
  providerName: 'CardProvider',
  defaultValue: {
    classes: {},
  },
});

export type RootProps = ComponentProps<typeof Root>;

const Root = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & RecipeVariantProps<typeof cardVariants>
>((props, ref) => {
  const { variant = 'elevated', className, children, ...rest } = props;
  const classes = cardVariants({ variant });

  const ctx = {
    classes,
  };

  return (
    <CardProvider value={ctx}>
      <div ref={ref} className={cx(classes.root, className)} {...rest}>
        {children}
      </div>
    </CardProvider>
  );
});

export type HeaderProps = ComponentProps<typeof Header>;
const Header = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useCardContext();

    return (
      <div ref={ref} className={cx(classes.header, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useCardContext();

    return (
      <div ref={ref} className={cx(classes.content, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export type FooterProps = ComponentProps<typeof Footer>;
const Footer = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useCardContext();

    return (
      <div ref={ref} className={cx(classes.footer, className)} {...rest}>
        {children}
      </div>
    );
  },
);

export type TitleProps = ComponentProps<typeof Title>;
const Title = forwardRef<HTMLHeadingElement, ComponentProps<'h3'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useCardContext();

    return (
      <h3
        ref={ref}
        className={cx(
          classes.title,
          headingVariants({ size: 'sm' }),
          className,
        )}
        {...rest}
      >
        {children}
      </h3>
    );
  },
);

export type DescriptionProps = ComponentProps<typeof Description>;
const Description = forwardRef<HTMLParagraphElement, ComponentProps<'p'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useCardContext();

    return (
      <p
        ref={ref}
        className={cx(
          classes.description,
          detailVariants({ size: 'md' }),
          className,
        )}
        {...rest}
      >
        {children}
      </p>
    );
  },
);

export { Root, Header, Content, Footer, Title, Description };
