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
    /* width: 550px; */
    padding-right: 30px;
  }
`;

const FlexBox = styled.div`
  ${media.desktop} {
    display: flex;
    align-items: flex-start;
  }
`;

const BlackBox = styled.div`
  background: var(--sideCardColor);
  padding: 30px;
  border-radius: 8px;
  box-shadow: var(--cardShadow);
  position: relative;
  overflow: hidden;
  h3 {
    font-size: 16px;
    color: var(--accent);
    margin-bottom: 6px;
  }
  .link-list {
    a {
      display: block;
      color: var(--bodyColor);
      line-height: 1.5rem;
    }
    a + a {
    }
  }
  i {
    margin-right: 10px;
  }
  .icon-cake {
    color: #b178f4;
  }
  .icon-email {
    color: #7af478;
  }
  .icon-marker {
    color: #ff8c32;
  }
  .circle {
    position: absolute;
    --dims: 250px;
    top: calc(var(--dims) * -0.5);
    right: calc(var(--dims) * -0.5);
    width: var(--dims);
    height: var(--dims);
    border-radius: 50%;
    background: #f9a43f;
    &:after,
    &:before {
      content: '';
      position: absolute;
      width: var(--dims);
      height: var(--dims);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &:after {
      width: calc(var(--dims) * 0.5);
      height: calc(var(--dims) * 0.5);
      background: #e34850;
    }
    &:before {
      width: calc(var(--dims) * 0.75);
      height: calc(var(--dims) * 0.75);
      background: #f76d74;
    }
  }
  ${media.desktop} {
    flex: 0 0 400px;
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

      <FlexBox>
        <StyledAboutMe>
          <MDXRenderer>{aboutMe}</MDXRenderer>
        </StyledAboutMe>
        <BlackBox>
          <div className="circle" />
          <h3 className="mt-0">Social Links</h3>
          <div className="link-list">
            {_data.socialLinks.map((link, index) => {
              return (
                <a
                  href={link.value}
                  key={index}
                  target="_blank"
                  title={link.key}
                  rel="noreferrer"
                >
                  <i className={`icon-${link.iconClassName}`} /> {link.key}{' '}
                </a>
              );
            })}
          </div>
          <h3 className="">Education</h3>
          <div>{_data.education}</div>
          <h3 className="">Other Useless Info</h3>
          <div>
            <i className="icon-email" /> {_data.email}{' '}
          </div>
          <div>
            <i className="icon-marker" /> {_data.location}{' '}
          </div>
          <div>
            <i className="icon-cake" /> {_data.bday}{' '}
          </div>
        </BlackBox>
      </FlexBox>
    </section>
  );
};

export default AboutMeSection;
