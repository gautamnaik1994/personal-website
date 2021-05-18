import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  .label {
    font-size: 16px;
    font-weight: var(--fontWeightBold);
    color: var(--accent);
  }
  .value {
  }
  & + & {
    margin-top: 1rem;
  }
`;

interface ItemProps {
  label: string;
  value: string;
}

export default ({
  label = 'Tech Stack',
  value = 'Photoshop, Adone XD, Illustrator',
}: ItemProps): JSX.Element => (
  <Item>
    <div className="label">{label}</div>
    <div className="value">{value}</div>
  </Item>
);
