import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import countdown from 'countdown';
import { opacify } from 'polished';
import theme from 'styled-theming';
import Item from './Item';
import media from '../../utils/MediaQueries';

const boxShadow = theme('mode', {
  light: '0px 22px 40px rgba(0, 0, 0, 0.1)',
});

const pulse = keyframes`
  0% {
		transform:  scale(0.75);
      box-shadow: 0 0 0px 0px ${opacify(
        0.2,
        '#34CA8000',
      )}, 0 0 0px 8px ${opacify(0.2, '#34CA8000')};
	}

	70% {
		transform:  scale(1);
	box-shadow: 0 0 0px 15px ${opacify(0.0, '#34CA8000')}, 0 0 0px 26px ${opacify(
  0.0,
  '#34CA8000',
)};
	}

  100% {
		transform:  scale(0.75);
      box-shadow: 0 0 0px 0px ${opacify(
        0.0,
        '#34CA8000',
      )}, 0 0 0px 0px ${opacify(0.0, '#34CA8000')};
  }
`;

const Experience = styled.div`
  padding: 22px 15px 18px;
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
    width: 90px;
    height: 26px;
    background: inherit;
    box-shadow: inherit;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
      transform: skew(-30deg);
    }
    &:after {
      transform: skew(30deg);
      left: -10px;
    }
  }
  .light {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    &.middle {
      background: #34ca80;
      transform: scale(1);
      animation: ${pulse} 2s linear infinite;
    }
    &.left {
      background: #f44336;
    }
    &.right {
      background: #ffeb3b;
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
        <div className="light left" />
        <div className="light middle" />
        <div className="light right" />
      </div>
    </Experience>
  );
};
