import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import media from '../../utils/MediaQueries';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SubContainer from '../SubContainer';
import SectionTitle from '../SectionTitle';
import styled from 'styled-components';

const StyledAboutMe = styled.div`
  p {
    font-size: 16px;
  }
  ${media.desktop} {
    width: 550px;
  }
`;

const FlexBox = styled.div`
  ${media.desktop} {
    display: flex;
  }
`;

const BlackBox = styled.div`
  background-color: black;
`;

interface Props {
  className?: string;
}

const AboutMeSection = ({ className }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      mdx(
        fileAbsolutePath: { regex: "/_data/siteData/websiteStaticContent/" }
      ) {
        body
        frontmatter {
          company
          bday
          email
          location
          aboutMeImage
          cv
          education
          socialLinks {
            key
            value
            iconClassName
          }
        }
      }
    }
  `);
  const _data = data.mdx.frontmatter;
  const aboutMe = data.mdx.body;

  return (
    <section className={`relative ${className}`}>
      <SectionTitle title="About Me" />

      <FlexBox>
        <StyledAboutMe>
          <MDXRenderer>{aboutMe}</MDXRenderer>
        </StyledAboutMe>
        <BlackBox>
          <h3 className="">Social Links</h3>
          {_data.socialLinks.map((link, index) => {
            return (
              <a href={link.value} key={index}>
                <i className={`icon-${link.iconClassName}`} /> {link.key}{' '}
              </a>
            );
          })}
          <h3 className="">Useless Info</h3>
          <div>
            <i className="icon-email" /> {_data.email}{' '}
          </div>
          <div>
            <i className="icon-marker" /> {_data.location}{' '}
          </div>
          <div>
            <i className="icon-cake" /> {_data.bday}{' '}
          </div>
          <h3 className="">Education</h3>
          <h4>{_data.education}</h4>
        </BlackBox>
      </FlexBox>
    </section>
  );
};

export default AboutMeSection;
