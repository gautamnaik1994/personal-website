import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const properties = {
  open: {
    transform1: 'rotate(45deg)',
    transform2: 'rotate(-45deg)',
    y1: 13,
    y2: 13,
    opacity: 0,
    transform: 'translate(-30px)',
  },
  close: {
    transform1: 'rotate(0deg)',
    transform2: 'rotate(0deg)',
    y1: 5,
    y2: 21,
    opacity: 1,
    transform: 'translateX(0px)',
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
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 2;
  rect {
    will-change: transform;
    transform-origin: center;
    fill: currentColor;
  }
`;

interface Props {
  clickHandler: () => void;
  menuOpen: boolean;
}

export default (props: Props): JSX.Element => {
  const { transform1, transform2, transform, y2, y1, opacity } = properties[
    props.menuOpen ? 'open' : 'close'
  ];

  const rect1Props = useSpring({
    transform: transform1,
    y: y1,
    config: properties.springConfig,
  });
  const rect2Props = useSpring({
    transform: transform2,
    y: y2,
    config: properties.springConfig,
  });

  const rectMid = useSpring({
    opacity,
    transform,
    config: properties.springConfig,
  });

  interface itemProps {
    key: number;
  }

  return (
    <ThemeChooser
      title="Toggle Menu"
      onClick={props.clickHandler}
      aria-label="Toggle Menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0"
        viewBox="0 0 28 28"
      >
        <animated.rect
          y={rect1Props.y}
          style={{ transform: rect1Props.transform }}
          width="28"
          height="2"
          rx="1"
          fill="white"
        />
        <animated.rect
          y="13"
          style={{ transform: rectMid.transform }}
          width="28"
          opacity={rectMid.opacity}
          height="2"
          rx="1"
          fill="white"
        />
        <animated.rect
          y={rect2Props.y}
          width="28"
          style={{ transform: rect2Props.transform }}
          height="2"
          rx="1"
          fill="white"
        />
      </svg>
    </ThemeChooser>
  );
};
