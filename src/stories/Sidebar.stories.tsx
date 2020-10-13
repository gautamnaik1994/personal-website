import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Sidebar, { Props } from '../components/Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
} as Meta;

export const SidebarDefault: React.FC<Props> = (): JSX.Element => (
  <Sidebar toggleTheme={action('button-click')} />
);
