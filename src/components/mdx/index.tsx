import React from 'react';
import Title from './Title';
import Subtitle from './Subtitle';
import List from './List';
import Paragraph from './Paragraph';
import H3 from './H3';
import H4 from './H4';
import H5 from './H5';
import H6 from './H6';
import Link from '../Link';
import Keyboard from './Keyboard';
import Details from './Details';

export const MDXLayoutComponents = {
  h1: (props: any) => <Title {...props} />,
  h2: (props: any) => <Subtitle {...props} />,
  p: (props: any) => <Paragraph {...props} />,
  ul: (props: any) => <List {...props} />,
  h3: (props: any) => <H3 {...props} />,
  h4: (props: any) => <H4 {...props} />,
  h5: (props: any) => <H5 {...props} />,
  h6: (props: any) => <H6 {...props} />,
  a: (props: any) => (
    <Link target="_blank" rel="noopener noreferrer" {...props} />
  ),
  kbd: (props: any) => <Keyboard {...props} />,
  // details: (props: any) => <Details {...props} />,
};

export const MDXGlobalComponents = {
  Link,
  Details,
};
