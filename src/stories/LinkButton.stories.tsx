import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import LinkButton, { LinkButtonProps } from '../components/LinkButton';

export default {
  title: 'Components/LinkButton',
  component: LinkButton,
} as Meta;

export const ButtonDefault = (): JSX.Element => (
  <LinkButton to="www.google.com">Default</LinkButton>
);
export const ButtonPrimary = (): JSX.Element => (
  <LinkButton variant="primary" to="https://www.google.com">
    Primary
  </LinkButton>
);
export const ButtonAccent = (): JSX.Element => (
  <LinkButton variant="accent" to="www.google.com">
    Accent
  </LinkButton>
);
