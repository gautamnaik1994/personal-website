import React from 'react';
import styled from 'styled-components';
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

const PageUnderConstruction = () => (
  <StyledDiv>**This page is under construction...{` `}</StyledDiv>
);

export default PageUnderConstruction;
