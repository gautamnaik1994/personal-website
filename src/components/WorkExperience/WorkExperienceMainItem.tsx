import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useMeasure } from 'react-use';
import media from '../../utils/MediaQueries';
import Status from './Status';

const WorkExperienceMainItem = styled.div`
  --gap: 28px;
  border-radius: 8px;
  margin-bottom: 1rem;
  margin-top: var(--gap);
  background-color: var(--cardColor);
  padding: 15px;
  padding-bottom: 0;
  position: relative;
  box-shadow: var(--cardShadow);
  &:first-child {
    --gap: 60px;
    margin-bottom: var(--gap);
  }
  &:last-child {
    .link-chain {
      display: none;
    }
  }
  .test-tube {
    height: calc(var(--gap) - 10px);
    width: 8px;
    border-radius: 20px;
    position: absolute;
    top: calc(100% + 4px);
    background: rgb(255 255 255 / 8%);
    left: 48px;
    box-shadow: inset 0 0 3px 0px rgb(255 255 255 / 37%),
      0 0 4px rgb(255 255 255 / 13%);
    &:before {
      content: '';
      position: absolute;
      display: block;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffbf46;
      top: 50%;
      border-radius: 25px;
      z-index: -1;
      box-shadow: 0 0 7px #ffbf46;
    }
  }
  .link-chain {
    position: absolute;
    top: calc(100% - 10px);
    border-radius: 10px;
    left: 48px;
    height: calc(var(--gap) + 22px);
    width: 4px;
    background-color: var(--primary);
    z-index: 1;
    &:after,
    &:before {
      content: '';
      width: 20px;
      height: 17px;
      background-color: var(--cardColor);
      display: block;
      position: absolute;
      border-radius: 3px;
      left: 50%;
      transform: translateX(-50%);
      border: 3px solid var(--bodyBackgroundColor);
    }
    &:after {
      bottom: 0;
      border-top-width: 0;
    }

    &:before {
      top: 0;
      border-bottom-width: 0;
    }
  }
  .top-content {
    padding-left: 80px;
    position: relative;
  }
  .info-sec {
    overflow: hidden;
  }
  .company {
    font-weight: var(--fontWeightMedium);
    text-transform: uppercase;
  }
  .time {
    font-size: 14px;
    color: #b7b7b7;
  }
  .info-inner {
    padding-top: 25px;
  }
  .pad-bottom {
    height: 15px;
  }
  .more-less-btn {
    border: none;
    color: var(--primary);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid var(--bodyBackgroundColor);
    padding: 0;
    background: var(--cardColor);
    margin: 0;
    position: absolute;
    right: 20px;
    bottom: -20px;
    i {
      vertical-align: text-bottom;
      transform: rotate(90deg);
      display: inline-block;
      font-weight: bold;
    }
  }
  ${media.tablet} {
    width: 400px;
  }
`;

const StyledStatus = styled(Status)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

interface Props {
  title: string;
  responsibilities: string;
  role: string;
  timeRange: string;
  status: string;
  frustration: number;
}

export default ({
  title = 'Bidchat',
  responsibilities = 'CSS variables is a new addition to CSS. As the name says, we can now add custom variables, similar to SCSS, Less and Stylus. Example This… ',
  role = 'Frontend Developer',
  timeRange = 'March 2017 - March 2020',
  status = 'stop',
  frustration = 50,
  ...props
}: Props): JSX.Element => {
  const defaultHeight = '15px';
  const [open, toggle] = useState(false);
  const [contentHeight, setContentHeight] = useState(defaultHeight);
  const [ref, { height }] = useMeasure();
  const expand = useSpring({
    config: { mass: 4, tension: 250, friction: 30 },
    height: open ? `${contentHeight + 25}px` : defaultHeight,
  });

  const rotate = useSpring({
    config: { mass: 4, tension: 250, friction: 30 },
    transform: open ? `rotate(270deg)` : 'rotate(90deg)',
  });
  useEffect(() => {
    //Sets initial height
    setContentHeight(height);

    //Adds resize event listener
    window.addEventListener('resize', setContentHeight(height));

    // Clean-up
    return window.removeEventListener('resize', setContentHeight(height));
  }, [height]);

  return (
    <WorkExperienceMainItem>
      {status === 'play' ? (
        <div className="test-tube" />
      ) : (
        <div className="link-chain" />
      )}
      <div className="top-content">
        <StyledStatus status={status} />
        <div className="">{role}</div>
        <div className="company text-primary">{title}</div>
        <div className="time">{timeRange}</div>
      </div>

      <animated.div className="info-sec" style={expand}>
        <div ref={ref} className="info-inner">
          {responsibilities}
          <div className="pad-bottom" />
        </div>
      </animated.div>

      <button
        className="more-less-btn"
        onClick={() => toggle(!open)}
        ariaLabel="Show Responsibilities"
        title="Show Responsibilities"
      >
        <animated.i className=" icon-arrow-right" style={rotate} />{' '}
      </button>
    </WorkExperienceMainItem>
  );
};
