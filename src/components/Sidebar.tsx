import React, { Fragment, useState } from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { useSpring, animated } from '@react-spring/web';
import { darkBackgroundColor } from '../utils/colors';
import Link from './Link';
import Logo from './Logo';
import ThemeChooser from './ThemeChooser';
import Hamburger from './Hamburger';
import { transparentize } from 'polished';

import { NAVIGATION } from '../utils/constant';

const properties = {
  close: {
    transform: `translateX(-110%)`,
  },
  open: {
    transform: `translateX(0%)`,
  },
  springConfig: { mass: 5, tension: 250, friction: 35 },
};

const logoColor = theme(`mode`, {
  light: `#333`,
  dark: `#fff`,
});

const bgColor = theme(`mode`, {
  light: transparentize(0.5, `#fff`),
  dark: transparentize(0.5, darkBackgroundColor),
});

const NavLink = styled(Link)`
  margin-bottom: 15px;
  font-size: 18px;
  &:last-of-type {
    margin-bottom: 3rem;
  }
`;

// const bgColor = transparentize(0.5, cssVar('--bodyBackgroundColor', '#fff'));

const Sidebar = styled(animated.aside)`
  transition: background-color 0.3s ease-in;

  background-color: ${bgColor};
  backdrop-filter: blur(10px);
  ${typeof window !== `undefined` &&
  navigator.userAgent.toLowerCase().indexOf(`firefox`) > -1 &&
  css`
    background-color: var(--bodyBackgroundColor);
  `};
  padding: 35px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.5);
  will-change: transform;
`;

const HomeLink = styled(Link)`
  margin-bottom: 3rem;
  color: ${logoColor};
`;

export interface Props {
  className?: string;
  toggleTheme: () => void;
}

export default function SidebarContainer({
  className,
  toggleTheme,
}: Props): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);

  const { transform } = properties[menuOpen ? `open` : `close`];

  const sideBarProps = useSpring({
    transform,
    config: properties.springConfig,
  });
  return (
    <Fragment>
      <Sidebar
        className={className}
        style={{ transform: sideBarProps.transform }}
      >
        <HomeLink
          title="Gautam Naik"
          to="/"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <Logo />
        </HomeLink>

        {NAVIGATION.map((navigation) => (
          <NavLink
            key={navigation.label}
            title={navigation.label}
            to={navigation.to}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            {navigation.label}
          </NavLink>
        ))}
        <ThemeChooser toggleTheme={toggleTheme} maskName="Sidebar" />
      </Sidebar>
      <Hamburger
        clickHandler={() => setMenuOpen(!menuOpen)}
        menuOpen={menuOpen}
      />
    </Fragment>
  );
}
