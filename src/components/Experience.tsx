import React from 'react';
import styled, { keyframes } from 'styled-components';

export const spin1 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const spin2 = keyframes`
  from {
    transform: translateZ(20px) rotate(0deg);
  }
  to {
    transform: translateZ(20px) rotate(360deg);
  }
`;
export const spin3 = keyframes`
   from {
    transform: translateZ(40px) rotate(0deg);
  }
  to {
    transform: translateZ(40px) rotate(360deg);
  }
`;

const Experience = styled.div`
  border: 1px solid orange;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  .circle-container {
    /* margin: auto; */
    width: 200px;
    height: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* transform: rotate3d(1, 0, 0, 73deg); */
    transform-style: preserve-3d;
  }

  .circle {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    &:after,
    &:before {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
    &:after {
      top: 12px;
      left: 10px;
      background: red;
    }
    &:before {
      top: 12px;
      right: 10px;
      background: red;
    }
  }

  .circle-1 {
    border: 16px solid red;
    border-top-color: transparent;
    animation: ${spin1} 60s linear infinite;
  }
  .circle-2 {
    width: 70%;
    height: 70%;
    border: 16px solid blue;
    border-top-color: transparent;
    transform: translateZ(20px);
    animation: ${spin2} 45s linear infinite reverse;
    &:after,
    &:before {
      background: blue;
      top: 3px;
    }
    &:after {
      left: 1px;
    }
    &:before {
      right: 1px;
    }
  }
  .circle-3 {
    width: 40%;
    height: 40%;
    border: 16px solid green;
    border-top-color: transparent;
    transform: translateZ(40px);
    animation: ${spin3} 25s linear infinite;
    &:after,
    &:before {
      background: green;
      top: -6px;
    }
    &:after {
      left: -8px;
    }
    &:before {
      right: -8px;
    }
  }
`;

export default () => (
  <Experience>
    <div className="circle-container">
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
    </div>
    <div>
      <h3>Experience</h3>
      <div>Numbers</div>
    </div>
  </Experience>
);
