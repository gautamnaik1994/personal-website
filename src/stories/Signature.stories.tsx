import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import Signature from '../components/Signature';

export default {
  title: 'Components/Signature',
  component: Signature,
  argTypes: {
    className: {
      control: { type: 'text' },
    },
  },
} as Meta;

const Template: Story = (args) => <Signature {...args} />;

export const SignatureDefault = Template.bind({});
