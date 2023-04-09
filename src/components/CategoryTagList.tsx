import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import media from '../utils/MediaQueries';
import Link from './Link';

interface Props {
  activeIndex?: number;
  name?: string;
  active?: boolean;
  list: string[];
}

const CategoryTagList = styled.div`
  display: flex;
  margin-top: 1rem;
  padding-bottom: 15px;
  align-items: center;
  h3 {
    display: none;
  }
  a {
    display: block;
    line-height: 1;
    font-size: 16px;
    color: var(--bodyColor);
    position: relative;
    padding: 8px 15px;
    border-radius: 5px;
    background-color: #ffffff38;
    margin-right: 10px;
    &.active {
      /* font-weight: var(--fontWeightBold); */
      background-color: var(--accent);
      color: white;
    }
    &:hover:not(.active) {
      /* background-color: rgba(var(--primaryRgb), 0.5);
      color: white; */
    }
  }
  ${media.desktop} {
    margin-bottom: 1rem;
    margin-top: 2rem;
    h3 {
      display: block;
      font-size: 22px;
      margin: 0;
      margin-right: 15px;
      /* color: var(--accent); */
    }
    a {
      font-size: 18px;
      padding: 10px 20px;
      margin-right: 15px;
    }
  }
`;

export default function List({ list = [], activeIndex, name }: Props) {
  return (
    <CategoryTagList>
      <h3 className="one-rem-mb">{name}</h3>
      <Link
        title="All"
        to={`/blog/`}
        className={activeIndex === undefined ? `active` : ``}
      >
        All
      </Link>
      {list.map((item, index) => (
        <Link
          key={item}
          title={item}
          to={`/blog/` + item}
          className={activeIndex === index ? `active` : ``}
        >
          {item}
        </Link>
      ))}
    </CategoryTagList>
  );
}
