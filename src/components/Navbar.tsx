import React from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import Link from './Link';
import Logo from './Logo';
import ThemeChooser from './ThemeChooser';
import { NAVIGATION } from '../utils/constant';

const NavLink = styled(Link)`
  font-size: 18px;
  font-weight: var(--fontWeightMedium);
  display: none;
  position: relative;
  ${media.tablet} {
    display: inline-block;
  }
  &.nav-active:after {
    content: '';
    position: absolute;
    bottom: -21px;
    left: -10px;
    right: -10px;
    height: 3px;
    border-radius: 3px;
    background-color: var(--accent);
  }
`;

const Navbar = styled.nav`
  transition:
    background-color 0.3s ease-in,
    box-shadow 0.3s ease-in;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 25px;
  background-color: rgba(var(--bodyBackgroundColorRgb), 0.7);
  box-shadow: 0 1px 9px 1px rgba(0, 0, 0, 0.3);
  padding: 10px 15px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 2;
  backdrop-filter: blur(10px);
  button {
    display: none;
    ${media.tablet} {
      display: inline-block;
    }
  }
`;

const HomeLink = styled(Link)`
  margin-right: auto;
`;

export interface Props {
  toggleTheme: () => void;
  className?: any;
}

const NavbarComponent = ({ toggleTheme, className }: Props) => (
  <Navbar className={className}>
    <HomeLink title="Gautam Naik" to="/">
      <Logo />
    </HomeLink>

    {NAVIGATION.map((navigation) => (
      <NavLink
        activeClassName="nav-active"
        partiallyActive={true}
        key={navigation.label}
        title={navigation.title}
        to={navigation.to}
        target={navigation.external ? `_blank` : undefined}
        rel={navigation.external ? `noopener noreferrer` : undefined}
      >
        {navigation.label}
      </NavLink>
    ))}
    <ThemeChooser toggleTheme={toggleTheme} maskName="Navbar" />
  </Navbar>
);

export default NavbarComponent;
