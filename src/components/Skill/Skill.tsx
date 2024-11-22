import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useMeasure } from 'react-use';
import SkillMeter from './SkillMeter';
import media from '../../utils/MediaQueries';
import Item from './Item';

const Skill = styled.div`
  border-radius: 8px;
  background-color: var(--cardColor);
  padding: 15px;
  padding-top: 25px;
  flex: 0 0 85%;
  white-space: normal;
  .box-title {
    font-weight: var(--fontWeightBold);
    font-size: 24px;
    color: var(--primary);
    text-transform: uppercase;
    margin-bottom: 2rem;
    text-align: center;
    min-height: 56px;
    line-height: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info-sec {
    overflow: hidden;
  }
  .info-inner {
    padding-top: 25px;
  }
  .more-less-btn {
    border: none;
    color: var(--primary);
    i {
      vertical-align: text-bottom;
      transform: rotate(90deg);
      display: inline-block;
      margin-left: 3px;
      font-weight: bold;
    }
  }
  ${media.tablet} {
    flex: 0 0 320px;
  }
`;

interface Props {
  name: string;
  level: number;
  details: Array<{ key: string; value: string }>;
  className?: string;
}

const SkillComponent = ({
  name = `UI Designing`,
  level = 55,
  details,
  ...props
}: Props): React.ReactNode => {
  const defaultHeight = `25px`;
  const [open, toggle] = useState(false);
  const [contentHeight, setContentHeight] = useState(defaultHeight);
  const [ref, { height }] = useMeasure();
  const expand = useSpring({
    config: { mass: 4, tension: 250, friction: 30 },
    height: open ? `${contentHeight + 25}px` : defaultHeight,
  });

  const rotate = useSpring({
    config: { mass: 4, tension: 250, friction: 30 },
    transform: open ? `rotate(270deg)` : `rotate(90deg)`,
  });
  useEffect(() => {
    // Sets initial height
    setContentHeight(height);

    // Adds resize event listener
    window.addEventListener(`resize`, setContentHeight(height));

    // Clean-up
    return window.removeEventListener(`resize`, setContentHeight(height));
  }, [height]);
  return (
    <Skill className={props.className}>
      <div className="box-title">{name}</div>
      <SkillMeter className="skill-meter" level={level} />
      <animated.div className="info-sec" style={expand}>
        <div ref={ref} className="info-inner">
          {details.map(({ key, value }) => (
            <Item key={key} label={key} value={value} />
          ))}
        </div>
      </animated.div>
      <div className="button-holder text-center">
        <button className="more-less-btn" onClick={() => toggle(!open)}>
          {open ? `Less` : `More`}
          {` `}
          <animated.i className=" icon-arrow-right" style={rotate} />
          {` `}
        </button>
      </div>
    </Skill>
  );
};

export default SkillComponent;
