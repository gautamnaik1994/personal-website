import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import Link from './Link';
import media from '../utils/MediaQueries';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  bottom: -1px;
  justify-content: center;
  align-items: center;
  background-color: rgba(var(--bodyBackgroundColorRgb), 1);
  /* box-shadow: 0 1px 9px 1px rgb(0 0 0 / 30%); */
  backdrop-filter: blur(10px);
  margin: 0 -15px;
  .left,
  .right {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    color: var(--primary);
    background: var(--cardColor);
    line-height: 30px;
    text-align: center;
    i {
      position: relative;
      right: -2px;
    }
    span {
      display: none;
    }
  }
  .left {
    transform: rotate(180deg);
    display: inline-block;
  }
`;

const FilterButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  color: var(--primary);
  background: rgba(var(--primaryRgb), 0.3);
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
  setMenuOpen: () => void;
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
      className="left"
      title={prevPostTitle}
      to={previousPagePath}
      disabled={!previousPagePath}
    >
      <i className="icon-arrow-right" />
      <span>&nbsp;{prevPostTitle}</span>
    </Link>

    <FilterButton onClick={() => setMenuOpen(!menuOpen)}>
      <i className="icon-category" />
    </FilterButton>

    <Link
      className="right"
      title={nextPostTitle}
      to={nextPagePath}
      disabled={!nextPagePath}
    >
      <span>{nextPostTitle}&nbsp;</span>
      <i className="icon-arrow-right" />
    </Link>
  </PaginationWrapper>
);
