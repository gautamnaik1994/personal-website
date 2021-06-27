import React from 'react';
import styled from 'styled-components';
import Link from './Link';
import { btnStyles } from './Button';

const LinkButton = styled(Link)`
  ${btnStyles}
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
      download={props.download}
    >
      {props.children}
    </LinkButton>
  );
};
