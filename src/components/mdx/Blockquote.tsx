import styled from 'styled-components';
import React from 'react';

export default styled.blockquote`
  padding: 20px;
  margin: 20px 0;
  border-left: 5px solid pink;
  background: var(--sideCardColor);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  p {
    margin: 0;
  }
`;
