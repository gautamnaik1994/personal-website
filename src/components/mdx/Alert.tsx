import styled from 'styled-components';
import React from 'react';
import { colorObject } from '../../utils/colors';

const AlertStyles = styled.div<{ variant: string }>`
  padding: 20px;
  margin: 20px 0;
  border-left: 5px solid ${(props) => colorObject[props.variant]};
  background: var(--sideCardColor);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  p {
    margin: 0;
  }
`;

interface AlertProps {
  title: string;
  children: React.ReactNode | string;
  variant: string;
}

const Alert = (props: AlertProps): React.ReactNode => {
  return (
    <AlertStyles variant={props.variant || `default`}>
      <b>{props.title}</b>
      {props.children}
    </AlertStyles>
  );
};

export default Alert;
