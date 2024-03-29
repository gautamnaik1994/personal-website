import React from 'react';
import styled from 'styled-components';
import Link from './Link';

export interface Props {
  name: string;
  children?: React.ReactElement;
}

const Badge = styled(Link)`
  color: var(--accent);
  cursor: pointer;
  & + & {
    margin-left: 7px;
  }
  text-transform: uppercase;
`;

export default function BadgeParent({
  name,
  children,
}: Props): React.ReactElement {
  return (
    <Badge title={name} to={`/blog/${name}`}>
      {name}
      {children}
    </Badge>
  );
}
