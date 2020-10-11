import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Skill from '../components/Skill/Skill';
import Item from '../components/Skill/Item';

export default {
  title: 'Components/Skill',
  component: Skill,
} as Meta;

export const SkillDefault = (): JSX.Element => (
  <Skill>
    <Item />
    <Item />
  </Skill>
);
