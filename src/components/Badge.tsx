import React from 'react';
import styled from 'styled-components';
import Link from './Link';

export interface Props {
  name: string;
}

const Badge = styled(Link)`
  color: var(--accent);
  cursor: pointer;
  & + & {
    margin-left: 7px;
  }
  text-transform: uppercase;
`;

export default ({ name }: Props): JSX.Element => (
  <Badge title={name} to={`/blog/${name}`}>
    {name}
  </Badge>
);
