import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Name from '../components/HomePageHead/Name';

export default {
  title: 'Components/Name',
  component: Name,
} as Meta;

export const NameDefault = (): JSX.Element => <Name />;
