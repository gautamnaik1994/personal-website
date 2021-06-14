import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import DownloadCV from '../components/DownloadCVBox';

export default {
  title: 'LandingPage/DownloadCV',
  component: DownloadCV,
} as Meta;

const Template: Story = (args) => <DownloadCV {...args} />;

export const DownloadCVDefault = Template.bind({});
