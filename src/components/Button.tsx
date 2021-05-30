import React from 'react';
import styled, { css } from 'styled-components';

export const btnStyles = css<{ variant: string }>`
  padding: 13px 35px;
  border-radius: 5px;
  font-weight: var(--fontWeightRegular);
  transition: all 0.3s ease-in-out;
  border-width: 0px;
  color: white;
  display: inline-block;
  background-color: ${({ variant }) => `var(--${variant})`};
  line-height: 1;
  font-size: 14px;
  &:hover {
    filter: brightness(120%);
  }
  &:focus,
  &:active {
    filter: brightness(75%);
  }
`;

const Button = styled.button`
  ${btnStyles}
`;

export interface ButtonProps {
  className?: string;
  children?: JSX.Element | string;
  variant?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
}

export default (props: ButtonProps): JSX.Element => {
  return (
    <Button
      variant={props.variant || 'default'}
      onClick={props.onClick}
      className={props.className}
      title={props.title}
    >
      {props.children}
    </Button>
  );
};
