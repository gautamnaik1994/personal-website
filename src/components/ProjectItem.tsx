import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Link from './Link';
import media from '../utils/MediaQueries';
import Item from './Skill/Item';

const ProjectItem = styled.div`
  padding: 15px;
  margin-bottom: 40px;
  border-radius: 8px;
  background-color: var(--cardColor);
  box-shadow: var(--cardShadow);
  position: relative;
  .btn-holder {
    text-align: center;
  }
  .img-container {
    margin: -15px;
    margin-bottom: 1rem;
    height: 200px;
    padding: 45px;
    border-radius: 8px 8px 0 0;
    color: white;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    display: grid;
    place-content: center;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  .gatsby-image-wrapper {
    width: 100% !important;
  }
  h2 {
    font-variant-ligatures: none;
    line-height: 2rem;
  }
  .icon-arrow-right {
    margin-left: 3px;
    vertical-align: text-bottom;
    font-weight: bold;
  }
`;

interface Props {
  color: string;
  title: string;
  details: Array<{ key: string; value: string }>;
  links: Array<{ key: string; value: string }>;
  banner: string;
  description: string;
  className?: string;
}

export default ({
  title,
  banner,
  links,
  details,
  color,
  description,
  ...props
}: Props): JSX.Element => (
  <ProjectItem className={props.className}>
    <div className="img-container" style={{ background: color }}>
      {banner ? <img src={banner} alt={title} /> : <>{title}</>}
    </div>
    <h2 className="m-0 text-primary">{title}</h2>
    <MDXRenderer>{description}</MDXRenderer>
    <div>
      {details.map(({ key, value }) => (
        <Item key={key} label={key} value={value} />
      ))}
    </div>
    <div>
      {links.map(({ key, value }) => (
        <a key={key} href={value}>
          {key}
        </a>
      ))}
    </div>
  </ProjectItem>
);
