import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import theme from 'styled-theming';
import { useSpring, animated } from 'react-spring';
import media from '../../utils/MediaQueries';
import Bulb from './Bulb';

const textColorEnd = theme(`mode`, {
  light: `hsl(46deg 100% 73%)`,
  dark: `hsla(46, 100%, 86%, 1)`,
});

const StyledHireMe = styled.div`
  padding: 30px;
  background: var(--sideCardColor);
  border-radius: 8px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--cardShadow);
  .top-sec {
    font-weight: var(--fontWeightMedium);
    font-size: 22px;
    line-height: 1.2;
  }
  .middle-sec {
    font-size: 30px;
    font-weight: var(--fontWeightLight);
    .lvl {
      margin-left: 10px;
      position: relative;
      display: inline-block;
      //transform: translateY(-100%);
    }
    .i-wrapper {
      position: absolute;
      color: var(--primary);
      right: 50%;
      transform: rotate(270deg);
      top: 100%;
      .s-icon {
        position: absolute;
        right: 16px;
      }
      /* filter: drop-shadow(-16px 0px 0px currentColor); */
    }
  }
  .bottom-sec {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hire-text {
    font-size: 25px;
    line-height: 1;
    opacity: 0.05;
    font-weight: var(--fontWeightBold);
    @supports (-webkit-background-clip: text) {
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background: linear-gradient(
        to right,
        hsla(46, 100%, 65%, 1),
        ${textColorEnd}
      );
      -webkit-background-clip: text;
      background-clip: text;
    }
  }
  &.entered {
  }
  ${media.tablet} {
    padding: 30px 15px;
    .hire-text {
      font-size: 40px;
    }
    width: 380px;
    position: sticky;
    top: 70px;
  }
  ${media.desktop} {
    padding: 30px;
  }
`;

export default function HireMe(props: any): React.Element {
  const [play] = useSound(`/click.mp3`, { volume: 0.1 });
  // const [audio] = useState(new Audio('/click.mp3'));
  const [entered, setEntered] = useState(false);
  const [entered2, setEntered2] = useState(false);
  const intersectionRef = useRef<HTMLDivElement>(null);
  const jump = useSpring({
    config: { mass: 4, tension: 250, friction: 30 },
    transform: entered ? `translateY(-100%)` : `translateY(0%)`,
  });
  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        // console.log('called callback', entries[0].intersectionRatio);
        if (intersectionRef && intersectionRef.current) {
          const ratio = entries[0].intersectionRatio;
          if (ratio > 0.75) {
            setEntered(true);
          } else {
            setEntered(false);
          }
          if (ratio > 0.8) {
            // play();
            setEntered2(true);
          } else {
            // play();
            setEntered2(false);
          }
        }
      },
      {
        threshold: [0.75, 1],
        rootMargin: `200px 0px -150px 0px`,
        // root: document.querySelector('#f_root'),
      },
    );
    intersectionRef &&
      intersectionRef.current &&
      observer.observe(intersectionRef.current);
    return () => {
      intersectionRef &&
        intersectionRef.current &&
        observer.unobserve(intersectionRef.current);
    };
  }, []);

  useEffect(() => {
    play();
    // audio.muted = true;
    // audio.volume = 0.1;
    // audio.play();
  }, [entered2]);

  return (
    <StyledHireMe ref={intersectionRef} {...props}>
      <div className="top-sec text-center">
        Want someone to take
        <br />
        your product to the
      </div>
      <div className="middle-sec">
        <span>NEXT</span>
        <animated.span className="lvl" style={jump}>
          LEVEL?{` `}
          <span className="i-wrapper">
            {` `}
            <i className="icon-arrow-right" />
            <i className="icon-arrow-right s-icon" />
          </span>
        </animated.span>
      </div>
      <div className="bottom-sec">
        <Bulb entered={entered2} />
        <div className="hire-text">HIRE ME!!!</div>
      </div>
    </StyledHireMe>
  );
}
