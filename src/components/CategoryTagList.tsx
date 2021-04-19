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
  margin: 0;
  padding-bottom: 15px;
  top: 60px;
  position: sticky;
  z-index: 2;
  a {
    display: block;
    line-height: 1;
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