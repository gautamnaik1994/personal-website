import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Navbar, { Props } from '../components/Navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
} as Meta;

export const NavbarDefault: React.FC<Props> = (): JSX.Element => (
  <Navbar toggleTheme={action('button-click')} />
);
