import React, { Fragment } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import LinkButton from '../LinkButton';

const DownloadCVSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      mdx(fileAbsolutePath: { regex: "/siteData/" }) {
        body
        frontmatter {
          cv
        }
      }
    }
  `);

  const _data = data.mdx.frontmatter;
  return (
    <div className="text-center one-rem-mt">
      <LinkButton variant="primary" to={_data.cv} download title="Download CV">
        Download CV
      </LinkButton>
    </div>
  );
};

export default DownloadCVSection;
