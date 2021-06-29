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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FilterButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  color: var(--primary);
  background: rgba(var(--primaryRgb), 0.3);
  ${media.desktop} {
    display: none;
  }
`;

interface Props {
  nextPagePath?: string;
  previousPagePath?: string;
  nextPostTitle?: string;
  prevPostTitle?: string;
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
    {previousPagePath && (
      <Link className="left" title={prevPostTitle} to={previousPagePath}>
        <i className="icon-arrow" />
        <span>&nbsp;{prevPostTitle}</span>
      </Link>
    )}
    <FilterButton onClick={() => setMenuOpen(!menuOpen)}>
      <i className="icon-category" />
    </FilterButton>
    {nextPagePath && (
      <Link className="right" title={nextPostTitle} to={nextPagePath}>
        <span>{nextPostTitle}&nbsp;</span>
        <i className="icon-arrow" />
      </Link>
    )}
  </PaginationWrapper>
);
