import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Skill from '../components/Skill/Skill';
import Item from '../components/Skill/Item';

export default {
  title: 'Components/Skill',
  component: Skill,
} as Meta;

export const SkillProfessional = (): JSX.Element => (
  <Skill level={79}>
    <Item />
    <Item />
  </Skill>
);
export const SkillBeginner = (): JSX.Element => (
  <Skill level={24}>
    <Item />
    <Item />
  </Skill>
);
export const SkillAmateur = (): JSX.Element => (
  <Skill level={49}>
    <Item />
    <Item />
    <Item />
    <Item />
  </Skill>
);
export const SkillSsemiPro = (): JSX.Element => (
  <Skill level={74}>
    <Item />
    <Item />
  </Skill>
);
