import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import Link from './Link';
import media from '../utils/MediaQueries';
import { transparentize, lighten, desaturate } from 'polished';

const color = theme('mode', {
  light: '#fff',
  dark: '#333',
});

const navBarBgColor = theme('mode', {
  light: '#fff',
  dark: lighten(0.15, '#121212'),
});
const boxShadow = theme('mode', {
  light: (props: any) =>
    `0 3px var(--blur) -2px ${transparentize(0.6, props.theme.primary)}`,
});

interface PaginationWrapperProp {
  insidePost?: boolean;
}

const MobileStyleForPost = css`
  position: static;
  background: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-shadow: none;

  a {
    float: none !important;
    margin: 0;
    margin-top: 15px;
    display: block;
    border-radius: 3px;
    width: auto;
    max-width: none;
    font-size: 18px;
    //font-weight: 400;
    border-top-left-radius: 3px !important;
    border-top-right-radius: 3px !important;
    background: transparent;
    color: var(--primary);
    //border: 2px dotted var(--primary);
    box-shadow: none;
    padding: 8px 0px;
    white-space: normal;
    span {
      border-bottom: 1px dashed;
    }
    &.right {
      text-align: right;
    }
  }
`;

const PaginationWrapper = styled.div<PaginationWrapperProp>`
  position: fixed;
  bottom: -1px;
  left: 0;
  right: 0;
  background-color: ${navBarBgColor};
  border-radius: 20px 20px 0 0;
  z-index: 1;
  box-shadow: 0px -1px 9px -2px rgba(0, 0, 0, 0.25);
  a {
    margin: 10px;
    --blur: 7px;
    box-shadow: ${boxShadow};
    background-color: var(--primary);
    padding: 3px 10px;
    color: ${color};
    display: inline-block;
    position: relative;
    border-radius: 4px;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: bold;
    > * {
      vertical-align: middle;
    }
    .icon-arrow {
      display: inline-block;
      font-size: 10px;
    }
    :hover {
      --blur: 20px;
    }
    &.left {
      float: left;
      border-top-left-radius: 10px;
      .icon-arrow {
        transform: rotateZ(180deg);
      }
    }
    &.right {
      float: right;
      border-top-right-radius: 10px;
    }
  }
  :after {
    content: '';
    display: table;
    clear: both;
  }
  ${media.tablet} {
    position: static;
    background-color: transparent;
    box-shadow: none;
    a {
      font-size: 16px;
      margin: 0;
      max-width: 200px;
      padding: 7px 20px;
      border-radius: 4px;
      .icon-arrow {
        font-size: 13px;
      }
      &.left {
        border-top-left-radius: 4px;
      }
      &.right {
        border-top-right-radius: 4px;
      }
    }
  }
  ${(props) => props.insidePost && MobileStyleForPost}
`;

interface Props {
  insidePost?: boolean;
  nextPagePath?: string;
  previousPagePath?: string;
  nextPostTitle?: string;
  prevPostTitle?: string;
}

export default ({
  insidePost,
  nextPagePath,
  previousPagePath,
  nextPostTitle = 'Next',
  prevPostTitle = 'Prev',
}: Props) => (
  <PaginationWrapper insidePost={insidePost}>
    {previousPagePath && (
      <Link className="left" title={prevPostTitle} to={previousPagePath}>
        <i className="icon-arrow" />
        <span>&nbsp;{prevPostTitle}</span>
      </Link>
    )}
    {nextPagePath && (
      <Link className="right" title={nextPostTitle} to={nextPagePath}>
        <span>{nextPostTitle}&nbsp;</span>
        <i className="icon-arrow" />
      </Link>
    )}
  </PaginationWrapper>
);
