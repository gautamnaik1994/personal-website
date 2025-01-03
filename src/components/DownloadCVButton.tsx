import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import LinkButton from './LinkButton';

const DownloadCVButton = (): React.ReactNode => {
  const data = useStaticQuery(graphql`
    {
      mdx(internal: { contentFilePath: { regex: "/websiteStaticContent/" } }) {
        frontmatter {
          cv
        }
      }
    }
  `);

  const _data = data.mdx.frontmatter;
  return (
    <LinkButton
      variant="primary"
      to={_data.cv}
      download={true}
      title="Download CV"
    >
      Download CV
    </LinkButton>
  );
};

export default React.memo(DownloadCVButton);
