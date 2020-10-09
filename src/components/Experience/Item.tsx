import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import media from '../../utils/MediaQueries';

const Item = styled.div`
  text-align: center;
  text-transform: uppercase;
  .title {
    font-size: 12px;
    color: #808080;
    &:after {
      content: attr(data-title);
    }
    ${media.tablet} {
      &:after {
        content: attr(data-titleMed);
      }
    }
  }
  .value {
    font-size: 25px;
  }
`;

interface ItemProps {
  title: string;
  titleMed: string;
  value: number;
}

export default ({ title, titleMed, value }: ItemProps) => (
  <Item>
    <div className="value">{value}</div>
    <div className="title" data-titleMed={titleMed} data-title={title}></div>
  </Item>
);
