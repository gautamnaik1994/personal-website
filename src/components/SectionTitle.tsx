import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import TitleAnimationBox from './TitleAnimationBox';

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  h2 {
    font-size: 24px;
    font-weight: var(--fontWeightMedium);
    line-height: 1.3;
    margin: 0 15px;
  }
  ${media.desktop} {
    justify-content: center;
    h2 {
      font-size: 40px;
    }
    & > div {
      display: none;
    }
  }
`;

export default ({ title = 'Default' }: { title: string }): JSX.Element => {
  return (
    <SectionTitle>
      <TitleAnimationBox /> <h2>{title}</h2>
    </SectionTitle>
  );
};
