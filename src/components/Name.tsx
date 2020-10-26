import React, { Fragment } from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';

const Holder = styled.div`
  * {
    margin: 0;
  }
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-size: 16px;
  ${media.desktop} {
    font-size: 26px;
  }
`;
const Name = styled.h1`
  font-size: 2.8em;
  line-height: 1.2;
`;

export default () => (
  <Holder>
    <p>Hi, I am</p>
    <Name>Gautam Naik</Name>
    <p className="text-right">Frontend Developer @ Bidchat</p>
  </Holder>
);
