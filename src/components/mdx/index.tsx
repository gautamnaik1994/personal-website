import React from 'react';
import Title from './Title';
import Subtitle from './Subtitle';
import List from './List';
import Paragraph from './Paragraph';
import H3 from './H3';
import Link from '../Link';
import Keyboard from './Keyboard';

export const MDXLayoutComponents = {
  //h1: (props: any) => <Title {...props} />,
  h2: (props: any) => <Subtitle {...props} />,
  p: (props: any) => <Paragraph {...props} />,
  ul: (props: any) => <List {...props} />,
  //h3: (props: any) => <H3 {...props} />,
  kbd: (props: any) => <Keyboard {...props} />,
};

export const MDXGlobalComponents = {
  Link,
};
