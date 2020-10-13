import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Logo from '../components/Logo';

export default {
  title: 'Components/Logo',
  component: Logo,
} as Meta;

export const LogoDefault = (): JSX.Element => <Logo />;
export const LogoMarkOnly = (): JSX.Element => <Logo hideName />;
