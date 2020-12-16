import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import HomePageHeader from '../components/HomePageSections/HomePageHeader';

export default {
  title: 'LandingPage/HomePageHeader',
  component: HomePageHeader,
} as Meta;

export const HomePageHeaderDefault = (): JSX.Element => <HomePageHeader />;
