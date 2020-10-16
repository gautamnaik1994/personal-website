import React, { useContext } from 'react';
import { useSpring, animated, useTransition } from 'react-spring';
import styled, { ThemeContext } from 'styled-components';
import { ThemeChangeContext } from './Layout';

const smallCircles = [
  { key: 0, cx: '14', cy: '4' },
  { key: 1, cx: '23', cy: '9' },
  { key: 2, cx: '23', cy: '19' },
  { key: 3, cx: '14', cy: '24' },
  { key: 4, cx: '5', cy: '19' },
  { key: 5, cx: '5', cy: '9' },
];

const properties = {
  light: {
    r: 9,
    transform: 'rotate(40deg)',
    rayTransform: 'scale(0)',
    cx: 14,
    cy: 6,
    opacity: 0,
    rayColor: '#000', //not matters
  },
  dark: {
    r: 6,
    transform: 'rotate(90deg)',
    rayTransform: 'scale(1)',
    cx: 30,
    cy: 0,
    opacity: 1,

    rayColor: '#fff',
  },
  springConfig: { mass: 5, tension: 250, friction: 35 },
};

const ThemeChooser = styled.button`
  display: inline-block;
  height: 28px;
  overflow: hidden;
  width: 28px;
  overflow: hidden;
  padding: 0px;
  border: none;
  outline: none;
  circle {
    will-change: transform;
    transform-origin: center;
  }
`;

interface Props {
  toggleTheme: () => void;
}

export default ({ toggleTheme }: Props): JSX.Element => {
  const themeContext = useContext(ThemeContext);
  const themeChangeContext = useContext(ThemeChangeContext);
  const isDarkMode = themeContext.mode === 'dark';
  const { r, transform, cx, cy, opacity, rayTransform, rayColor } = properties[
    isDarkMode ? 'dark' : 'light'
  ];

  const svgContainerProps = useSpring({
    transform,
    config: properties.springConfig,
  });
  const centerCircleProps = useSpring({
    r,
    fill: rayColor,
    config: properties.springConfig,
  });
  const maskedCircleProps = useSpring({
    cx,
    cy,
    config: properties.springConfig,
  });
  const linesProps = useSpring({
    opacity,
    fill: rayColor,
    config: properties.springConfig,
  });

  interface itemProps {
    key: number;
  }

  const transition = useTransition(smallCircles, {
    keys: (item: itemProps) => item.key,
    initial: { transform: 'scale(0)' },
    enter: { transform: rayTransform },
    update: { transform: rayTransform },
    leave: { transform: 'scale(0)' },
    trail: 100,
    config: properties.springConfig,
  });

  return (
    <ThemeChooser
      title="Toggle Theme"
      onClick={themeChangeContext.toggleTheme}
      aria-label="Toggle Theme"
    >
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0"
        viewBox="0 0 28 28"
        style={svgContainerProps}
      >
        <animated.g {...linesProps} strokeWidth="0">
          {transition((values, item) => {
            return (
              <animated.circle
                key={item.key}
                style={values}
                className="rays"
                cx={item.cx}
                cy={item.cy}
                r="2"
              />
            );
          })}
        </animated.g>
        <mask id="themeChooserMask">
          <rect width="100%" height="100%" fill="#fff" />
          <animated.circle {...maskedCircleProps} r="10" fill="#000" />
        </mask>
        <animated.circle
          cx="14"
          cy="14"
          {...centerCircleProps}
          strokeWidth="0"
          mask="url(#themeChooserMask)"
        />
      </animated.svg>
    </ThemeChooser>
  );
};
