import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import TitleAnimationBox from './TitleAnimationBox';

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  justify-content: center;
  h2 {
    font-size: 24px;
    font-weight: var(--fontWeightMedium);
    line-height: 1.3;
    margin: 0 10px;
  }
  ${media.desktop} {
    h2 {
      font-size: 35px;
      text-transform: uppercase;
      margin: 0 15px;
    }
  }
`;

export default ({ title = 'Default' }: { title: string }): JSX.Element => {
  return (
    <SectionTitle>
      <TitleAnimationBox className="invert" /> <h2>{title}</h2>{' '}
      <TitleAnimationBox />
    </SectionTitle>
  );
};
