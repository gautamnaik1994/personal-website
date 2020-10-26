import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import SectionTitle from '../components/SectionTitle';

export default {
  title: 'LandingPage/SectionTitle',
  component: SectionTitle,
} as Meta;

export const SectionTitleDefault = (): JSX.Element => (
  <SectionTitle title="About Me" />
);
