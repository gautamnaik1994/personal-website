import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { useSpring, animated } from 'react-spring';
import media from '../utils/MediaQueries';
import LinkButton from './LinkButton';

const StyledDownloadCV = styled.div`
  padding: 30px;
  background: var(--sideCardColor);
  border-radius: 8px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--cardShadow);
  .top-sec {
    font-size: 20px;
  }
  .middle-sec {
    text-transform: uppercase;
    font-size: 30px;
    font-weight: var(--fontWeightLight);
  }

  ${media.tablet} {
    width: 380px;
  }
`;

export default (props): JSX.Element => {
  return (
    <StyledDownloadCV {...props}>
      <div className="top-sec">Download my CV</div>
      <div className="middle-sec">Only 1 page</div>
      <LinkButton title="Download CV" to="#" variant="primary" download>
        Download CV
      </LinkButton>
    </StyledDownloadCV>
  );
};
