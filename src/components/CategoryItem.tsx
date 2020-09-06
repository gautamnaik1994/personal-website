import React, { Fragment, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { transparentize, lighten, desaturate } from 'polished';
import Link from './Link';
import media from '../utils/MediaQueries';
import compose from '../utils/compose';

interface CategoryItemProps {
  activeCategory: boolean;
}
interface Props {
  activeCategory: boolean;
  category: string;
}

const tone = compose(desaturate(0.2), lighten(0.1));

const textColor = theme('mode', {
  dark: (props: any) => tone(props.theme.primary),
});

const textColorTablet = theme('mode', {
  dark: '#333',
  light: '#fff',
});

const boxShadow = theme('mode', {
  light: (props: any) =>
    `0 3px var(--blur) 0px ${transparentize(0.6, props.theme.primary)}`,
});

const backgroundColor = theme('mode', {
  dark: (props: any) => transparentize(0.4, props.theme.primary),
});

const CategoryItem = styled(Link)<CategoryItemProps>`
  --blur: 7px;
  display: inline-block;
  padding: 5px 8px;
  color: ${textColor};
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.015rem;
  font-weight: 700;
  transition: all 0.2s ease-in;
  position: relative;
  cursor: pointer;
  :hover {
    --blur: 20px;
    background: ${backgroundColor};
  }
  ${(props) =>
    props.activeCategory &&
    css`
      &:after {
        content: '';
        position: absolute;
        width: 50%;
        min-width: 30px;
        height: 4px;
        background-image: linear-gradient(
          115deg,
          #4fcf70,
          #fad648,
          #a767e5,
          #12bcfe,
          #44ce7b
        );
        border-radius: 13px;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
      }
    `};

  ${media.tablet} {
  box-shadow: ${boxShadow};
    padding: 3px 8px;
    border-radius: 3px;
    margin: 5px 8px 5px 0;
    background-color: ${(props) =>
      props.activeCategory
        ? props.theme.primary
        : transparentize(0.6, props.theme.primary)};
    text-transform: capitalize;
    ${(props) =>
      props.activeCategory &&
      css`
        color: ${textColorTablet};
        &:after {
          display: none;
        }
      `};`;

export default ({ category, activeCategory }: Props) => (
  <CategoryItem
    title={category}
    state={{ fromCategoryItem: true }}
    to={`/blog/categories/${category}`}
    activeCategory={activeCategory}
  >
    {category}
  </CategoryItem>
);
