import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useMeasure } from 'react-use';
import SkillMeter from './SkillMeter';
import media from '../../utils/MediaQueries';
import Item from './Item';

const Skill = styled.div`
  border-radius: 8px;
  margin-bottom: 6rem;
  background-color: var(--cardColor);
  padding: 15px;
  padding-top: 25px;
  width: 90%;
  .box-title {
    font-weight: var(--fontWeightBold);
    font-size: 24px;
    color: var(--primary);
    text-transform: uppercase;
    margin-bottom: 2rem;
    text-align: center;
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
    width: 270px;
  }
`;

interface Props {
  name: string;
  level: number;
  details: Array<{ key: string; value: string }>;
}

export default ({
  name = 'UI Designing',
  level = 55,
  details,
  ...props
}: Props): JSX.Element => {
  const defaultHeight = '25px';
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
  console.log('height ', height);
  return (
    <Skill>
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
          {open ? 'Less' : 'More'}{' '}
          <animated.i className=" icon-arrow-right" style={rotate} />{' '}
        </button>
      </div>
    </Skill>
  );
};
