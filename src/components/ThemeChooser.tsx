import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';

const iconYPos = theme('mode', {
  light: 'translateY(0)',
  dark: 'translateY(-34px)',
});

const ThemeChooser = styled.button`
  display: inline-block;
  height: 34px;
  overflow: hidden;
  width: 34px;
  overflow: hidden;
  padding: 4px;
  border: none;
  outline: none;
  font-size: 25px;
  margin-left: 15px;
  span {
    display: inline-block;
  }
  .i-container {
    transition: transform 0.1s linear;
    transform: ${iconYPos};
  }
  i {
    display: block;
    margin-bottom: 10px;
  }
`;

interface Props {
  toggleTheme: () => void;
}

export default ({ toggleTheme }: Props) => (
  <ThemeChooser onClick={toggleTheme}>
    <span className="i-container">
      <i className="icon-moon"></i>
      <i className="icon-sun"></i>
    </span>
  </ThemeChooser>
);
