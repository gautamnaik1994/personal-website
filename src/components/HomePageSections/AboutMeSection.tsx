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

const AboutMeImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: auto;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  z-index: -1;
  ${media.desktop} {
    left: auto;
    right: 0;
    transform: translate(0, -50%);
    width: 450px;
    opacity: 1;
  }
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

      <StyledAboutMe>
        <MDXRenderer>{aboutMe}</MDXRenderer>
      </StyledAboutMe>
      <div>
        {_data.socialLinks.map((link, index) => {
          return (
            <a href={link.value} key={index}>
              <i className={`icon-${link.iconClassName}`} /> {link.key}{' '}
            </a>
          );
        })}
        <div>
          <i className="icon-email" /> {_data.email}{' '}
        </div>
        <div>
          <i className="icon-marker" /> {_data.location}{' '}
        </div>
        <div>
          <i className="icon-cake" /> {_data.bday}{' '}
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
