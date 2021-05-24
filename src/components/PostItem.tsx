import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme from 'styled-theming';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { lighten } from 'polished';
import Link from './Link';
import Badge from './Badge';
import media from '../utils/MediaQueries';

const boxShadow = theme('mode', {
  light: '0px 22px 40px rgba(0, 0, 0, 0.1)',
});

const PostItem = styled.div`
  padding: 15px;
  margin-bottom: 40px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 6rem;
  background-color: var(--cardColor);
  box-shadow: ${boxShadow};
  &:last-child {
    margin-bottom: 100px;
  }
  .category-link {
    display: block;
    margin: 0.5rem 0;
    * {
      vertical-align: middle;
    }
    .r-icon {
      font-size: 14px;
    }
    .l-icon {
      font-size: 20px;
    }
    span {
      margin: 0 5px 0 0.5rem;
    }
  }
  position: relative;
  .img-container {
    margin: -15px;
    margin-bottom: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .gatsby-image-wrapper {
    width: 100% !important;
  }
  h2 {
    font-variant-ligatures: none;
    line-height: 2rem;
  }
  ${media.desktop} {
    padding: 10px;
    margin-bottom: 25px;
    padding-left: 320px;
    border-radius: 0px;
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
      .gatsby-image-wrapper {
        height: 100% !important;
      }
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
}: Props): JSX.Element => (
  <PostItem>
    <div className="img-container">
      <img src={banner} />
      <GatsbyImage image={banner} alt={title} />
    </div>
    <Link title={title} to={`/blog/${link}`}>
      <h2 className="m-0">{title}</h2>
    </Link>
    <small>
      {date} &bull; {readTime} minutes read
    </small>
    <Link
      className="category-link"
      title={category}
      to={`/category/${category}`}
    >
      <i className="icon-category text-accent l-icon" />
      <span>{category}</span>
      <i className="icon-double-arrow r-icon" />
    </Link>

    <article className="one-rem-mt one-rem-mb">{excerpt}</article>
    <Link title="Read More" to={`/blog/${link}`}>
      Read More
    </Link>
  </PostItem>
);
