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

const CategoryTagList = styled.ul`
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
      <p className="">{name}</p>
      {list.map((item, index) => (
        <Link
          key={item}
          title={item}
          to={'/blog/' + name.toLowerCase() + '/' + item}
        >
          {item}
        </Link>
      ))}
    </CategoryTagList>
  );
};
