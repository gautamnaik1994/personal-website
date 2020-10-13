import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  className?: string;
  hideName?: boolean;
}

const Logo = styled.div<Props>`
  svg,
  h1 {
    display: inline-block;
    vertical-align: middle;
  }

  path {
    fill: currentColor;
  }

  h1 {
    font-weight: var(--fontWeightRegular);
    font-size: 24px;
    line-height: 1;
    margin: 6px 0 6px 13px;
    display: ${(props) => props.hideName && 'none'};
  }
`;

export default ({ className, hideName }: Props): JSX.Element => (
  <Logo hideName={hideName}>
    <svg
      className={className}
      width="30"
      height="40"
      viewBox="0 0 30 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.14676 26.1131L19.5059 0.297078C19.986 -0.343169 20.9983 0.138715 20.8042 0.915129L14.4164 26.4702C14.3739 26.64 14.3936 26.8195 14.4719 26.9761L20.45 38.934C20.7863 39.6068 20.0129 40.2896 19.3871 39.8724L0.326675 27.1636C-0.0236706 26.93 -0.105878 26.45 0.14676 26.1131Z"
        fill="white"
      />
      <path
        d="M29.0196 26.7334C29.0196 28.7591 27.3777 30.4012 25.3523 30.4012C23.3269 30.4012 21.6851 28.7591 21.6851 26.7334C21.6851 24.7077 23.3269 23.0656 25.3523 23.0656C27.3777 23.0656 29.0196 24.7077 29.0196 26.7334Z"
        fill="white"
      />
    </svg>
    <h1>Gautam Naik</h1>
  </Logo>
);
