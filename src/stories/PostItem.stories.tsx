import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import banner from '../../content/blog/css-variable/images/banner.png';
import Container from '../components/Container';

import PostItem from '../components/PostItem';

// This default export determines where you story goes in the story list
export default {
  title: 'Components/PostItem',
  component: PostItem,
  argTypes: {
    layout: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' },
    },
    responsive: {
      options: ['responsive', 'not-responsive'],
      control: { type: 'inline-radio' },
    },
  },
} as Meta;

const Template: Story = (args) => (
  <PostItem
    title="Css Variables some long title and extra stuff"
    link="https://google.com"
    tags={['css', 'vim']}
    category={['css', 'vim']}
    excerpt="lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. "
    readTime={5}
    date={'15 Aug 2020'}
    banner={banner}
    {...args}
  />
);
export const PostItemDefault = Template.bind({});
