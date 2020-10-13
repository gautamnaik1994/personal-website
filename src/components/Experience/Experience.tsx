import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import countdown from 'countdown';
import Item from './Item';
import media from '../../utils/MediaQueries';

const spin1 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Experience = styled.div`
  border: 2px solid var(--primary);
  padding: 10px 15px;
  border-radius: 10px;
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
      background-color: #c4c4c4;
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
    width: 680px;
    padding: 40px 50px;
    margin: auto;
    border-radius: 22px;
    .box-title {
      font-size: 24px;
      text-align: left;
      margin: 0;
    }
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
    border-width: 7px;
    &:after,
    &:before {
      content: '';
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }
  }

  .circle-1 {
    border-color: #ff8c32;
    border-top-color: transparent;
    animation: ${spin1} 60s linear infinite;
    &:after,
    &:before {
      top: 11px;
      background: #ff8c32;
    }
    &:after {
      left: 10px;
    }
    &:before {
      right: 10px;
    }
  }
  .circle-2 {
    width: 75%;
    height: 75%;
    border-color: #55c2d8;
    border-top-color: transparent;
    //transform: translateZ(20px);
    animation: ${spin1} 45s linear infinite reverse;
    &:after,
    &:before {
      background: #55c2d8;
      top: 5px;
    }
    &:after {
      left: 6px;
    }
    &:before {
      right: 6px;
    }
  }
  .circle-3 {
    width: 50%;
    height: 50%;
    border-color: #fc5050;
    border-top-color: transparent;
    //transform: translateZ(40px);
    animation: ${spin1} 25s linear infinite;
    &:after,
    &:before {
      background: #fc5050;
      top: 1px;
    }
    &:after {
      left: 1px;
    }
    &:before {
      right: 1px;
    }
  }
  .date-container {
    display: flex;
    justify-content: space-around;
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
          <Item titleMed="Years" title="Yrs" value={dateData['years']} />
          <Item titleMed="Months" title="Mons" value={dateData['months']} />
          <Item titleMed="Days" title="Days" value={dateData['days']} />
          <Item titleMed="Minutes" title="Mins" value={dateData['minutes']} />
          <Item titleMed="Seconds" title="Sec" value={dateData['seconds']} />
        </div>
      </div>
    </Experience>
  );
};
