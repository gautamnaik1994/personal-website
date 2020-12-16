import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Metaballs from '../components/HomePageHead/MetaballsSVG';

export default {
  title: 'Components/Metaballs',
  component: Metaballs,
} as Meta;

export const MetaballsDefault = (): JSX.Element => (
  <Metaballs showTweakPane={true} />
);
