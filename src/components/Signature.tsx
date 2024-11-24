import React from 'react';
import styled, { keyframes } from 'styled-components';

const dashAnim = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const StyledSvg = styled.svg`
  .cls-1 {
    fill: none;
    stroke: var(--primary);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3px;
  }

  #gautam {
    stroke-dasharray: 1231.695556640625;
    stroke-dashoffset: 1231.695556640625;
  }
  #t_line {
    stroke-dasharray: 40.52498245239258;
    stroke-dashoffset: 40.52498245239258;
  }
  #n {
    stroke-dasharray: 180.76527404785156;
    stroke-dashoffset: 180.76527404785156;
  }
  #aik {
    stroke-dasharray: 374.37042236328125;
    stroke-dashoffset: 374.37042236328125;
  }

  #i_dot {
    stroke-dasharray: 32.17362594604492;
    stroke-dashoffset: 32.17362594604492;
  }
  &.animate {
    #gautam {
      animation: ${dashAnim} 3.5s linear forwards;
    }
    #t_line {
      animation: ${dashAnim} 150ms 3.5s linear forwards;
    }
    #n {
      animation: ${dashAnim} 700ms 4s linear forwards;
    }
    #aik {
      animation: ${dashAnim} 1.5s 5s linear forwards;
    }

    #i_dot {
      animation: dash 100ms 6.8s linear forwards;
    }
  }
`;
interface Props {
  className?: string;
}

export default ({ className }: Props): React.ReactNode => {
  return (
    <StyledSvg
      id="gautan_naik"
      width={150}
      viewBox="0 0 244.34 187.44"
      className={className}
    >
      <path
        id="gautam"
        className="cls-1"
        d="M163 274.45c5.42-7.11 52.07-85 28.32-84.65-7 .1-12.55 13-14.5 18.12-4.17 11-4.64 23.87-3.44 35.43 1 9.47 4.45 21.8 17 17.58 10.08-3.39 12.44-15.85 13.9-24.88l-5.63 40.54c-2.24 16.08-2.47 34.27-6.94 49.89-2.71 9.47-11 11.22-15.06.9-6.57-16.8 2.72-36.7 10.41-51.35 6.48-12.35 13.2-24.66 20.84-36.33 4.63-7.07 12.88-22.19 22.6-23.2-11.29 1.94-20.16 18.51-15.93 29.38 7.19 18.43 16.42-23.44 16.93-29.38-1.53 5.57-4.31 29.63 7.19 25 8.82-3.56 11.49-26.93 13.87-34.76-2.31 5.28-4.17 29.78 5.77 27.31 8.46-2.09 13.38-29.41 13.94-36.05-1.72 5.07-5.76 24.13.73 27.65 7.91 4.3 10.75-9.79 11.92-14.46 4.51-18 6.94-36.77 9.08-55.19-1.41 8.8-2.33 17.69-3 26.58-.41 5.27-4.08 24.13-.55 28 7 7.82 11.54-8.41 13.74-13.31 3.45-7.71 7.11-16.11 14.19-21.24-4.55 4.22-20.72 29-10.19 33.64s12-28.47 11.34-33.22c-.85 6-.35 25.42 8.85 21.12 6.22-2.9 8.77-24.79 10.2-30.94L339.7 198c-.93-6.9 1-30.09 10.07-32.58 9.74-2.7 9.68 19.07 7.83 24.85a35.68 35.68 0 019-29.61c7.62-8.19 12.11-7.33 13 3 .64 7.77 3.82 14 13.36 11.15 10.24-3.07 11.09-16 11.38-24.86"
        transform="translate(-161.49 -148.45)"
      />
      <path
        id="n"
        className="cls-1"
        d="M233.52 319.34c-1.27 2.81-3.07 12.65.9 14.47 5.68 2.61 7.31-9.42 7.84-12 2.72-13.47 3.16-27.26 3.59-41a258.63 258.63 0 0016.47 42c-.13-11.7-.06-23.63 2.58-35.08 1.22-5.27 2.77-11.67 5.88-16.19-1.37 2 6.05-9.32 5.85-4.36"
        transform="translate(-161.49 -148.45)"
      />
      <path
        id="aik"
        className="cls-1"
        d="M285.38 291.7a2.53 2.53 0 001.29-4.06c-5.71 3-20.2 23.35-9.85 29.19s12.87-22.82 12.92-27.76c-.84 6.4.07 19.33 10 15.33 7.58-3 8.13-20.91 8.17-27.21-1 9.54 7.05 30.72 15.93 14.05 7.13-13.36 6.39-35.44 5.16-50a168.32 168.32 0 002.36 45.42 105.94 105.94 0 019.75-34.59L333 271.43c8.38-2 7.91 15.85 21 10.38 9.89-4.12 13.44-19.45 15.11-28.84"
        transform="translate(-161.49 -148.45)"
      />
      <path
        id="i_dot"
        className="cls-1"
        d="M307.7 255.35c-2.69-4.46-9 1.48-7.31 5.56 2.13 5.12 9.55-1.92 8.28-6.67a3.67 3.67 0 00-3.85 2.1"
        transform="translate(-161.49 -148.45)"
      />
      <path
        id="t_line"
        className="cls-1"
        d="M275 180c10-7.14 21.9-18.93 35-19"
        transform="translate(-161.49 -148.45)"
      />
    </StyledSvg>
  );
};
