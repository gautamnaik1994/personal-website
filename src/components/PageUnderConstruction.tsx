import React from 'react';
import styled, { css } from 'styled-components';
import media from '../utils/MediaQueries';

const StyledDiv = styled.div`
  padding: 15px;
  background: var(--accent);
  margin-top: 60px;
  color: white;
  ${media.desktop} {
    text-align: center;
  }
`;

export default () => (
  <StyledDiv>
    **This page is under construction. Please bear with me..{' '}
  </StyledDiv>
);
