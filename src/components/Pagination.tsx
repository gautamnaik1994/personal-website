import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import Link from './Link';
import media from '../utils/MediaQueries';
import { transparentize, lighten, desaturate } from 'polished';

const PaginationWrapper = styled.div`
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
    background: transparent;
    color: var(--primary);
    box-shadow: none;
    padding: 8px 0px;
    white-space: normal;
    span {
      border-bottom: 1px dashed;
      line-height: 1.5;
    }
    &.right {
      text-align: right;
    }
  }
  .left i {
    transform: scale(-1, 1);
    display: inline-block;
  }
  ${media.desktop} {
    width: 750px;

    flex-direction: row;
    justify-content: space-between;
    margin: 0 -1rem;
    margin-left: auto;
    margin-right: auto;
    a {
      margin: 1rem 0;
    }
  }
`;

interface Props {
  insidePost?: boolean;
  nextPagePath?: string;
  previousPagePath?: string;
  nextPostTitle?: string;
  prevPostTitle?: string;
}

export default function Pagination({
  insidePost,
  nextPagePath,
  previousPagePath,
  nextPostTitle = `Next`,
  prevPostTitle = `Prev`,
}: Props) {
  return (
    <PaginationWrapper>
      {previousPagePath && (
        <Link className="left" title={prevPostTitle} to={previousPagePath}>
          <i className="icon-arrow-right" />
          <span>&nbsp;{prevPostTitle}</span>
        </Link>
      )}
      {nextPagePath && (
        <Link className="right" title={nextPostTitle} to={nextPagePath}>
          <span>{nextPostTitle}&nbsp;</span>
          <i className="icon-arrow-right" />
        </Link>
      )}
    </PaginationWrapper>
  );
}
