import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme from 'styled-theming';
import { lighten } from 'polished';
import Link from './Link';
import Badge from './Badge';
import media from '../utils/MediaQueries';

const PostItem = styled.div`
  box-shadow: 0px 3px 9px -2px rgba(0, 0, 0, 0.25);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 40px;
  overflow: hidden;
  &:last-child {
    margin-bottom: 100px;
  }
  position: relative;
  background: var(--bodyBackgroundColor);
  border-bottom: 0;
  .img-container {
    margin: -10px;
    margin-bottom: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  h2 {
    font-variant-ligatures: none;
    line-height: 2rem;
  }
  &:before {
    //content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 80%;
    height: 80%;
    //background-image: radial-gradient(
    //ellipse closest-side,
    //rgba(0, 0, 0, 0.74),
    //#1f1f1f
    //),
    //url(https://source.unsplash.com/daily);
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.75;
  }
  ${media.desktop} {
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: none;
    padding-left: 320px;
    .img-container {
      position: absolute;
      left: 0;
      top: 50%;
      width: 300px;
      height: 200px;
      margin: 0;
      transform: translateY(-50%);
      border-radius: 5px;
      overflow: hidden;
      img {
      }
    }
    h2 {
    }
  }
  &:last-child {
    margin-bottom: 40px;
  }
`;

interface Props {
  link: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: number;
  banner: string;
}

export default ({
  link,
  title,
  date,
  excerpt,
  category,
  tags,
  readTime,
  banner,
}: Props) => (
  <PostItem>
    <div className="img-container">
      <img src={banner} />
    </div>
    <h2 className="m-0">
      <Link title={title} to={`/blog/${link}`}>
        {title}
      </Link>
    </h2>
    <small>
      {date} &bull; {readTime} minutes read
    </small>

    <div className="half-rem-mt">
      <Badge name={category} />
    </div>
    <article className="one-rem-mt one-rem-mb">{excerpt}</article>
    <Link title="Read More" to={`/blog/${link}`}>
      Read More
    </Link>
  </PostItem>
);
