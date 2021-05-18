import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Skill from '../components/Skill/Skill';
import Item from '../components/Skill/Item';

export default {
  title: 'Components/Skill',
  component: Skill,
} as Meta;

const details = [
  { key: 'Tech Stack', value: ' Photoshop, Adone XD, Illustrator' },
  { key: 'Languages', value: ' Photoshop, Adone XD, Illustrator' },
  { key: 'Tools', value: ' Photoshop, Adone XD, Illustrator' },
];

export const SkillProfessional = (): JSX.Element => (
  <Skill name="UI Designing" level={79} details={details}></Skill>
);
export const SkillBeginner = (): JSX.Element => (
  <Skill name="UI Designing" level={24} details={details}></Skill>
);
export const SkillAmateur = (): JSX.Element => (
  <Skill name="UI Designing" level={49} details={details}></Skill>
);
export const SkillSemiPro = (): JSX.Element => (
  <Skill name="UI Designing" level={74} details={details}></Skill>
);
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
    <Skill name="Frontend Developer" level={79} details={details}></Skill>
    <Skill name="UI Designing" level={24} details={details}></Skill>
    <Skill name="UI Designing" level={74} details={details}></Skill>
    <Skill name="UI Designing" level={49} details={details}></Skill>
  </div>
);
