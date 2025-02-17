import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';
import media from '../../utils/MediaQueries';
// import { MDXRenderer } from 'gatsby-plugin-mdx';

import SectionTitle from '../SectionTitle';

const StyledAboutMe = styled.div`
  p {
    font-size: 16px;
  }
  a {
    font-weight: var(--fontWeightMedium);
  }
  ${media.tablet} {
    padding-right: 30px;
  }
`;

const FlexBox = styled.div`
  ${media.tablet} {
    display: flex;
    align-items: flex-start;
  }
`;

const BlackBox = styled.div`
  background: var(--sideCardColor);
  padding: 20px;
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .icon-open-new-tab {
      display: none;
    }
    a {
      color: var(--bodyColor);
      line-height: 2rem;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 8px;
      border-radius: 5px;
      margin: 0px -8px;
      transition: background 0.1s;
      &:hover {
        background: rgb(128 128 128 / 27%);
        .icon-open-new-tab {
          display: inline-block;
        }
      }
    }
  }
  i {
    font-size: 20px;
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
  .masters-link {
    color: var(--bodyColor);
    span {
      color: var(--primary);
    }
  }
  .circle {
    transition: transform 10s ease-in;
    transform-origin: center center;
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
  .edu-item {
    display: flex;
    gap: 5px;
    line-height: 1.2;
    margin-bottom: 10px;
  }
  .stack-badge {
    margin-top: 10px;
    display: block;
  }
  ${media.tablet} {
    flex: 0 0 300px;
    padding: 15px;
  }

  ${media.desktop} {
    flex: 0 0 400px;
    padding: 30px;
  }
  &:hover {
    .circle {
      transform: scale(1.5) translate(-10%, 10%);
    }
  }
`;

interface Props {
  className?: string;
}

const AboutMeSection = ({ className }: Props): React.ReactElement => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(
        fileAbsolutePath: { regex: "/_data/siteData/websiteStaticContent/" }
      ) {
        html
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
  const _data = data.markdownRemark.frontmatter;
  const aboutMe = data.markdownRemark.html;

  const themeContext = useContext(ThemeContext);

  return (
    <section className={`relative ${className}`}>
      <SectionTitle title="About Me" />

      <FlexBox>
        <StyledAboutMe dangerouslySetInnerHTML={{ __html: aboutMe }} />
        <BlackBox>
          <div className="circle" />
          <div className="relative">
            <h3 className="mt-0">Social Links</h3>
            <div className="link-list">
              {_data.socialLinks.map((link, index) => {
                return (
                  <a
                    href={link.value}
                    key={index}
                    target="_blank"
                    title={`Visit ${link.key} profile`}
                    rel="noreferrer"
                  >
                    <i className={`icon-${link.iconClassName}`} /> {link.key}
                    <span className="icon-open-new-tab"></span>
                  </a>
                );
              })}
              {/* <a href={`mailto:${_data.email}`} title="Mail me">
                <i className="icon-email" /> {_data.email}
              </a> */}
            </div>
            <h3 className="">Education</h3>
            <div>
              <div className="edu-item">
                <span>•</span>
                {_data.education[0]}
              </div>
              <div className="edu-item">
                <span>•</span>
                <a
                  href="https://woolf.university/id/1003119532"
                  target="_blank"
                  title="View my credentials"
                  rel="noreferrer"
                  className="masters-link"
                >
                  {_data.education[1]}
                  {` `}
                  <span className="icon-open-new-tab"></span>
                </a>
              </div>
            </div>
            <h3 className="">Stackoverflow Badge</h3>
            {/*
          <div>
            <i className="icon-email" /> {_data.email}{' '}
          </div>
          <div>
            <i className="icon-marker" /> {_data.location}{' '}
          </div>
          <div>
            <i className="icon-cake" /> {_data.bday}{' '}
          </div>
					*/}
            {themeContext.mode === `dark` ? (
              <a
                href="https://stackoverflow.com/users/2376317/gautam-naik"
                className="stack-badge"
              >
                <img
                  src="https://stackoverflow.com/users/flair/2376317.png?theme=dark"
                  loading="lazy"
                  width="208"
                  height="58"
                  alt="profile for Gautam Naik at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
                  title="profile for Gautam Naik at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
                />
              </a>
            ) : (
              <a
                href="https://stackoverflow.com/users/2376317/gautam-naik"
                className="stack-badge"
              >
                <img
                  src="https://stackoverflow.com/users/flair/2376317.png"
                  width="208"
                  height="58"
                  loading="lazy"
                  alt="profile for Gautam Naik at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
                  title="profile for Gautam Naik at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
                />
              </a>
            )}
          </div>
        </BlackBox>
      </FlexBox>
    </section>
  );
};

export default AboutMeSection;
