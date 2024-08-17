import { accordionAnatomy } from '@ark-ui/anatomy';
import { Accordion } from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { ChevronDownIcon } from 'lucide-react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
  ReactNode,
} from 'react';

import { sva, cx } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const accordionVariants = sva({
  className: `${IDENTIFIER.scope} accordion`,
  slots: accordionAnatomy.keys(),
  base: {
    root: {
      w: 'full',
    },
    item: {
      borderBottom: '1px solid',
      borderColor: 'neutral.200',
    },
    itemTrigger: {
      transitionProperty: 'all',
      transitionDuration: 'normal',
      w: 'full',
      paddingY: '1rem',
      display: 'flex',
      flexDir: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      _disabled: {
        color: 'disabled',
        cursor: 'not-allowed',
      },
    },
    itemIndicator: {
      transformOrigin: 'center',
      transitionProperty: 'all',
      transitionDuration: 'normal',
      _open: {
        rotate: '-180deg',
      },
    },
    itemContent: {
      overflow: 'hidden',
      _open: {
        animation: 'collapse-in 0.15s ease-in-out',
      },
      _closed: {
        animation: 'collapse-out 0.15s ease-in-out',
      },
    },
  },
});

type AccordionProviderProps = {
  indicator: ReactNode;
};
const [AccordionProvider, useAccordionContext] = createReactContext<{
  indicator: ReactNode;
}>({
  name: 'accordion',
  hookName: 'useAccordionContext',
  providerName: 'AccordionProvider',
  defaultValue: {
    indicator: null,
  },
});

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Accordion.Root>,
  ComponentPropsWithoutRef<typeof Accordion.Root> & AccordionProviderProps
>(({ indicator, children, className, ...props }, ref) => {
  const classes = accordionVariants();
  const providedValue = {
    indicator: indicator ?? (
      <ChevronDownIcon size={20} className={classes.itemIndicator} />
    ),
  };

  return (
    <AccordionProvider value={providedValue}>
      <Accordion.Root
        ref={ref}
        className={cx(classes.root, className)}
        {...props}
      >
        {children}
      </Accordion.Root>
    </AccordionProvider>
  );
});

export type ItemProps = ComponentProps<typeof Item>;
const Item = forwardRef<
  ElementRef<typeof Accordion.Item>,
  ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, ref) => {
  const classes = accordionVariants();
  return (
    <Accordion.Item
      ref={ref}
      className={cx(classes.item, className)}
      {...props}
    >
      {children}
    </Accordion.Item>
  );
});

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Accordion.ItemTrigger>,
  ComponentPropsWithoutRef<typeof Accordion.ItemTrigger>
>(({ children, className, ...props }, ref) => {
  const { indicator } = useAccordionContext();

  const classes = accordionVariants();
  return (
    <Accordion.ItemTrigger
      ref={ref}
      className={cx(classes.itemTrigger, className)}
      {...props}
    >
      {children}
      <Accordion.ItemIndicator className={classes.itemIndicator} asChild>
        {indicator}
      </Accordion.ItemIndicator>
    </Accordion.ItemTrigger>
  );
});

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Accordion.ItemContent>,
  ComponentPropsWithoutRef<typeof Accordion.ItemContent>
>(({ children, className, ...props }, ref) => {
  const classes = accordionVariants();
  return (
    <Accordion.ItemContent
      ref={ref}
      className={cx(classes.itemContent, className)}
      {...props}
    >
      {children}
    </Accordion.ItemContent>
  );
});

export { Root, Item, Trigger, Content };
