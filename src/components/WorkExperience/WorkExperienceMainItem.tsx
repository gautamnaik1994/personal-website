import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
// import { MDXRenderer } from 'gatsby-plugin-mdx';
import theme from 'styled-theming';
import { useSpring, animated } from 'react-spring';
import { useMeasure } from 'react-use';
import media from '../../utils/MediaQueries';
import Status from './Status';

const testTube = keyframes`

	0%,100%{
		color:#ffbf46;
		transform:scale(1,1);
	}
	50%{
		color:#f44336;
		transform:scale(1,1.4);
	}

`;

const testTubeShadow = theme(`mode`, {
  light: `inset 0 0 5px 0px rgb(99 99 99 / 44%), 0 0 12px 7px rgb(255 255 255 / 55%)`,
  dark: `inset 0 0 3px 0px rgb(255 255 255 / 37%), 0 0 4px rgb(255 255 255 / 13%)`,
});

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
    margin-top: 0;
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
    box-shadow: ${testTubeShadow};
    &:before {
      content: '';
      position: absolute;
      display: block;
      color: #ffbf46;
      bottom: 0;
      left: 0;
      right: 0;
      background: currentColor;
      top: 50%;
      border-radius: 25px;
      z-index: -1;
      box-shadow: 0 0 7px currentColor;
      transition: transform 0.1s linear;
      animation: ${testTube} 2.8s linear infinite;
      transform-origin: bottom;
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
  .role {
    line-height: 1.2;
    margin-bottom: 5px;
  }
  .time {
    font-size: 14px;
    color: #b7b7b7;
  }
  .info-inner {
    padding-top: 25px;
    ul {
      padding-left: 15px;
      margin-bottom: 15px;
      ${media.desktop} {
        padding-left: 25px;
      }
    }
    p {
      margin-bottom: 0;
    }
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
  companyUrl: string;
}

const WorkExpeContainer = ({
  title = `Bidchat`,
  responsibilities = `CSS variables is a new addition to CSS. As the name says, we can now add custom variables, similar to SCSS, Less and Stylus. Example This… `,
  role = `Frontend Developer`,
  timeRange = `March 2017 - March 2020`,
  status = `stop`,
  companyUrl = '#',
  ...props
}: Props): React.ReactElement => {
  const defaultHeight = `15px`;
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
    <WorkExperienceMainItem>
      {status === `play` ? (
        <div className="test-tube" title="Frustration Meter" />
      ) : (
        <div className="link-chain" />
      )}
      <div className="top-content">
        <StyledStatus status={status} />
        <div className="role">{role}</div>
        <a
          href={companyUrl}
          className="company text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
        <div className="time">{timeRange}</div>
      </div>

      <animated.div className="info-sec" style={expand}>
        <div ref={ref} className="info-inner">
          <p dangerouslySetInnerHTML={{ __html: responsibilities }} />
          <div className="pad-bottom" />
        </div>
      </animated.div>

      <button
        className="more-less-btn"
        onClick={() => toggle(!open)}
        aria-label="Show Responsibilities"
        title="Show Responsibilities"
      >
        <animated.i className=" icon-arrow-right" style={rotate} />
        {` `}
      </button>
    </WorkExperienceMainItem>
  );
};

export default WorkExpeContainer;
