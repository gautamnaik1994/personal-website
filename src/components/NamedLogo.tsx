import React, { Fragment } from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import Logo from './Logo';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  width: 14px;
  background-color: white;
  padding: 7px 13px;
  border-radius: 7px;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.24);
  box-sizing: content-box;
  ${media.tablet} {
  }
`;

const Name = styled.div`
  padding: 8px 9px;
  border-radius: 5px;
  font-size: 18px;
  color: var(--bodyColor);
  font-weight: bold;
  line-height: 20px;
  //font-family: 'Merriweather', serif;
  position: relative;
  ${media.tablet} {
  }
`;

export default () => {
  return (
    <Wrapper>
      <StyledLogo />
      <Name>
        Gautam
        <br />
        Blogs
      </Name>
    </Wrapper>
  );
};
