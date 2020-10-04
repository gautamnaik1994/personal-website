import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { subContainerWidth } from '../utils/constant';
import countdown from 'countdown';

import media from '../utils/MediaQueries';

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
  border: 2px solid #67e5ff;
  padding: 10px;
  border-radius: 14px;
  .circle-container {
    display: none;
    width: 125px;
    height: 125px;
    position: relative;
    justify-content: center;
    align-items: center;
    /* transform: rotate3d(1, 0, 0, 73deg); */
    transform-style: preserve-3d;
    &:after {
      content: '';
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #808080;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .box-title {
    text-align: center;
    margin: 0.5rem 0;
    font-weight: var(--fontWeightBold);
    font-size: 20px;
    color: var(--primary);
  }
  ${media.tablet} {
    display: flex;
    .circle-container {
      display: flex;
      margin-right: 30px;
    }
  }

  .circle {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    border-width: 8px;
    &:after,
    &:before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    &:after {
      top: 8px;
      left: 10px;
      background: #ff8c32;
    }
    &:before {
      top: 8px;
      right: 10px;
      background: #ff8c32;
    }
  }

  .circle-1 {
    border-color: #ff8c32;
    border-top-color: transparent;
    animation: ${spin1} 60s linear infinite;
  }
  .circle-2 {
    width: 70%;
    height: 70%;
    border-color: #55c2d8;
    border-top-color: transparent;
    transform: translateZ(20px);
    animation: ${spin2} 45s linear infinite reverse;
    &:after,
    &:before {
      background: #55c2d8;
      top: 3px;
    }
    &:after {
      left: 4px;
    }
    &:before {
      right: 4px;
    }
  }
  .circle-3 {
    width: 40%;
    height: 40%;
    border-color: #fc5050;
    border-top-color: transparent;
    transform: translateZ(40px);
    animation: ${spin3} 25s linear infinite;
    &:after,
    &:before {
      background: #fc5050;
      top: -3px;
    }
    &:after {
      left: -1px;
    }
    &:before {
      right: -1px;
    }
  }
  .date-container {
    display: flex;
    justify-content: space-between;
    div {
      text-align: center;
    }
  }
`;

export default () => {
  const [dateData, setDateData] = useState({
    years: 0,
    months: 0,
    days: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const date = new Date(parseInt(1438765200000));
    const dateInterval = setInterval(function () {
      const _dateData = countdown(date, new Date());
      const { years, months, days, hours, minutes, seconds } = _dateData;
      setDateData({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => {
      window.clearInterval(dateInterval);
    };
  }, []);

  return (
    <Experience>
      <div className="circle-container">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      <div>
        <div className="box-title">TOTAL EXPERIENCE</div>
        <div className="date-container">
          <div className="item">
            <div className="value">Seconds</div>
            <div className="title">{dateData['seconds']}</div>
          </div>
        </div>
      </div>
    </Experience>
  );
};
