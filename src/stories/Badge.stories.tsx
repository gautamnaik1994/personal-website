import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Badge from '../components/Badge';

export default {
  title: 'Blog/Badge',
  component: Badge,
} as Meta;

export const BadgeDefault: React.FC<{ name: string }> = () => (
  <Badge name="Badge" />
);
