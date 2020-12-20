import React from 'react';
import styled from 'styled-components';
import Link from './Link';

export interface Props {
  name: string;
}

const Badge = styled(Link)`
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.015rem;
  color: var(--accent);
  cursor: pointer;
  & + & {
    margin-left: 7px;
  }
`;

export default ({ name }: Props): JSX.Element => (
  <Badge title={name} to={`/blog/${name}`}>
    {name}
  </Badge>
);
