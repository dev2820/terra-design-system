import { IDENTIFIER } from 'env';

import { type ComponentProps, forwardRef } from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const cardVariants = tv({
  base: `${IDENTIFIER.scope} card`,
  slots: {
    root: 'trds-text-fg trds-rounded-lg trds-overflow-hidden',
    header: 'trds-p-6',
    content: 'trds-px-6 trds-pb-6',
    footer: 'trds-px-6 trds-pb-6',
    title:
      'trds-text-fg-title trds-leading-normal trds-font-bold trds-text-2xl',
    description: 'trds-text-fg-description trds-text-md',
  },
  variants: {
    variant: {
      elevated: {
        root: 'trds-bg-layer-card trds-shadow-md',
      },
      filled: {
        root: 'trds-bg-layer-fill',
      },
      outline: {
        root: 'trds-bg-transparent trds-border trds-border-boundary',
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
    classes: {} as ReturnType<typeof cardVariants>,
  },
});

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & VariantProps<typeof cardVariants>
>((props, ref) => {
  const { variant = 'elevated', className, children, ...rest } = props;
  const classes = cardVariants({ variant });

  const ctx = {
    classes,
  };

  return (
    <CardProvider value={ctx}>
      <div ref={ref} className={cx(classes.root(), className)} {...rest}>
        {children}
      </div>
    </CardProvider>
  );
});
Root.displayName = 'Card.Root';

export type HeaderProps = ComponentProps<typeof Header>;
const Header = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useCardContext();

    return (
      <div ref={ref} className={cx(classes.header(), className)} {...rest}>
        {children}
      </div>
    );
  },
);
Header.displayName = 'Card.Header';

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useCardContext();

    return (
      <div ref={ref} className={cx(classes.content(), className)} {...rest}>
        {children}
      </div>
    );
  },
);
Content.displayName = 'Card.Content';

export type FooterProps = ComponentProps<typeof Footer>;
const Footer = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useCardContext();

    return (
      <div ref={ref} className={cx(classes.footer(), className)} {...rest}>
        {children}
      </div>
    );
  },
);
Footer.displayName = 'Card.Footer';

export type TitleProps = ComponentProps<typeof Title>;
const Title = forwardRef<HTMLHeadingElement, ComponentProps<'h3'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useCardContext();

    return (
      <h3 ref={ref} className={cx(classes.title(), className)} {...rest}>
        {children}
      </h3>
    );
  },
);
Title.displayName = 'Card.Title';

export type DescriptionProps = ComponentProps<typeof Description>;
const Description = forwardRef<HTMLParagraphElement, ComponentProps<'p'>>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useCardContext();

    return (
      <p ref={ref} className={cx(classes.description(), className)} {...rest}>
        {children}
      </p>
    );
  },
);
Description.displayName = 'Card.Description';

export { Root, Header, Content, Footer, Title, Description };
