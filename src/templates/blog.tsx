import React, { useLayoutEffect, useState } from 'react';
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
import { Frontmatter, SiteMetadata, Site } from '../types';
import media from '../utils/MediaQueries';
import Container from '../components/Container';
import BlogSidebar from '../components/BlogSidebar';

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
    pagination: {
      page: [];
      nextPagePath: string;
      previousPagePath: string;
    };
    categories: string[];
    activeCategoryIndex: number;
    tags: string[];
  };
  location?: any;
}

const Blog = ({
  data: { site, allMdx },
  pageContext: { pagination, categories, activeCategoryIndex, tags },
  location: { state },
}: Props) => {
  const { page, nextPagePath, previousPagePath } = pagination;

  const posts = page.map((id: number) =>
    allMdx.edges.find((edge: { node: { id: number } }) => edge.node.id === id),
  );

  const [showHero, setShowHero] = useState<boolean>(true);

  //useEffect(() => {
  //console.log('Called Effects');
  //if (state && state.fromCategoryItem) {
  ////setShowHero(false);
  //setScrollPos(300);
  //console.log('Called Effects inside');
  ////window.scrollTo(0, 300);
  //}
  //}, [pathname]);
  useLayoutEffect(() => {
    console.log('Called Layout Effects');
    if (state && state.fromCategoryItem) {
      console.log('Layout Effects indide');
      setShowHero(false);
    }
  }, []);

  return (
    <Layout>
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
      <Hero showHero={showHero} title="Welcome to Blog" />
      <Grid>
        <div className="left-sec">
          {posts.map(({ node }: any) => (
            <PostItem
              key={node.id}
              link={node.frontmatter.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              excerpt={node.excerpt}
              tags={node.frontmatter.tags}
              banner={node.frontmatter.bannerImage.publicURL}
              category={node.frontmatter.categories}
              readTime={node.timeToRead}
            />
          ))}
          <Pagination
            nextPagePath={nextPagePath}
            previousPagePath={previousPagePath}
          />
        </div>
        <div className="right-sec">
          <BlogSidebar>
            <CategoryTagList
              name={'Categories'}
              activeIndex={activeCategoryIndex}
              list={categories}
            />
          </BlogSidebar>
        </div>
      </Grid>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx(filter: { fileAbsolutePath: { regex: "/_data/blog/" } }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            categories
            keywords
            tags
            bannerImage {
              publicURL
            }
          }
          wordCount {
            words
          }
          timeToRead
        }
      }
    }
  }
`;
