import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Skill from '../components/Skill/Skill';
import Item from '../components/Skill/Item';

export default {
  title: 'Components/Skill',
  component: Skill,
} as Meta;

export const SkillProfessional = (): JSX.Element => (
  <Skill name="UI Designing" level={79}>
    <Item label="Tech Stack" value="Photoshop, Adone XD, Illustrator" />
    <Item label="Tech Stack" value="Photoshop, Adone XD, Illustrator" />
  </Skill>
);
export const SkillBeginner = (): JSX.Element => (
  <Skill name="UI Designing" level={24}>
    <Item label="Tech Stack" value="Photoshop, Adone XD, Illustrator" />
    <Item label="Tech Stack" value="Photoshop, Adone XD, Illustrator" />
  </Skill>
);
export const SkillAmateur = (): JSX.Element => (
  <Skill name="UI Designing" level={49}>
    <Item label="Tech Stack" value="Photoshop, Adone XD, Illustrator" />
    <Item label="Tech Stack" value="Photoshop, Adone XD, Illustrator" />
    <Item label="Tech Stack" value="Photoshop, Adone XD, Illustrator" />
    <Item label="Tech Stack" value="Photoshop, Adone XD, Illustrator" />
  </Skill>
);
export const SkillSsemiPro = (): JSX.Element => (
  <Skill name="UI Designing" level={74}>
    <Item label="Tech Stack" value="Photoshop, Adone XD, Illustrator" />
    <Item label="Tech Stack" value="Photoshop, Adone XD, Illustrator" />
  </Skill>
);
