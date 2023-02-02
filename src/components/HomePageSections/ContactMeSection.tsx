import React from 'react';
import media from '../../utils/MediaQueries';
import { useStaticQuery, graphql } from 'gatsby';
import SectionTitle from '../SectionTitle';
import styled from 'styled-components';
import LinkButton from '../LinkButton';

const StyledDiv = styled.div`
  text-align: center;
  .contact-me-text {
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 2rem;
  }
  ${media.desktop} {
    width: 680px;
    margin: auto;
  }
`;

export default ({ className }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      mdx(
        internal: {
          contentFilePath: { regex: "/_data/siteData/websiteStaticContent/" }
        }
      ) {
        frontmatter {
          contactMeText
          email
        }
      }
    }
  `);
  const _data = data.mdx.frontmatter;
  return (
    <section className={className}>
      <SectionTitle title="Let's Talk" />
      <StyledDiv>
        <div className="contact-me-text">{_data.contactMeText}</div>
        <LinkButton
          variant="primary"
          to={`mailto:${_data.email}`}
          title="Mail Me"
        >
          Mail Me
        </LinkButton>
      </StyledDiv>
    </section>
  );
};
