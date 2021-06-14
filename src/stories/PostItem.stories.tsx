import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import banner from '../../static/img/grassdoorlogo.png';
import Container from '../components/Container';

import ProjectItem from '../components/ProjectItem';

const description =
  'function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\n/* @jsxRuntime classic */\n\n/* @jsx mdx */\nvar _frontmatter = {\n  "title": "Mushtifund School and College",\n  "role": "Student",\n  "timeRange": "Dont Remember - May 2011",\n  "order": 1,\n  "status": "stop"\n};\nvar layoutProps = {\n  _frontmatter: _frontmatter\n};\nvar MDXLayout = "wrapper";\nreturn function MDXContent(_ref) {\n  var components = _ref.components,\n      props = _objectWithoutProperties(_ref, ["components"]);\n\n  return mdx(MDXLayout, _extends({}, layoutProps, props, {\n    components: components,\n    mdxType: "MDXLayout"\n  }), mdx("p", null, "Studied"));\n}\n;\nMDXContent.isMDXComponent = true;';

// This default export determines where you story goes in the story list
export default {
  title: 'Components/ProjectItem',
  component: ProjectItem,
  argTypes: {
    responsive: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

const sData = [
  { key: 'test1', value: 'test value 1' },
  { key: 'test2', value: 'test value2' },
];

const Template: Story = (args) => (
  <ProjectItem
    title="Grassdoor"
    description={description}
    links={sData}
    details={sData}
    color="tomato"
    banner={banner}
    {...args}
  />
);
export const PostItemDefault = Template.bind({});
