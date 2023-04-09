import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Link from './Link';
import media from '../utils/MediaQueries';

const boxShadow = theme(`mode`, {
  light: `0px 22px 40px rgba(0, 0, 0, 0.1)`,
});

const HLayout = css``;

const PostItem = styled.div<{ responsive: boolean; bgImage: string }>`
  padding: 15px;
  overflow: hidden;
  z-index: 0;
  border-radius: 8px;
  background-color: var(--cardColor);
  white-space: normal;
  box-shadow: var(--cardShadow);
  margin-bottom: 2rem;
  .btn-holder {
    text-align: center;
  }
  ${media.tablet} {
    margin-bottom: 0rem;
    padding-bottom: 50px;
    .btn-holder {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 15px;
    }
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
`;

interface Props {
  link: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  // banner: string;
  responsive: boolean;
  className?: string;
}

const PostItemMain = ({
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
    // bgImage={banner.placeholder?.fallback}
  >
    <div className="img-container">
      <GatsbyImage image={banner} alt={title} />
    </div>
    <Link title={title} to={`/blog/${link}`}>
      <h2 className="m-0">{title}</h2>
    </Link>
    <small>
      {date} &bull; {readTime}
    </small>
    <Link className="category-link" title={category} to={`/blog/${category}`}>
      <i className="icon-category text-accent l-icon" />
      <span>{category}</span>
      <i className="icon-double-arrow r-icon" />
      {/* TODO:animate this icon */}
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

export default PostItemMain;
