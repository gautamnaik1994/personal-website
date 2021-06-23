import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import { toSvg } from 'jdenticon';

const TitleAnimationBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  i {
    display: inline-block;
    line-height: 25px;
    color: var(--primary);
    &:nth-child(1) {
    }
    &:nth-child(2) {
      opacity: 0.6;
      font-size: 0.8em;
    }
    &:nth-child(3) {
      opacity: 0.4;
      font-size: 0.6em;
    }
  }
  &.invert {
    transform: scale(-1, 1);
  }
  ${media.desktop} {
    font-size: 18px;
  }
`;

export default ({ ...props }) => {
  return (
    <TitleAnimationBox className={props.className}>
      <i className="icon-single-arrow-big"></i>
      <i className="icon-single-arrow-big"></i>
      <i className="icon-single-arrow-big"></i>
    </TitleAnimationBox>
  );
};
