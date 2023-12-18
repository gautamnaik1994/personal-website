import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Metaballs from '../HomePageHead/MetaBallsWebGL';
import Name from '../HomePageHead/Name';

const HomePageHeader = styled.div`
  position: relative;
`;

export default function HomePageHeaderContainer() {
  const HomePageHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        if (HomePageHeaderRef && HomePageHeaderRef.current) {
          if (entries[0].intersectionRatio < 0.5) {
            document
              .querySelector(`nav`)
              ?.classList.remove(`navbar-special-styles`);
          } else if (entries[0].intersectionRatio > 0.5) {
            document
              .querySelector(`nav`)
              ?.classList.add(`navbar-special-styles`);
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    HomePageHeaderRef &&
      HomePageHeaderRef.current &&
      observer.observe(HomePageHeaderRef.current);
    return () => {
      document.querySelector(`nav`)?.classList.remove(`navbar-special-styles`);
    };
  });
  return (
    <HomePageHeader ref={HomePageHeaderRef}>
      <Metaballs />
      <Name />
    </HomePageHeader>
  );
}
