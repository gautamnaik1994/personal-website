import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import media from '../utils/MediaQueries';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SubContainer from './SubContainer';
import SectionTitle from './SectionTitle';
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

const AboutMeSection = () => {
  const data = useStaticQuery(graphql`
    {
      mdx(fileAbsolutePath: { regex: "/siteData/" }) {
        body
        frontmatter {
          company
          bday
          email
          location
          aboutMeImage
          cv
        }
      }
    }
  `);
  console.log(data);
  const _data = data.mdx.frontmatter;
  const aboutMe = data.mdx.body;

  return (
    <div className="relative">
      <SectionTitle title="About Me" />
      <SubContainer>
        <AboutMeImage src={_data.aboutMeImage} />
        <StyledAboutMe>
          <MDXRenderer>{aboutMe}</MDXRenderer>
        </StyledAboutMe>
        <div>
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
      </SubContainer>
    </div>
  );
};

export default AboutMeSection;
