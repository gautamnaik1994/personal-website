import React from 'react';
import styled from 'styled-components';
import Link from './Link';
import media from '../utils/MediaQueries';

const PaginationWrapper = styled.div`
  padding-bottom: 1rem;
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
    padding: 8px;
    white-space: normal;
    border: 1px solid var(--cardColor);
    small {
      color: var(--bodyColor);
    }
    div {
      line-height: 1.5;
      margin-top: 5px;
    }
    &.right {
      text-align: right;
    }
  }
  ${media.desktop} {
    width: 750px;
    display: flex;
    gap: 15px;
    margin-left: auto;
    margin-right: auto;
    a {
      padding: 10px 8px;
      flex: 1;
      &.left {
        text-align: right;
      }
      &.right {
        text-align: left;
      }
      div {
        margin-top: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
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
          <small>Previous</small>
          <div>{prevPostTitle}</div>
        </Link>
      )}
      {nextPagePath && (
        <Link className="right" title={nextPostTitle} to={nextPagePath}>
          <small>Next</small>
          <div>{nextPostTitle}</div>
        </Link>
      )}
    </PaginationWrapper>
  );
}
