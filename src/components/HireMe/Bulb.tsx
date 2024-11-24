import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';

const boxShadow = theme(`mode`, {
  light: `0 0 75px 41px rgba(255, 197, 12,  0.8)`,
  dark: ` 0 0 75px 41px rgba(255, 197, 12, 0.27)`,
});

const StyledBulb = styled.div`
  width: 70px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    top: 43%;
    left: 43%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 0;
  }
  .rays {
    display: none;
  }
  .cls-1 {
    fill: #8d8382;
  }
  .cls-2 {
    fill: #504742;
  }
  .cls-3 {
    fill: #848484;
  }
  .cls-4 {
    fill: #fff;
  }
  svg {
    position: relative;
    z-index: 1;
  }
  &.entered {
    &:before {
      box-shadow: ${boxShadow};
    }

    & + .hire-text {
      opacity: 1;
    }
    .rays {
      display: block;
    }
    .cls-3 {
      fill: #ffc50c;
    }
  }
`;

interface Props {
  entered: boolean;
}

export default function Bulb({ entered }: Props) {
  return (
    <StyledBulb className={entered && `entered`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.1 128.1">
        <rect
          className="cls-1"
          x={57.9}
          y={93.7}
          width={23.8}
          height={27.95}
          rx={5.5}
          ry={5.5}
          transform="rotate(-15.9 69.664 107.553)"
        />
        <path
          className="cls-2"
          d="M57 105.6l22.6-6.4a1.7 1.7 0 012.1 1 1.7 1.7 0 01-1.3 2l-22.6 6.4a1.7 1.7 0 01-2.1-1 1.7 1.7 0 011.3-2zM58.6 112.2l22.6-6.4a1.7 1.7 0 012.1 1 1.7 1.7 0 01-1.3 2l-22.6 6.4a1.7 1.7 0 01-2.1-1 1.7 1.7 0 011.3-2zM60.5 118l22.6-6.4a1.7 1.7 0 012.1 1 1.7 1.7 0 01-1.3 2L61.4 121a1.7 1.7 0 01-2.1-1 1.7 1.7 0 011.2-2z"
        />
        <path
          className="cls-3"
          d="M19.4 62.1a36 36 0 0014.1 19.7l2.5 1.7c8.2 5.6 13.1 9 16.4 17.5a3.9 3.9 0 004.7 2.3l21.1-6a3.8 3.8 0 002.8-4.4c-1.7-8.9.7-14.3 4.7-23.3l1.3-3.1A36 36 0 1019.4 62z"
        />
        <path
          className="cls-4"
          d="M61.3 25.3c4-1.2 7.8 1.5 10.8 3.9a29 29 0 017.4 8.7 26 26 0 01.4 24c-.3.7-1.2.2-1.1-.5A31.2 31.2 0 0074 40.2a26 26 0 00-6.3-6.6c-2.6-1.8-5.6-3-7.5-5.6a1.9 1.9 0 011.1-2.7z"
        />
        <g className="rays">
          <path
            className="cls-3"
            d="M88.3 22.5l21.8-2.6-3.3-5.5-18.5 8.1zM84.9 21.1l7.7-8.3-6.5-3.1-1.2 11.4zM80.7 19.3L78.3 4.2l-5.6 2.3 8 12.8z"
          />
        </g>
      </svg>
    </StyledBulb>
  );
}
