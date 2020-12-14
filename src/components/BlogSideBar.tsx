import React, { Fragment, useState } from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { useSpring, animated } from 'react-spring';
import { darkBackgroundColor } from '../utils/colors';
import Link from './Link';
import { transparentize } from 'polished';
import media from '../utils/MediaQueries';

const properties = {
  close: {
    transform: 'translateX(100%)',
  },
  open: {
    transform: 'translateX(0%)',
  },
  springConfig: { mass: 5, tension: 250, friction: 35 },
};

// const bgColor = transparentize(0.5, cssVar('--bodyBackgroundColor', '#fff'));

const BlogSidebar = styled(animated.div)`
  transition: background-color 0.3s ease-in;
  background-color: var(--bodyBackgroundColor);
  position: fixed;
  top: 0;
  left: 30%;
  bottom: 0;
  z-index: 2;
  width: 100%;
  will-change: transform;
  box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.5);
  ${media.desktop} {
    position: static;
    box-shadow: none;
    transform: translateY(0) !important;
  }
`;

const FilterButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  ${media.desktop} {
    display: none;
  }
`;

export interface Props {
  className?: string;
  children: JSX.Element;
}

export default ({ className, children }: Props): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { transform } = properties[menuOpen ? 'open' : 'close'];

  const sideBarProps = useSpring({
    transform,
    config: properties.springConfig,
  });
  return (
    <Fragment>
      <BlogSidebar
        className={className}
        style={{ transform: sideBarProps.transform }}
      >
        {children}
      </BlogSidebar>
      <FilterButton onClick={() => setMenuOpen(!menuOpen)}>
        Categories
      </FilterButton>
    </Fragment>
  );
};
