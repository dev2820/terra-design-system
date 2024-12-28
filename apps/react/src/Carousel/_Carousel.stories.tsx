/**
 * api reference: https://ark-ui.com/react/docs/components/carousel
 *
 * TODO: Swipe event
 * Maybe change to https://www.embla-carousel.com/get-started/react/
 */
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react';

import { Carousel, type CarouselProps } from './index';

export default {
  title: 'Components/Carousel',
  component: Carousel.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

const images = [
  'https://tinyurl.com/5b6ka8jd',
  'https://tinyurl.com/7rmccdn5',
  'https://tinyurl.com/59jxz9uu',
];

export const Default = {
  args: {
    defaultIndex: 1,
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        <Carousel.Viewport>
          <Carousel.ItemGroup>
            <Carousel.Item key={images[0]} index={0} asChild>
              <img src={images[0]} alt={`Slide 0`} />
            </Carousel.Item>
            <Carousel.Item key={images[1]} index={1} asChild>
              <img src={images[1]} alt={`Slide 1`} />
            </Carousel.Item>
            <Carousel.Item key={images[2]} index={2} asChild>
              <img src={images[2]} alt={`Slide 2`} />
            </Carousel.Item>
          </Carousel.ItemGroup>
        </Carousel.Viewport>
        <Carousel.Control>
          <Carousel.PrevTrigger>
            <ChevronLeftCircleIcon size={32} />
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup>
            <Carousel.Indicator index={0}></Carousel.Indicator>
            <Carousel.Indicator index={1}></Carousel.Indicator>
            <Carousel.Indicator index={2}></Carousel.Indicator>
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger>
            <ChevronRightCircleIcon size={32} />
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
    );
  },
};

export const Loop = {
  args: {
    defaultIndex: 1,
    loop: true,
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        <Carousel.Viewport>
          <Carousel.ItemGroup>
            <Carousel.Item key={images[0]} index={0} asChild>
              <img src={images[0]} alt={`Slide 0`} />
            </Carousel.Item>
            <Carousel.Item key={images[1]} index={1} asChild>
              <img src={images[1]} alt={`Slide 1`} />
            </Carousel.Item>
            <Carousel.Item key={images[2]} index={2} asChild>
              <img src={images[2]} alt={`Slide 2`} />
            </Carousel.Item>
          </Carousel.ItemGroup>
        </Carousel.Viewport>
        <Carousel.Control>
          <Carousel.PrevTrigger>
            <ChevronLeftCircleIcon size={32} />
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup>
            <Carousel.Indicator index={0}></Carousel.Indicator>
            <Carousel.Indicator index={1}></Carousel.Indicator>
            <Carousel.Indicator index={2}></Carousel.Indicator>
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger>
            <ChevronRightCircleIcon size={32} />
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
    );
  },
};

export const ObjectContain = {
  args: {
    defaultIndex: 1,
    loop: true,
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        <Carousel.Viewport>
          <Carousel.ItemGroup>
            <Carousel.Item
              key={images[0]}
              index={0}
              className="trds-object-contain"
              asChild
            >
              <img src={images[0]} alt={`Slide 0`} />
            </Carousel.Item>
            <Carousel.Item
              key={images[1]}
              index={1}
              className="trds-object-contain"
              asChild
            >
              <img src={images[1]} alt={`Slide 1`} />
            </Carousel.Item>
            <Carousel.Item
              key={images[2]}
              index={2}
              className="trds-object-contain"
              asChild
            >
              <img src={images[2]} alt={`Slide 2`} />
            </Carousel.Item>
          </Carousel.ItemGroup>
        </Carousel.Viewport>
        <Carousel.Control>
          <Carousel.PrevTrigger>
            <ChevronLeftCircleIcon size={32} />
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup>
            <Carousel.Indicator index={0}></Carousel.Indicator>
            <Carousel.Indicator index={1}></Carousel.Indicator>
            <Carousel.Indicator index={2}></Carousel.Indicator>
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger>
            <ChevronRightCircleIcon size={32} />
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
    );
  },
};

export const SlidesPerView = {
  args: {
    slidesPerView: 2,
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        <Carousel.Viewport>
          <Carousel.ItemGroup>
            <Carousel.Item key={images[0]} index={0} asChild>
              <img src={images[0]} alt={`Slide 0`} />
            </Carousel.Item>
            <Carousel.Item key={images[1]} index={1} asChild>
              <img src={images[1]} alt={`Slide 1`} />
            </Carousel.Item>
            <Carousel.Item key={images[2]} index={2} asChild>
              <img src={images[2]} alt={`Slide 2`} />
            </Carousel.Item>
          </Carousel.ItemGroup>
        </Carousel.Viewport>
        <Carousel.Control>
          <Carousel.PrevTrigger>
            <ChevronLeftCircleIcon size={32} />
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup>
            <Carousel.Indicator index={0}></Carousel.Indicator>
            <Carousel.Indicator index={1}></Carousel.Indicator>
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger>
            <ChevronRightCircleIcon size={32} />
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
    );
  },
};

export const Spacing = {
  args: {
    align: 'center',
    spacing: '32px',
  },
  render: (props: CarouselProps['Root']) => {
    return (
      <Carousel.Root {...props}>
        <Carousel.Viewport>
          <Carousel.ItemGroup>
            <Carousel.Item key={images[0]} index={0} asChild>
              <img src={images[0]} alt={`Slide 0`} />
            </Carousel.Item>
            <Carousel.Item key={images[1]} index={1} asChild>
              <img src={images[1]} alt={`Slide 1`} />
            </Carousel.Item>
            <Carousel.Item key={images[2]} index={2} asChild>
              <img src={images[2]} alt={`Slide 2`} />
            </Carousel.Item>
          </Carousel.ItemGroup>
        </Carousel.Viewport>
        <Carousel.Control>
          <Carousel.PrevTrigger>
            <ChevronLeftCircleIcon size={32} />
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup>
            <Carousel.Indicator index={0}></Carousel.Indicator>
            <Carousel.Indicator index={1}></Carousel.Indicator>
            <Carousel.Indicator index={2}></Carousel.Indicator>
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger>
            <ChevronRightCircleIcon size={32} />
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
    );
  },
};
