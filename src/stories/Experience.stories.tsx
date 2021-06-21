import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import space from '../../static/space.svg';

import Experience from '../components/Experience/Experience';
import Experience2 from '../components/Experience2/Experience';

// This default export determines where you story goes in the story list
export default {
  title: 'LandingPage/Experience',
  component: Experience,
} as Meta;

export const ExperienceDefault = (): JSX.Element => <Experience />;
export const ExperienceSpaceStyle = (): JSX.Element => (
  <Experience2 spaceImg={space} />
);
