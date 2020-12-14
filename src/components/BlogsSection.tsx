import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PostItem from './PostItem';
import SectionTitle from './SectionTitle';
import SubContainer from './SubContainer';
import LinkButton from './LinkButton';

const BlogsSection = ({ className }) => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fields: { sourceName: { eq: "blog" } } }
        limit: 2
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              slug
              tags
              title
              categories
              date(formatString: "MMMM DD, YYYY")
              banner {
                publicURL
                childImageSharp {
                  fixed {
                    src
                    srcWebp
                  }
                  fluid {
                    src
                  }
                }
              }
            }
            excerpt
            timeToRead
          }
        }
      }
    }
  `);
  return (
    <div className={className}>
      <SectionTitle title="Recent Blogs" />
      <SubContainer>
        {data.allMdx.edges.map((post): any => {
          const _data = post.node.frontmatter;
          return (
            <PostItem
              title={_data.title}
              category={_data.categories}
              link={_data.slug}
              banner={_data.banner.publicURL}
              tags={_data.categories}
              excerpt={post.node.excerpt}
              date={_data.date}
              readTime={post.node.timeToRead}
            />
          );
        })}
      </SubContainer>
      <div className="text-center">
        <LinkButton variant="primary" to="/blog/">
          Goto All Blogs
        </LinkButton>
      </div>
    </div>
  );
};

export default BlogsSection;
