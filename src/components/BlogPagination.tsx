import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import Link from './Link';
import media from '../utils/MediaQueries';
import { btnStyles } from './Button';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  bottom: -1px;
  justify-content: center;
  align-items: center;
  background-color: rgba(var(--bodyBackgroundColorRgb), 1);
  backdrop-filter: blur(10px);
  margin: 0 -15px;
  .left,
  .right {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    color: var(--primary);
    background-color: var(--cardColor);
    line-height: 32px;
    text-align: center;
    box-shadow: 0 0 0px 1px var(--primary);
    &.disabled {
      pointer-events: none;
      opacity: 0;
    }
    i {
      text-indent: 3px;
      display: inline-block;
    }
    span {
      display: none;
    }
  }
  .left {
    transform: rotate(180deg);
    display: inline-block;
  }
  ${media.desktop} {
    position: static;
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
    }
    .left {
      transform: rotate(0deg);
      span:before {
        transform: scale(-1, 1);
        right: 100%;
        left: auto;
      }
    }
  }
`;

const FilterButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  color: #fff;
  background: var(--primary);
  box-shadow: 0 0 0px 1px var(--primary);
  font-size: 24px;
  margin: 10px 20px;
  ${media.desktop} {
    display: none;
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
  nextPostTitle = 'Next',
  prevPostTitle = 'Prev',
  setMenuOpen,
  menuOpen,
}: Props) => (
  <PaginationWrapper>
    <Link
      className={` left ${!previousPagePath ? 'disabled' : ''} `}
      title={prevPostTitle}
      to={previousPagePath}
    >
      <i className="icon-arrow-right" />
      <span>&nbsp;{prevPostTitle}</span>
    </Link>
    <FilterButton onClick={() => setMenuOpen(!menuOpen)}>
      <i className="icon-category" />
    </FilterButton>
    <Link
      className={` right ${!nextPagePath ? 'disabled' : ''} `}
      title={nextPostTitle}
      to={nextPagePath}
    >
      <span>{nextPostTitle}&nbsp;</span>
      <i className="icon-arrow-right" />
    </Link>
  </PaginationWrapper>
);
