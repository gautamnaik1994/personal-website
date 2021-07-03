import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import CategoryItem from './CategoryItem';
import Link from './Link';

interface Props {
  activeIndex?: number;
  name: string;
  active?: boolean;
  list: string[];
}

const CategoryTagList = styled.div`
  h3 {
    margin-top: 0;
    font-size: 16px;
    color: var(--accent);
    font-weight: var(--fontWeightBold);
  }
  margin: 0;
  padding-bottom: 15px;
  a {
    display: block;
    line-height: 1;
    margin-bottom: 1rem;
    font-size: 16px;
    color: var(--bodyColor);
  }
  ${media.desktop} {
    h3 {
      font-size: 22px;
    }
    a {
      margin-bottom: 0.5rem;
    }
  }
`;

export default ({ list = [], activeIndex, name }: Props) => {
  return (
    <CategoryTagList>
      <h3 className="one-rem-mb">{name}</h3>
      {list.map((item, index) => (
        <Link key={item} title={item} to={'/blog/' + item}>
          {item} {activeIndex === index && 'active'}
        </Link>
      ))}
    </CategoryTagList>
  );
};
