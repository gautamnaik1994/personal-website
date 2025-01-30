import styled from 'styled-components';
import React from 'react';
import media from '../../utils/MediaQueries';

export default styled.aside`
  padding: 15px;
  margin: 20px 0;
  background: var(--sideCardColor);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  p {
    margin: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }
  ${media.tablet} {
    padding: 20px;
  }
`;
