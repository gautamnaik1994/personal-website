import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Experience from '../components/Experience';

// This default export determines where you story goes in the story list
export default {
  title: 'LandingPage/Experience',
  component: Experience,
} as Meta;

export const ExperienceDefault = () => <Experience />;
