import React from 'react';
import styled, { keyframes } from 'styled-components';

const Status = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  font-size: 30px;
  &.status-play {
    background: #4caf50;
    box-shadow: 0 0 20px #4caf50;
  }
  &.status-pause {
    background: #00bcd4;
    box-shadow: 0 0 20px #00bcd4;
    i {
      animation: pulse 1s linear infinite;
    }
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid #00bcd4;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: rotate 1s infinite;
    }
  }
  &.status-stop {
    background: #ff7043;
    box-shadow: 0 0 15px #ff7043;
  }
`;

interface Props {
  status: string;
  className?: string;
}

export default ({ status = 'play', ...props }: Props): JSX.Element => {
  return (
    <Status className={`status-${status} ${props.className}`}>
      <i className={`icon-${status}`} />
    </Status>
  );
};
