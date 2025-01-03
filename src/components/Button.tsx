import React from 'react';
import styled, { css } from 'styled-components';

export const btnStyles = css<{ variant: string; size: string }>`
  padding: 13px 35px;
  padding: ${({ size }) => size === `small` && `10px 20px`};
  border-radius: 5px;
  font-weight: var(--fontWeightRegular);
  transition: all 0.3s ease-in-out;
  border-width: 0px;
  color: white;
  display: inline-block;
  background-color: ${({ variant }) => `var(--${variant})`};
  line-height: 1;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
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
  children?: React.ReactNode | string;
  variant?: string;
  size?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
}

export default (props: ButtonProps): React.ReactNode => {
  return (
    <Button
      variant={props.variant || `default`}
      size={props.size || `default`}
      onClick={props.onClick}
      className={props.className}
      title={props.title}
    >
      {props.children}
    </Button>
  );
};
