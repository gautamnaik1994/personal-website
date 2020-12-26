import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Metaballs from '../HomePageHead/MetaBallsWebGL';
import Name from '../HomePageHead/Name';

const HomePageHeader = styled.div`
  position: relative;
`;

export default () => {
  const HomePageHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('called use effect');
    const observer = new IntersectionObserver(
      function (entries) {
        if (HomePageHeaderRef && HomePageHeaderRef.current) {
          // no intersection with screen
          if (entries[0].intersectionRatio < 0.5) {
            //HomePageHeaderRef.current.classList.add('category-shadow');

            document
              .querySelector('nav')
              ?.classList.remove('navbar-special-styles');
          }
          // fully intersects with screen
          else if (entries[0].intersectionRatio > 0.5) {
            //HomePageHeaderRef.current.classList.remove('category-shadow');
            document
              .querySelector('nav')
              ?.classList.add('navbar-special-styles');
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    HomePageHeaderRef &&
      HomePageHeaderRef.current &&
      observer.observe(HomePageHeaderRef.current);
    return () => {
      document.querySelector('nav')?.classList.remove('navbar-special-styles');
    };
  });
  return (
    <HomePageHeader ref={HomePageHeaderRef}>
      <Metaballs showTweakPane={false} />
      <Name />
    </HomePageHeader>
  );
};
