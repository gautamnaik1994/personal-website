import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const BlogsSection = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(filter: { fields: { sourceName: { eq: "blog" } } }, limit: 2) {
        edges {
          node {
            frontmatter {
              slug
              tags
              title
              categories
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
          }
        }
      }
    }
  `);
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
};

export default BlogsSection;
