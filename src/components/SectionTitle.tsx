import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import TitleAnimationBox from './TitleAnimationBox';

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  h2 {
    font-size: 24px;
    margin: 0;
    font-weight: var(--fontWeightMedium);
    line-height: 1.3;
    margin-left: 15px;
    ${media.desktop} {
      font-size: 30px;
    }
  }
`;

export default ({ title = 'Default' }: { title: string }) => {
  return (
    <SectionTitle>
      <TitleAnimationBox /> <h2>{title}</h2>
    </SectionTitle>
  );
};
