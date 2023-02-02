import React, { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

function useSocialData() {
  const data = useStaticQuery(graphql`
    {
      mdx(
        internal: {
          contentFilePath: { regex: "/_data/siteData/websiteStaticContent/" }
        }
      ) {
        frontmatter {
          email
          socialLinks {
            iconClassName
            key
            value
          }
        }
      }
    }
  `);
  return data.mdx.frontmatter;
}
export default useSocialData;
