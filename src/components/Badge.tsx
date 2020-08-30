import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { transparentize, lighten, desaturate } from 'polished';
import Link from './Link';
import compose from '../utils/compose';

const boxShadow = theme('mode', {
  light: (props: any) =>
    `0 3px var(--blur) -2px ${transparentize(0.6, props.theme.primary)}`,
});

const backgroundColor = theme('mode', {
  dark: (props: any) => transparentize(0.4, props.theme.primary),
});

const tone = compose(desaturate(0.2), lighten(0.1));

const textColor = theme('mode', {
  dark: (props: any) => tone(props.theme.primary),
});

interface Props {
  name: string;
}

const Badge = styled(Link)`
  --blur: 7px;
  padding: 5px 8px;
  background: ${(props) => transparentize(0.6, props.theme.primary)};
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.015rem;
  box-shadow: ${boxShadow};
  color: ${textColor};
  transition: all 0.2s ease-in;
  cursor: pointer;
  :hover {
    --blur: 20px;
    background: ${backgroundColor};
  }
  & + & {
    margin-left: 7px;
  }
`;

export default ({ name }: Props) => (
  <Badge title={name} to={`/blog/categories/${name}`}>
    {name}
  </Badge>
);
