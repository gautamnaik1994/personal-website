import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import LinkButton from './LinkButton';

const DownloadCVButton = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      mdx(internal: { contentFilePath: { regex: "/websiteStaticContent/" } }) {
        frontmatter {
          cv2
        }
      }
    }
  `);

  const _data = data.mdx.frontmatter;
  return (
    <LinkButton
      variant="primary"
      to={_data.cv2}
      download={false}
      title="View my CV"
      target="_blank"
      rel="nonoreferrer noopener"
    >
      View my CV
    </LinkButton>
  );
};

export default React.memo(DownloadCVButton);
