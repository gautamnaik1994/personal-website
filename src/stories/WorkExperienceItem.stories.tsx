import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import WorkExperienceMainItem from '../components/WorkExperience/WorkExperienceMainItem';

export default {
  title: 'Components/WorkExperienceItem',
  component: WorkExperienceMainItem,
  argTypes: {
    status: {
      options: ['play', 'pause', 'stop'],
      control: { type: 'radio' },
    },
  },
} as Meta;

// export const WorkExperienceDefault = (): JSX.Element => (
//   <WorkExperienceMainItem />
// );

const Template: Story = (args) => <WorkExperienceMainItem {...args} />;

export const WorkExperienceItem = Template.bind({});
