import styled from 'styled-components';
import media from '../utils/MediaQueries';
// import Logo from './Logo';
import AbstractbgOther from '../img/abstractbgOther.svg';
import AbstractbgRings from '../img/abstractbgRings.svg';
import React from 'react';

const Hero = styled.header`
  position: relative;
  //margin-top: 60px;
  height: 30vh;
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
    animation: bgAnim 350s infinite linear;
    ${media.desktop} {
      height: auto;
    }
  }
  ${media.desktop} {
    height: 50vh;
  }
  .img-bg-2 {
    background-image: url(${AbstractbgOther});
    animation: bgAnim 250s infinite linear;
  }
`;

interface Props {
  title: string;
}

export default function HeroFn({
  title = `Gautam Blogs`,
}: Props): React.ReactNode {
  return (
    <Hero>
      <div className="img-bg"></div>
      <div className="img-bg img-bg-2"></div>
      <div className="inner-container">{title}</div>
    </Hero>
  );
}
