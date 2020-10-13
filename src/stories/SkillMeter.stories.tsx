import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SkillMeter from '../components/Skill/SkillMeter';

export default {
  title: 'Components/SkillMeter',
  component: SkillMeter,
} as Meta;

export const SkillMeterBeginner = (): JSX.Element => <SkillMeter level={24} />;
export const SkillMeterAmateur = (): JSX.Element => <SkillMeter level={49} />;
export const SkillMeterSemiPro = (): JSX.Element => <SkillMeter level={74} />;
export const SkillMeterProfessional = (): JSX.Element => (
  <SkillMeter level={95} />
);

// interface Props {
//   level: number;
// }

// const Template: Story<Props> = (args) => <SkillMeter {...args} />;

// export const SkillMeterBeginnerTest = Template.bind({});
// SkillMeterBeginnerTest.args = {
//   level: 24,
// };

// export const SkillMeterAmateurTest = Template.bind({});
// SkillMeterAmateurTest.args = {
//   level: 49,
// };
