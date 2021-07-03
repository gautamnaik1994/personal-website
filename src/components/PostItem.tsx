import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Link from './Link';
import media from '../utils/MediaQueries';

const boxShadow = theme('mode', {
  light: '0px 22px 40px rgba(0, 0, 0, 0.1)',
});

const HLayout = css`
  --img-width: 360px;
  padding-left: calc(var(--img-width) + 30px);
  .img-container {
    position: absolute;
    left: 15px;
    width: var(--img-width);
    top: 15px;
    bottom: 15px;
    margin: 0;
  }
  .btn-holder {
    text-align: left;
  }
`;

const PostItem = styled.div<{ responsive: boolean; bgImage: string }>`
  padding: 15px;
  margin-bottom: 40px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 2rem;
  background-color: var(--cardColor);
  white-space: normal;
  box-shadow: var(--cardShadow);
  &:last-child {
    //margin-bottom: 100px;
  }
  .btn-holder {
    text-align: center;
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
    display: flex;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    //height: auto;
    background-image: url(${({ bgImage }) => bgImage});
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .gatsby-image-wrapper {
    width: 100% !important;
    //height: 100%;
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
  ${media.tablet} {
    ${({ responsive }) => responsive && HLayout};
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
  responsive: boolean;
  className?: string;
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
  responsive = true,
  ...props
}: Props): JSX.Element => (
  <PostItem
    responsive={responsive}
    className={props.className}
    bgImage={banner.placeholder?.fallback}
  >
    <div className="img-container">
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
      {/*TODO:animate this icon*/}
    </Link>

    <article className="one-rem-mt one-rem-mb">{excerpt}</article>
    <div className="btn-holder">
      <Link title="Read More" to={`/blog/${link}`}>
        Read More
        <i className="icon-arrow-right " />
      </Link>
    </div>
  </PostItem>
);
