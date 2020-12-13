import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Metaballs from './MetaBallsWebGL';
import Name from './Name';

const HomePageHeader = styled.div`
  position: relative;
`;

export default () => {
  const HomePageHeaderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        if (HomePageHeaderRef && HomePageHeaderRef.current) {
          // no intersection with screen
          console.log('Inr Ra ', entries[0].intersectionRatio);
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
  });
  return (
    <HomePageHeader ref={HomePageHeaderRef}>
      <Metaballs showTweakPane={false} />
      <Name />
    </HomePageHeader>
  );
};
