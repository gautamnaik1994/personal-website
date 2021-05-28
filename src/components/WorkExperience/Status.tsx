import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
	from{
		transform: rotate(0deg) scale(1.2);
	}
	to{
	transform:rotate(360deg) scale(1.2);
	}
`;

const pulse = keyframes`
	0% {
		transform:scale(1);
	}
	10%{
		transform:scale(1.2);
	}
	20%{
		transform:scale(1);
	}
	30%{
		transform:scale(1.2);
	}
	40%{
		transform:scale(1);
	}
	100%{
	transform:scale(1);
	}
`;
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
  }
  &.status-pause {
    background: #00bcd4;
    i {
      animation: ${pulse} 1s linear infinite;
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
      animation: ${rotate} 1s infinite;
    }
  }
  &.status-stop {
    background: #f44336;
  }
`;

interface Props {
  status: string;
}

export default ({ status = 'play', ...props }: Props): JSX.Element => {
  return (
    <Status className={`status-${status} ${props.className}`}>
      <i className={`icon-${status}`} />
    </Status>
  );
};
