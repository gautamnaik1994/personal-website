import { lighten } from 'polished';
import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import Link from './Link';
import NamedLogo from './NamedLogo';
import ThemeChooser from './ThemeChooser';

const NAVIGATION = [
  { to: 'https://gautamnaik.netlify.com/', label: 'About Me' },
  { to: 'https://github.com/gautamnaik1994/my-blog', label: 'Github' },
];

const navBarBgColor = theme('mode', {
  light: '#fff',
  dark: lighten(0.15, '#121212'),
});

const NavLink = styled(Link)`
  & + & {
    margin-left: 15px;
  }
`;

const Navbar = styled.nav`
  transition: background-color 0.3s ease-in;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${navBarBgColor};
  box-shadow: 0 1px 9px 1px rgba(0, 0, 0, 0.3);
  padding: 0 15px 0 5px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 2;
  button {
    //margin-left: 5px;
  }
`;

const HomeLink = styled(Link)`
  //width: 60px;
  height: 60px;
  margin-right: auto;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* svg {
    width: 40px;
    height: 30px;
  } */
`;

interface Props {
  toggleTheme: () => void;
  className?: any;
}

export default ({ toggleTheme, className }: Props) => (
  <Navbar className={className}>
    <HomeLink title="Gautam Blogs" to="/">
      <NamedLogo />
    </HomeLink>
    <HomeLink title="Gautam Blogs" to="/blog">
      Blog
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
  </Navbar>
);
