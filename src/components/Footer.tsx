import React, { Fragment } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import useSocialData from '../hooks/useSocialData';
import media from '../utils/MediaQueries';
import Logo from './Logo';
import Link from './Link';

const DividerColor = theme('mode', {
  light: '#afafaf',
  dark: '#414141',
});

const StyledLogo = styled(Logo)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  h1 {
    margin-left: 0;
  }
`;

const Footer = styled.footer`
  border-top: 1px solid ${DividerColor};
  border-bottom: 5px solid var(--primary);
  text-align: center;
  padding: 2rem;
  small {
    display: block;
  }
  .social-links {
    a {
      font-size: 20px;
      & + a {
        margin-left: 15px;
      }
    }
    i:before {
      color: var(--bodyColor);
    }
  }
  ${media.tablet} {
    .social-links {
      display: none;
    }
  }
`;

const getYear = () => {
  const d = new Date();
  return d.getFullYear();
};

export default () => {
  const _data = useSocialData();
  return (
    <Footer>
      <StyledLogo />
      <div className="social-links">
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
      <small className="two-rem-mt half-rem-mb">
        Built using{' '}
        <Link title="GatsbyJs" to="https://www.gatsbyjs.org/">
          GatsbyJs
        </Link>{' '}
        and hosted on{' '}
        <Link title="Netlify" to="https://www.netlify.com/">
          Netlify
        </Link>
      </small>
      <small>&copy; Copyright {getYear()}, Gautam Naik</small>
    </Footer>
  );
};
