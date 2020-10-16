import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Metaballs from '../components/Metaballs';

export default {
  title: 'Components/Metaballs',
  component: Metaballs,
} as Meta;

export const MetaballsDefault = (): JSX.Element => <Metaballs />;
