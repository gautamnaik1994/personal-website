import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import countdown from 'countdown';
import { intervalToDuration } from 'date-fns';
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
  padding: 35px 15px 18px;
  border-radius: 10px;
  background: var(--cardColor);
  //box-shadow: ${boxShadow};
  box-shadow: var(--cardShadow);
  //filter: drop-shadow(0px 22px 40px rgba(0, 0, 0, 0.1));
  display: flex;
  justify-content: space-around;
  position: relative;
  .light-holder {
    position: absolute;
    top: 100%;
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
      border-radius: 0 0 3px 3px;
    }
    &:before {
      right: 90%;
      transform: skew(30deg);
    }
    &:after {
      transform: skew(-30deg);
      left: 90%;
    }
  }
  .name-holder {
    position: absolute;
    top: 0;
    background: inherit;
    border-radius: 14px;
    border: 4px solid var(--bodyBackgroundColor);
    transform: translateY(-50%);
    padding: 6px 25px;
    text-transform: uppercase;
    font-weight: var(--fontWeightMedium);
    letter-spacing: 1px;
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
    .light-holder {
      width: 130px;
      height: 36px;
      &:after,
      &:before {
        width: 30px;
        border-radius: 0 0 3px 3px;
      }
    }
    .light {
      width: 15px;
      height: 15px;
    }
    .name-holder {
      font-size: 26px;
      padding: 15px 40px;
      border-width: 6px;
    }
  }
`;

interface Props {
  className?: string;
}

interface dateTypes {
  years: number;
  months: number;
  days: number;
  minutes: number;
  hours: number;
  seconds: number;
}

export default ({ className }: Props): JSX.Element => {
  const [dateData, setDateData] = useState<dateTypes>({
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
      const _dateData = intervalToDuration({ start: date, end: new Date() });
      const {
        years = 0,
        months = 0,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
      } = _dateData;
      setDateData({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => {
      window.clearInterval(dateInterval);
    };
  }, []);

  return (
    <Experience className={className}>
      <div className="name-holder">Experience</div>
      <Item titlemed="Years" title="Yrs" value={dateData.years} />
      <Item titlemed="Months" title="Mons" value={dateData.months} />
      <Item titlemed="Days" title="Days" value={dateData.days} />
      <Item titlemed="Hours" title="Hrs" value={dateData.hours} />
      <Item titlemed="Minutes" title="Mins" value={dateData.minutes} />
      <div className="light-holder">
        <div className="light left" />
        <div className="light middle" />
        <div className="light right" />
      </div>
    </Experience>
  );
};
