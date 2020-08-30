import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import CategoryItem from './CategoryItem';

interface CategoryProps {
  activeCategoryIndex?: number;
  activeCategory?: boolean;
  categories: string[];
}

const Categories = styled.ul`
  grid-column: 2/3;
  padding: 8px;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow-x: auto;
  height: auto;
  overflow-y: hidden;
  padding-bottom: 15px;
  top: 60px;
  position: sticky;
  z-index: 2;
  background: var(--bodyBackgroundColor);
  transition: box-shadow 0.3s ease-in, background 0.3s ease-in;
  ${media.tablet} {
    padding: 0;
    background: transparent;
    white-space: normal;
    overflow: hidden;
    height: calc(100vh - 330px);
    text-align: left;
  }
`;

export default ({ categories = [], activeCategoryIndex }: CategoryProps) => {
  const CategorierRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        if (CategorierRef && CategorierRef.current) {
          // no intersection with screen
          if (entries[0].intersectionRatio < 1) {
            CategorierRef.current.classList.add('category-shadow');
          }
          // fully intersects with screen
          else if (entries[0].intersectionRatio === 1) {
            CategorierRef.current.classList.remove('category-shadow');
          }
        }
      },
      { threshold: [0, 1], rootMargin: '-150px 0px 0px 0px' },
    );

    CategorierRef &&
      CategorierRef.current &&
      observer.observe(CategorierRef.current);
  });

  return (
    <Categories ref={CategorierRef}>
      <p className="show-for-tablet">Categories</p>
      {categories.map((category, index) => (
        <CategoryItem
          key={category}
          activeCategory={activeCategoryIndex === index}
          category={category}
        />
      ))}
    </Categories>
  );
};
