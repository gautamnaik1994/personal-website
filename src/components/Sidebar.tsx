import { lighten } from 'polished';
import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import media from '../utils/MediaQueries';
import Link from './Link';
import Logo from './Logo';
import ThemeChooser from './ThemeChooser';

import { NAVIGATION } from '../utils/constant';

const logoColor = theme('mode', {
  light: '#333',
  dark: '#fff',
});

const NavLink = styled(Link)`
  margin-bottom: 15px;
`;

const Sidebar = styled.aside`
  //transition: background-color 0.3s ease-in;

  background-color: var(--bodyBackgroundColor);
  padding: 10px 15px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const HomeLink = styled(Link)`
  margin-right: auto;
  color: ${logoColor};
`;

export interface Props {
  toggleTheme: () => void;
  className?: any;
}

export default ({ toggleTheme, className }: Props) => (
  <Sidebar className={className}>
    <HomeLink title="Gautam Naik" to="/">
      <Logo />
    </HomeLink>

    {NAVIGATION.map((navigation) => (
      <NavLink
        key={navigation.label}
        title={navigation.label}
        to={navigation.to}
      >
        {navigation.label}
      </NavLink>
    ))}
    <ThemeChooser toggleTheme={toggleTheme} />
  </Sidebar>
);
