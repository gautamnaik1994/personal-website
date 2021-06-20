import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import media from '../utils/MediaQueries';

const StyledOuterLinks = styled.div`
  position: sticky;
  bottom: 5px;
  padding: 0 10px;
  & > div {
    position: absolute;
    bottom: 0;
    --sideSpace: 30px;
    a {
      transition: transform 0.3s ease-in;
      &:hover {
        transform: translateY(-4px);
      }
    }
    &:after {
      content: '';
      height: 80px;
      width: 1px;
      background: var(--bodyColor);
      display: block;
      margin: 10px auto 10px auto;
    }
  }
  .left-side {
    left: var(--sideSpace);
    a {
      display: block;
      margin-bottom: 20px;
      font-size: 20px;
    }
  }
  .right-side {
    right: var(--sideSpace);
    i {
      display: inline-block;
      color: #7af478;
      margin-bottom: 5px;
      position: relative;
      right: 3px;
      font-size: 20px;
    }
    .inner {
      writing-mode: vertical-rl;
      color: var(--bodyColor);
      margin-bottom: 5px;
    }
  }
  display: none;

  ${media.desktop} {
    display: block;
  }
`;

export default () => {
  const data = useStaticQuery(graphql`
    {
      mdx(
        fileAbsolutePath: { regex: "/_data/siteData/websiteStaticContent/" }
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
  const _data = data.mdx.frontmatter;
  return (
    <StyledOuterLinks>
      <div className="left-side">
        {_data.socialLinks.map((link, index) => {
          return (
            <a
              href={link.value}
              key={index}
              target="_blank"
              title={link.key}
              rel="noreferrer"
            >
              <i className={`icon-${link.iconClassName}`} />
            </a>
          );
        })}
      </div>
      <div className="right-side">
        <a className="inner" href={`mailto:${_data.email}`}>
          {_data.email}{' '}
        </a>
      </div>
    </StyledOuterLinks>
  );
};
