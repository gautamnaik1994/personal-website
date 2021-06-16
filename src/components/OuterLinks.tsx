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
    --sideSpace: 15px;
    &:after {
      content: '';
      height: 150px;
      width: 1px;
      background: var(--bodyColor);
      display: block;
      margin: 10px auto;
    }
  }
  .left-side {
    left: var(--sideSpace);
    a {
      display: block;
      margin-top: 20px;
      font-size: 20px;
    }
  }
  .right-side {
    right: var(--sideSpace);
    .inner {
      writing-mode: vertical-rl;
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
        <div className="inner">
          <i className="icon-email" /> {_data.email}{' '}
        </div>
      </div>
    </StyledOuterLinks>
  );
};
