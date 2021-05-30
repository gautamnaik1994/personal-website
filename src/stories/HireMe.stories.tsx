import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import HireMe from '../components/HireMe/HireMe';

export default {
  title: 'LandingPage/HireMe',
  component: HireMe,
  argTypes: {
    entered: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

const Template: Story = (args) => (
  <div style={{ height: '94vh', overflow: 'auto' }} tabIndex="0" id="f_root">
    <div style={{ height: 900 }} />
    <HireMe {...args} style={{}} />
    <div style={{ height: 900 }} />
  </div>
);

export const HireMeDefault = Template.bind({});
