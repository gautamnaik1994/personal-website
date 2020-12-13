import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Button, { ButtonProps } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

export const ButtonDefault = (): JSX.Element => <Button>Default</Button>;
export const ButtonPrimary = (): JSX.Element => (
  <Button
    onClick={() => {
      console.log('Button');
    }}
    variant="primary"
  >
    Primary
  </Button>
);
export const ButtonAccent = (): JSX.Element => (
  <Button
    onClick={() => {
      console.log('Button');
    }}
    variant="accent"
  >
    Accent
  </Button>
);
