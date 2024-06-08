/** @type { import('@storybook/react').Preview } */
import type { Preview } from '@storybook/react';

import React from 'react';

import '../src/index.css';
import './styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    decorators: [
      Story => {
        return <Story />;
      },
    ],
  },
};

export default preview;
