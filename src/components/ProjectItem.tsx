import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { rgba, rgb, parseToRgb } from 'polished';
import { useSpring, animated } from 'react-spring';
import { useMeasure } from 'react-use';
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1rem;
  .btn-holder {
    text-align: center;
  }
  .img-container {
    margin-bottom: -1rem;
    height: 200px;
    padding: 45px;
    border-radius: 10px;
    color: white;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    display: grid;
    place-content: center;
    line-height: 1.2;
    position: relative;
    top: -2rem;
    box-shadow: 0 6px 40px 0px var(--boxShadowcolor);
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
  .link-holder {
    a + a {
      margin-left: 15px;
    }
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
}: Props): JSX.Element => {
  //const defaultHeight = '0px';
  //const [open, toggle] = useState(false);
  //const [contentHeight, setContentHeight] = useState(defaultHeight);
  //const [ref, { height }] = useMeasure();
  //const expand = useSpring({
  //config: { mass: 4, tension: 250, friction: 30 },
  //height: open ? `${contentHeight + 25}px` : defaultHeight,
  //});
  //const rotate = useSpring({
  //config: { mass: 4, tension: 250, friction: 30 },
  //transform: open ? `rotate(270deg)` : 'rotate(90deg)',
  //});
  //useEffect(() => {
  //setContentHeight(height);
  //window.addEventListener('resize', setContentHeight(height));
  //return window.removeEventListener('resize', setContentHeight(height));
  //}, [height]);
  //

  return (
    <ProjectItem className={props.className}>
      <div className="top-section">
        <div
          className="img-container"
          style={{ background: color, '--boxShadowcolor': rgba(color, 0.4) }}
        >
          {banner ? <img src={banner} alt={title} /> : <>{title}</>}
        </div>
        <h2 className="m-0 text-primary">{title}</h2>
        <MDXRenderer>{description}</MDXRenderer>
        <div>
          {details.map(({ key, value }) => (
            <Item key={key} label={key} value={value} />
          ))}
        </div>
      </div>
      <div className="one-rem-mt link-holder">
        {links.map(({ key, value }) => (
          <a key={key} href={value}>
            {key} <i className="icon-open-new-tab" />
          </a>
        ))}
      </div>
    </ProjectItem>
  );
};
