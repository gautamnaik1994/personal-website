import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import countdown from 'countdown';
import theme from 'styled-theming';
import Item from './Item';
import media from '../../utils/MediaQueries';

const bgColor = theme('mode', {
  dark: '#131620',
  light: '#fff',
});

const boxShadow = theme('mode', {
  light: '0px 22px 40px rgba(0, 0, 0, 0.1)',
});

const pulse = keyframes`
  from {
      box-shadow: 0 0 0px 0px #00800033, 0 0 0px 8px #00800033;
  }
  to {
      box-shadow: 0 0 0px 9px #00800033, 0 0 0px 20px #00800033;
  }
`;

const Experience = styled.div`
  padding: 10px 15px;
  border-radius: 10px;
  background: var(--cardColor);
  box-shadow: ${boxShadow};
  //filter: drop-shadow(0px 22px 40px rgba(0, 0, 0, 0.1));
  display: flex;
  justify-content: space-around;
  position: relative;
  .light-holder {
    position: absolute;
    bottom: -26px;
    width: 100px;
    height: 26px;
    background: inherit;
    box-shadow: inherit;
    &:after,
    &:before {
      content: '';
      width: 20px;
      background: inherit;
      height: 100%;
      display: block;
      position: absolute;
    }
    &:before {
      right: -10px;
      transform: skew(-20deg);
    }
    &:after {
      transform: skew(20deg);
      left: -10px;
    }
  }
  .light {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &.middle {
      background: green;
      box-shadow: 0 0 0px 9px #00800033, 0 0 0px 20px #00800033;
      animation: ${pulse} 2s linear infinite;
    }
    &:after,
    &:before {
      content: '';
      width: 5px;
      height: 5px;
      position: absolute;
      border-radius: 50%;
    }
    &:after {
      background: red;
      right: 30px;
    }
    &:before {
      background: yellow;
      left: 30px;
    }
  }
  ${media.tablet} {
    width: 680px;
    padding: 40px 50px;
    margin: 2rem auto;
    border-radius: 15px;
  }
`;

interface Props {
  className?: string;
}

export default ({ className }: Props): JSX.Element => {
  const [dateData, setDateData] = useState({
    years: 0,
    months: 0,
    days: 0,
    minutes: 0,
    hours: 0,
    seconds: 0,
  });

  useEffect(() => {
    const date = new Date(1438765200000);
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
    <Experience className={className}>
      <Item titlemed="Years" title="Yrs" value={dateData['years']} />
      <Item titlemed="Months" title="Mons" value={dateData['months']} />
      <Item titlemed="Days" title="Days" value={dateData['days']} />
      <Item titlemed="Hours" title="Hrs" value={dateData['hours']} />
      <Item titlemed="Minutes" title="Mins" value={dateData['minutes']} />
      <div className="light-holder">
        <div className="light side" />
        <div className="light middle" />
      </div>
    </Experience>
  );
};
