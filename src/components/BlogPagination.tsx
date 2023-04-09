import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import Link from './Link';
import media from '../utils/MediaQueries';
import { btnStyles } from './Button';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding-bottom: 25px;
  .left,
  .right {
    ${btnStyles}
    width: auto;
    height: auto;
    background-color: var(--primary);
    i {
      display: none;
    }
    span {
      display: inline-block;
      position: relative;
      &:before {
        position: absolute;
        content: '\\e904';
        display: inline-block;
        font-family: 'icomoon' !important;
        left: 100%;
      }
    }
    &.disabled {
      pointer-events: none;
      opacity: 0;
    }
  }
  .left {
    transform: rotate(0deg);
    span:before {
      transform: scale(-1, 1);
      right: 100%;
      left: auto;
    }
  }
`;

interface Props {
  nextPagePath?: string;
  previousPagePath?: string;
  nextPostTitle?: string;
  prevPostTitle?: string;
  setMenuOpen: (arg0: boolean) => void;
  menuOpen: boolean;
}

export default ({
  nextPagePath,
  previousPagePath,
  nextPostTitle = `Next`,
  prevPostTitle = `Prev`,
  setMenuOpen,
  menuOpen,
}: Props) => (
  <PaginationWrapper>
    <Link
      className={` left ${!previousPagePath ? `disabled` : ``} `}
      title={prevPostTitle}
      to={previousPagePath}
    >
      <i className="icon-arrow-right" />
      <span>&nbsp;{prevPostTitle}</span>
    </Link>
    <Link
      className={` right ${!nextPagePath ? `disabled` : ``} `}
      title={nextPostTitle}
      to={nextPagePath}
    >
      <span>{nextPostTitle}&nbsp;</span>
      <i className="icon-arrow-right" />
    </Link>
  </PaginationWrapper>
);
