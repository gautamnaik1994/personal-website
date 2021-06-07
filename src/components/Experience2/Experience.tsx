import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
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
		transform: translateY(-50%) rotate(0deg);
	}
  100% {
		transform:  translateY(-50%) rotate(360deg);
  }
`;

const Experience = styled.div`
  padding: 35px 18px;
  border-radius: 10px;
  background: var(--cardColor);
  box-shadow: var(--cardShadow);
  display: flex;
  justify-content: space-around;
  position: relative;
  overflow: hidden;
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
  img {
    width: 200%;
    opacity: 0.7;
    position: absolute;
    left: -100%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
    right: 0;
    animation: ${pulse} 50s linear infinite;
  }
  ${media.tablet} {
    width: 830px;
    padding: 100px 50px;
    margin: 10rem auto;
    border-radius: 15px;
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

export default ({ className, ...props }: Props): JSX.Element => {
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
      //console.log('Data', _dateData);
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
      <img src={props.spaceImg} alt="space" />
      <Item titlemed="Years" title="Yrs" value={dateData.years} />
      <Item titlemed="Months" title="Mons" value={dateData.months} />
      <Item titlemed="Days" title="Days" value={dateData.days} />
      <Item titlemed="Hours" title="Hrs" value={dateData.hours} />
      <Item titlemed="Minutes" title="Mins" value={dateData.minutes} />
      <Item titlemed="Seconds" title="Sec" value={dateData.seconds} />
    </Experience>
  );
};
