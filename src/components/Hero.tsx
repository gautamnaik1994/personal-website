import React, { Fragment, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import media from '../utils/MediaQueries';
import Logo from './Logo';
import AbstractbgOther from '../img/abstractbgOther.svg';
import AbstractbgRings from '../img/abstractbgRings.svg';

const bgAnim = keyframes`
    0%{
        transform:translateX(0);
    }
    100%{
        transform:translateX(-2180px);
    }

`;

const StyledLogo = styled(Logo)`
  width: 22px;
  background-color: white;
  padding: 10px 19px;
  border-radius: 10px;
  box-shadow: 0 0 7px 0px #8b8b8b;
  box-sizing: content-box;
  ${media.desktop} {
    width: 31px;
    padding: 14px 26px;
    border-radius: 18px;
  }
`;

interface NameProps {
  marginLeft: number;
}

const Name = styled.div<NameProps>`
  padding: 8px 9px;
  border-radius: 5px;
  font-size: 21px;
  color: white;
  font-weight: bold;
  line-height: 23px;
  transition: margin-left 1s cubic-bezier(0.43, 1.01, 0.57, 1.18) 0.5s;
  //font-family: 'Merriweather', serif;
  position: relative;
  z-index: -1;

  ${media.desktop} {
    font-size: 33px;
    line-height: 32px;
  }
`;

interface HeroProps {
  showHero: boolean;
}

const Hero = styled.header<HeroProps>`
  position: relative;
  //margin-top: 60px;
  height: ${(props) => (props.showHero ? 30 : 0)}vh;
  background: rgba(0, 132, 255, 1);
  background-image: linear-gradient(
    243.4deg,
    rgba(0, 215, 206, 1) 13%,
    rgba(0, 132, 255, 1) 98%
  );
  overflow: hidden;
  .inner-container {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(50% + 15px);
    transform: translate(0, -50%);
    color: white;
    font-size: 25px;
    font-weight: var(--fontWeightBold);
    text-align: center;

    ${media.desktop} {
      font-size: 50px;
    }
  }

  .img-bg {
    background-position: center;
    background-size: 14%;
    position: absolute;
    left: 0;
    width: 6540px;
    top: 0;
    bottom: 0;
    background-image: url(${AbstractbgRings});
    background-repeat: repeat;
    animation: ${bgAnim} 350s infinite linear;
    ${media.desktop} {
      height: auto;
    }
  }
  ${media.desktop} {
    height: ${(props) => (props.showHero ? 50 : 0)}vh;
  }
  .img-bg-2 {
    background-image: url(${AbstractbgOther});
    animation: ${bgAnim} 250s infinite linear;
  }
`;

interface Props {
  title: string;
  showHero?: boolean;
}

export default ({
  title = `Gautam Blogs`,
  showHero = true,
}: Props): JSX.Element => {
  return (
    <Hero showHero={showHero}>
      <div className="img-bg"></div>
      <div className="img-bg img-bg-2"></div>
      <div className="inner-container">{title}</div>
    </Hero>
  );
};
