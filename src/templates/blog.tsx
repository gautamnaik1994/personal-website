import React, { useLayoutEffect, useState, Fragment } from 'react';
import { graphql } from 'gatsby';
//import Img from 'gatsby-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import styled from 'styled-components';
import Layout from '../components/Layout';
//import Link from '../components/Link';
import Hero from '../components/Hero';
import PostItem from '../components/PostItem';
import CategoryTagList from '../components/CategoryTagList';
import Pagination from '../components/Pagination';
import { Site } from '../types';
import media from '../utils/MediaQueries';
import Container from '../components/Container';
import BlogSideBar from '../components/BlogSideBar';

const Grid = styled(Container)`
  ${media.desktop} {
    display: grid;
    grid-template-columns: 1fr 200px;
    grid-gap: 15px;
  }
  margin-top: 60px;
`;

interface Props {
  data: { site: Site; allMdx: { edges: [] } };
  pageContext: {
    currentPage: number;
    pageCount: number;
    base: string;
    categories: [];
    activeCategoryIndex: number;
  };
}

interface PostItemProps {
  node: {
    id: string;
    frontmatter: {
      slug: string;
      date: string;
      description: string;
      title: string;
      excerpt: string;
      tags: [];
      bannerImage: { publicURL: string };
      category: string;
    };
    timeToRead: number;
  };
}

const Blog = ({ data, pageContext }: Props): JSX.Element => {
  const { site, allMdx } = data;
  const posts = allMdx.edges;
  //const [showHero, setShowHero] = useState<boolean>(true);

  const {
    currentPage,
    pageCount,
    base,
    categories,
    activeCategoryIndex,
  } = pageContext;

  const nextPagePath = (): string => {
    if (currentPage + 1 <= pageCount) {
      return `${base}/${currentPage + 1}`;
    } else return '';
  };
  const previousPagePath = (): string => {
    if (currentPage - 1 > 0) {
      if (currentPage - 1 == 1) {
        return `${base}`;
      }
      return `${base}/${currentPage - 1}`;
    } else return '';
  };

  return (
    <Fragment>
      <GatsbySeo
        title={site.siteMetadata.title}
        description={site.siteMetadata.description}
        canonical={site.siteMetadata.siteUrl}
        metaTags={[
          { name: 'keywords', content: site.siteMetadata.keywords.join(',') },
        ]}
        openGraph={{
          url: site.siteMetadata.siteUrl,
          title: site.siteMetadata.title,
          description: site.siteMetadata.description,
          images: [
            {
              url: `${site.siteMetadata.siteUrl}/banner.png`,
              width: 1200,
              height: 630,
              alt: site.siteMetadata.title,
            },
          ],
        }}
      />
      <Hero showHero={currentPage > 1 ? false : true} title="Welcome to Blog" />
      <Grid>
        <div className="left-sec">
          {posts.map(({ node }: PostItemProps, index: number) => (
            <PostItem
              key={index}
              link={node.frontmatter.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              excerpt={node.frontmatter.description}
              tags={node.frontmatter.tags}
              banner={
                node.frontmatter.bannerImage.childImageSharp.gatsbyImageData
              }
              category={node.frontmatter.category}
              readTime={node.timeToRead}
            />
          ))}
          <Pagination
            nextPagePath={nextPagePath()}
            previousPagePath={previousPagePath()}
          />
        </div>
        <div className="right-sec">
          <BlogSideBar>
            <CategoryTagList
              name={'Categories'}
              list={categories}
              activeIndex={activeCategoryIndex}
            />
          </BlogSideBar>
        </div>
      </Grid>
    </Fragment>
  );
};

export default Blog;

export const query = graphql`
  query MyQuery(
    $skip: Int = 0
    $blogPostPerPage: Int = 2
    $activeCategory: String
  ) {
    site {
      ...site
    }
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/_data/blog/" }
        frontmatter: { category: { eq: $activeCategory } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $blogPostPerPage
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            category
            keywords
            description
            bannerImage {
              childImageSharp {
                gatsbyImageData(width: 300)
              }
            }
          }
          timeToRead
        }
      }
    }
  }
`;
