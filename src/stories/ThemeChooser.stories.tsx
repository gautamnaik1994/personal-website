import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import ThemeChooser from '../components/ThemeChooser';

export default {
  title: 'Components/ThemeChooser',
  component: ThemeChooser,
} as Meta;

export const ThemeChooserDefault = (): JSX.Element => (
  <ThemeChooser maskName="test" toggleTheme={action('button-click')} />
);
