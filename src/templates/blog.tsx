import React, { useLayoutEffect, useState, Fragment } from 'react';
import { graphql } from 'gatsby';
// import Img from 'gatsby-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import styled from 'styled-components';
import Layout from '../components/Layout';
// import Link from '../components/Link';
import Hero from '../components/Hero';
import PostItem from '../components/PostItem';
import CategoryTagList from '../components/CategoryTagList';
import Pagination from '../components/BlogPagination';
import { Site } from '../types';
import media from '../utils/MediaQueries';
import Container from '../components/Container';
import BlogSideBar from '../components/BlogSideBar';
import OuterLinks from '../components/OuterLinks';
import PageUnderConstruction from '../components/PageUnderConstruction';
import SEO from '../components/SEO';

const Grid = styled.div`
  ${media.desktop} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  margin-bottom: 2rem;
  /* margin-top: 60px; */
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
    // timeToRead: number;
  };
}

const Blog = ({ data, pageContext }: Props): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { allMdx } = data;
  const posts = allMdx.edges;
  // const [showHero, setShowHero] = useState<boolean>(true);

  const { currentPage, pageCount, base, categories, activeCategoryIndex } =
    pageContext;

  const nextPagePath = (): string => {
    if (currentPage + 1 <= pageCount) {
      return `${base}/${currentPage + 1}`;
    } else {
      return ``;
    }
  };
  const previousPagePath = (): string => {
    if (currentPage - 1 > 0) {
      if (currentPage - 1 == 1) {
        return `${base}`;
      }
      return `${base}/${currentPage - 1}`;
    } else {
      return ``;
    }
  };

  const heroTitle = (): string | null => {
    if (activeCategoryIndex >= 0) {
      console.log(` activeCategoryIndex`, categories[activeCategoryIndex]);
      return categories[activeCategoryIndex];
    }
    return undefined;
  };

  return (
    <Fragment>
      {/* <PageUnderConstruction /> */}
      {/* <Hero showHero={currentPage > 1 ? false : true} title="Welcome to Blog" /> */}
      <Hero title={heroTitle()} />
      <Container>
        <CategoryTagList
          name={`Categories`}
          list={categories}
          activeIndex={activeCategoryIndex}
        />
        <Grid>
          {posts.map(({ node }: PostItemProps, index: number) => (
            <PostItem
              key={index}
              link={node.frontmatter.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              excerpt={node.frontmatter.description}
              tags={node.frontmatter.tags}
              banner={
                node.frontmatter.bannerImage?.childImageSharp.gatsbyImageData
              }
              category={node.frontmatter.category}
              readTime={node.fields.timeToRead.text}
            />
          ))}
        </Grid>
        <Pagination
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          nextPagePath={nextPagePath()}
          previousPagePath={previousPagePath()}
        />
      </Container>

      {/* <div className="right-sec">
          <BlogSideBar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            nextPagePath={nextPagePath()}
            previousPagePath={previousPagePath()}
          >
            <CategoryTagList
              name={`Categories`}
              list={categories}
              activeIndex={activeCategoryIndex}
            />
          </BlogSideBar>
        </div> */}
      <OuterLinks />
    </Fragment>
  );
};

export default Blog;
export const Head = () => <SEO title="Gautam Blogs" />;

export const query = graphql`
  query MyQuery(
    $skip: Int = 0
    $blogPostPerPage: Int = 9
    $activeCategory: String
  ) {
    allMdx(
      filter: {
        internal: { contentFilePath: { regex: "/_data/blog/" } }
        frontmatter: {
          category: { eq: $activeCategory }
          publish: { eq: true }
        }
      }
      sort: { frontmatter: { date: DESC } }
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
                gatsbyImageData(width: 500, placeholder: BLURRED)
              }
            }
          }
          fields {
            timeToRead {
              text
            }
          }
        }
      }
    }
  }
`;
