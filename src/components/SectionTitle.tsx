import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import TitleAnimationBox from './TitleAnimationBox';

const SectionTitle = styled.h2`
  margin-bottom: 3rem;
  text-align: center;
  font-size: 30px;
  font-weight: var(--fontWeightMedium);
  line-height: 1.2;
  ${media.desktop} {
    font-size: 35px;
    text-transform: uppercase;
  }
`;

export default ({ title = 'Default' }: { title: string }): JSX.Element => {
  return <SectionTitle>{title}</SectionTitle>;
};
