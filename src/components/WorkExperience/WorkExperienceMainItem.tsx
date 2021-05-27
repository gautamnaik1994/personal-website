import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useMeasure } from 'react-use';
import media from '../../utils/MediaQueries';
import Status from './Status';

const WorkExperienceMainItem = styled.div`
  border-radius: 8px;
  margin-bottom: 1rem;
  margin-top: 2rem;
  background-color: var(--cardColor);
  padding: 15px;
  padding-bottom: 0;
  position: relative;
  .link-chain {
    position: absolute;
    top: -30px;
    border-radius: 10px;
    left: 15px;
    height: 40px;
    width: 5px;
    background-color: var(--primary);
    &:after,
    &:before {
      content: '';
      width: 20px;
      height: 20px;
      background: #2d364d;
      display: block;
      position: absolute;
      border-radius: 3px;
      left: -7px;
      border: 2px solid #212738;
    }
    &:after {
      bottom: 0;
    }

    &:before {
      top: 0;
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
    width: 270px;
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
}

export default ({
  title = 'Bidchat',
  responsibilities = 'CSS variables is a new addition to CSS. As the name says, we can now add custom variables, similar to SCSS, Less and Stylus. Example This… ',
  role = 'Frontend Developer',
  timeRange = 'March 2017 - March 2020',
  status = 'stop',
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
      <div className="link-chain"></div>
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
