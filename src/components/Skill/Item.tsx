import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  .value,
  .label {
    font-weight: var(--fontWeightMedium);
    font-size: 20px;
  }
  .label {
    color: #44d6bc;
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
