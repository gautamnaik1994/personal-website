import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Hamburger from '../components/Hamburger';

export default {
  title: 'Components/Hamburger',
  component: Hamburger,
} as Meta;

export const HamburgerDefault = (): JSX.Element => (
  <Hamburger clickHandler={action('button-click')} menuOpen={false} />
);
