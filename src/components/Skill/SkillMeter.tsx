import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const config = [
  {
    label: `Beginner`,
    limit: 25,
    top: `4facfe`, // blue
    bottom: `00f2fe`,
    topDark: `3d8acb`,
    bottomDark: `00c2cb`,
  },
  {
    label: `Amateur`,
    limit: 50,
    top: `43e97b`, // green
    bottom: `38f9d7`,
    topDark: `36b868`,
    bottomDark: `2bc7a9`,
  },
  {
    label: `Semi Pro`,
    // yellow
    limit: 75,
    top: `f7b71d`,
    bottom: `fdef96`,
    topDark: `c68f17`,
    bottomDark: `cdbf78`,
  },
  {
    label: `Professional`,
    // red
    limit: 100,
    top: `ff0844`,
    bottom: `ffb199`,
    topDark: `cc0636`,
    bottomDark: `cc8e7a`,
  },
];

interface GradientProps {
  colors: { top: string; topDark: string; bottom: string; bottomDark: string };
}

const foregroundGrad = (props: GradientProps) => css`
  background-image: url("data:image/svg+xml,%3Csvg width='182' height='232' viewBox='0 0 182 232' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M182 18.1768C161.145 17.9924 156.144 0 131.344 0C120.904 0 112.216 4.63641 103.89 9.22013C95.5629 13.8038 83.7303 15.3054 75.5326 12.2759C67.3348 9.24647 59.3949 1.52791 46.0414 1.73865C34.0025 1.89671 29.4397 5.69013 22.6856 8.95669C15.3643 12.4867 7.6306 18.2558 0 18.1768V232H182V18.1768Z' fill='url(%23paint0_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='91' y1='0' x2='91' y2='182' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23${props
    .colors.top}'/%3E%3Cstop offset='1' stop-color='%23${props.colors
    .bottom}'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
`;

const backgroundGrad = (props: GradientProps) => css`
  background-image: url("data:image/svg+xml,%3Csvg width='182' height='232' viewBox='0 0 182 232' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 18.1768C20.8552 17.9924 25.8564 0 50.6558 0C61.0963 0 69.7839 4.63641 78.1105 9.22013C86.4371 13.8038 98.2697 15.3054 106.467 12.2759C114.665 9.24647 122.605 1.52791 135.959 1.73865C147.997 1.89671 152.56 5.69013 159.314 8.95669C166.636 12.4867 174.369 18.2558 182 18.1768V232H0V18.1768Z' fill='url(%23paint0_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='91' y1='0' x2='91' y2='182' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23${props
    .colors.topDark}'/%3E%3Cstop offset='1' stop-color='%23${props.colors
    .bottomDark}'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
`;

const SkillMeter = styled.div<{ glow: string }>`
  --glassDims: 130px;
  text-align: center;
  .value {
    font-weight: var(--fontWeightMedium);
    font-size: 26px;
    letter-spacing: -1px;
    margin-top: 1rem;
  }
  position: relative;
  min-height: var(--glassDims);
  .glass-shadow {
    background: black;
    height: calc(var(--glassDims) / 9);
    width: calc(var(--glassDims) * 0.9);
    border-radius: 50%;
    margin: auto;
    margin-top: 1rem;
    filter: blur(9px);
  }
`;

const Glass = styled.div<{ level: number; glow: string }>`
  --angle: 0deg;
  width: var(--glassDims);
  height: var(--glassDims);
  position: relative;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-radius: 50%;
  overflow: hidden;
  transform-origin: center;
  transform: rotate(var(--angle));
  background: rgba(0, 0, 0, 0.13);
  box-shadow: inset 0 0 20px #${(props) => props.glow};
  svg {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0;
    bottom: 0;
  }
  .liquid {
    top: ${(props) => props.level}%;
    left: -2px;
    right: -2px;
    bottom: -20px;
    position: absolute;
    background-size: var(--glassDims);
    background-repeat: repeat-x;
    background-position-x: 0;
  }
`;

const LiquidBackground = styled.div<{ colors: GradientProps['colors'] }>`
  animation:
    swim 200s infinite linear alternate,
    bob 2s infinite ease-in-out;
  ${backgroundGrad};
`;

const LiquidForeground = styled.div<{ colors: GradientProps['colors'] }>`
  animation:
    swim 200s infinite linear alternate-reverse,
    bob2 2s infinite ease-in-out;
  ${foregroundGrad};
`;

const BubbleHolder = styled.div<{ level: number }>`
  position: absolute;
  top: ${(props) => props.level + 10}%;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .bubble {
    width: 10px;
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    animation: swim-up 2s infinite linear;
    height: 10px;
    bottom: -5px;
    left: 50%;
  }
  .bubble-1 {
    animation-delay: 0.5s;
    left: 30%;
  }
  .bubble-2 {
    animation-delay: 1s;
    left: 70%;
  }
  .bubble-3 {
    animation-delay: 1.5s;
    left: 50%;
  }
`;

const findIndex = (val: number) => {
  if (val >= 75) return 3;
  else if (val >= 50) return 2;
  else if (val >= 25) return 1;
  else return 0;
};

interface Props {
  level: number;
  className?: string;
}

export default function SkillMeterFn({
  level,
  className = ` `,
}: Props): React.ReactElement {
  const currentConfig = config[findIndex(level)];
  const glassRef = useRef<HTMLDivElement>(null);

  const handleOrientation = (event: DeviceOrientationEvent) => {
    let z: number = 0;
    // z = event.beta - 90 ?? 0; // In degree in the range [0, 360]
    if (event.gamma) {
      z = event.gamma;
    }
    glassRef.current?.style.setProperty(`--angle`, `${-z}deg`);
  };
  useEffect(() => {
    const handleOrientationDebounced = (event: DeviceOrientationEvent) => {
      requestAnimationFrame(() => handleOrientation(event));
    };

    window.addEventListener(
      `deviceorientation`,
      handleOrientationDebounced,
      true,
    );
    return () => {
      window.removeEventListener(
        `deviceorientation`,
        handleOrientationDebounced,
      );
    };
  }, []);

  return (
    <SkillMeter className={className} glow={currentConfig.top}>
      <Glass ref={glassRef} level={100 - level} glow={currentConfig.top}>
        <LiquidBackground colors={currentConfig} className="liquid" />
        <LiquidForeground
          colors={currentConfig}
          className="liquid"
        ></LiquidForeground>
        <BubbleHolder level={100 - level}>
          <div className="bubble bubble-1" />
          <div className="bubble bubble-2" />
          <div className="bubble bubble-3" />
        </BubbleHolder>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 104 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9999 32.9575C15.9534 20.791 31.8952 10.5788 42.6582 11.5877C29.3058 16.1892 20.9487 23.1235 12.9999 32.9575Z"
            fill="#FFFFFF"
          />
          <ellipse
            cx="79.1921"
            cy="17"
            rx="1.38894"
            ry="4.40973"
            transform="rotate(-51.8978 79.1921 17)"
            fill="#FFFFFF"
          />
        </svg>
      </Glass>
      <div className="glass-shadow" />
      <div className="value ">{currentConfig.label}</div>
    </SkillMeter>
  );
}

// export default SkillMeter;
