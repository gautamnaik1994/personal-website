import React from 'react';
import styled from 'styled-components';

const Button = styled.button<{ variant: string }>`
  padding: 10px 35px;
  border-radius: 3px;
  font-weight: var(--fontWeightBold);
  background-color: ${(props) => `var(--${props.variant})`};
  transition: all 0.3s ease-in-out;
  border-width: 0px;
  color: white;
  display: inline-block;
  &: hover {
    filter: brightness(120%);
  }
  &:focus,
  &:active {
    filter: brightness(75%);
  }
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
