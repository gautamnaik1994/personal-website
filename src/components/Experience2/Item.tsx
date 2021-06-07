import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import media from '../../utils/MediaQueries';

const Item = styled.div`
  text-align: center;
  text-transform: uppercase;
  .title {
    font-size: 12px;
    color: #808080;
    line-height: 1;
    font-weight: var(--fontWeightBold);
    &:after {
      content: attr(data-title);
    }
    ${media.tablet} {
      &:after {
        content: attr(data-titlemed);
      }
    }
  }
  .value {
    font-size: 25px;
    margin-bottom: 6px;
    font-family: 'Orbitron', sans-serif;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    letter-spacing: 2px;
  }
  ${media.tablet} {
    & + & {
    }
    .value {
      font-size: 60px;
      line-height: 1;
      margin-bottom: 10px;
    }
    .title {
      font-size: 17px;
    }
  }
`;

interface ItemProps {
  title: string;
  titlemed: string;
  value: number;
}

export default ({ title, titlemed, value }: ItemProps) => (
  <Item>
    <div className="value">{value}</div>
    <div className="title" data-titlemed={titlemed} data-title={title}></div>
  </Item>
);
