import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import Skill from '../components/Skill/Skill';

export default {
  title: 'Components/Skill',
  component: Skill,
  argTypes: {
    name: {
      control: { type: 'text' },
    },
    level: {
      control: { type: 'range', min: 0, max: 100, step: 10 },
    },
  },
} as Meta;

const details = [
  { key: 'Tech Stack', value: ' Photoshop, Adone XD, Illustrator' },
  { key: 'Languages', value: ' Photoshop, Adone XD, Illustrator' },
  { key: 'Tools', value: ' Photoshop, Adone XD, Illustrator' },
];

// export const SkillProfessional = (): JSX.Element => (
//   <Skill name="User Interface Designing" level={79} details={details}></Skill>
// );
// export const SkillBeginner = (): JSX.Element => (
//   <Skill name="Frontend Development" level={24} details={details}></Skill>
// );
// export const SkillAmateur = (): JSX.Element => (
//   <Skill name="Game Developement" level={49} details={details}></Skill>
// );
// export const SkillSemiPro = (): JSX.Element => (
//   <Skill name="Machine Learning" level={74} details={details}></Skill>
// );
export const SkillList = (): JSX.Element => (
  <div
    style={{
      display: 'flex',
      whiteSpace: 'nowrap',
      overflow: 'auto',
      alignItems: 'flex-start',
      gap: 20,
    }}
  >
    <Skill name="User Interface Designing" level={79} details={details}></Skill>
    <Skill name="Frontend Development" level={24} details={details}></Skill>
    <Skill name="Game Developement" level={49} details={details}></Skill>
    <Skill name="Machine Learning" level={74} details={details}></Skill>
  </div>
);

const Template: Story = (args) => <Skill {...args} details={details} />;

export const SkillGeneric = Template.bind({});

export const SkillProfessional = Template.bind({});
SkillProfessional.args = { level: 79, name: 'User Interface Designing' };
