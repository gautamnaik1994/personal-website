import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SkillMeter from './SkillMeter';
import media from '../../utils/MediaQueries';
import Item from './Item';

const Skill = styled.div`
  border: 2px solid var(--primary);
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 2rem;
  .box-title {
    margin: 0.5rem 0 1rem 0;
    font-weight: var(--fontWeightBold);
    font-size: 20px;
    color: var(--primary);
    text-transform: uppercase;
  }
  .right-sec {
    margin-top: 1.5rem;
  }
  ${media.tablet} {
    position: relative;
    .skill-meter {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 180px;
    }
    .right-sec {
      margin-top: 0;
    }
    .inner {
      display: flex;
      align-items: center;
    }
    padding: 25px 30px;
    padding-left: 210px;
    .box-title {
      font-size: 24px;
      text-align: left;
      margin: 0;
      margin-bottom: 2rem;
    }
    .v-hr {
      width: 1px;
      background: #808080;
      align-self: stretch;
      margin: 0 25px;
    }
  }
`;

interface Props {
  name: string;
  level: number;
  details: Array<{ key: string; value: string }>;
}

export default ({
  name = 'UI Designing',
  level = 55,
  details,
  ...props
}: Props): JSX.Element => {
  return (
    <Skill>
      <div className="box-title">{name}</div>
      <SkillMeter className="skill-meter" level={level} />
      <div className="right-sec">
        {details.map(({ key, value }) => (
          <Item key={key} label={key} value={value} />
        ))}
      </div>
    </Skill>
  );
};
