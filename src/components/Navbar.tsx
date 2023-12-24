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
  ${media.tablet} {
    display: inline-block;
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
    //margin-left: 5px;
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

export default ({ toggleTheme, className }: Props) => (
  <Navbar className={className}>
    <HomeLink title="Gautam Naik" to="/">
      <Logo />
    </HomeLink>

    {NAVIGATION.map((navigation) => (
      <NavLink
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
