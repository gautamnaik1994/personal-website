import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const LinkButton = styled(Link)<{ variant: string }>`
  padding: 20px 35px;
  border-radius: 3px;
  font-weight: var(--fontWeightBold);
  background-color: ${(props) => `var(--${props.variant})`};
  transition: all 0.3s ease-in-out;
  border-width: 0px;
  display: inline-block;
  color: white;
  &: hover {
    filter: brightness(120%);
  }
  &:focus,
  &:active {
    filter: brightness(75%);
  }
`;

export interface LinkButtonProps {
  className?: string;
  children?: JSX.Element | string;
  variant?: string;
  to: string;
  download?: boolean;
  title: string;
}

export default (props: LinkButtonProps): JSX.Element => {
  return (
    <LinkButton
      variant={props.variant || 'default'}
      to={props.to}
      className={props.className}
      title={props.title}
    >
      {props.children}
    </LinkButton>
  );
};
