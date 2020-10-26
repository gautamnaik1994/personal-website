import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';

const SectionTitle = styled.h2`
  font-size: 25px;
  ${media.desktop} {
    font-size: 64px;
    &:before {
      content: '';
      width: 165px;
      height: 1px;
      background: currentColor;
      display: inline-block;
      vertical-align: middle;
    }
  }
`;

export default ({ title = 'Default' }: { title: string }) => {
  return <SectionTitle>{title}</SectionTitle>;
};
