import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SkillMeter from './SkillMeter';
import media from '../../utils/MediaQueries';

const Skill = styled.div`
  border: 2px solid var(--primary);
  padding: 10px 15px;
  border-radius: 12px;
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
    .right-sec {
      margin-top: 0;
    }
    .inner {
      display: flex;
      align-items: center;
    }
    padding: 25px 30px;
    border-radius: 22px;
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
  children?: React.ReactNode;
}

export default ({
  name = 'UI Designing',
  level = 55,
  ...props
}: Props): JSX.Element => {
  return (
    <Skill>
      <div className="box-title">{name}</div>
      <div className="inner">
        <SkillMeter level={level} />
        <div className="v-hr" />
        <div className="right-sec">{props.children}</div>
      </div>
    </Skill>
  );
};
