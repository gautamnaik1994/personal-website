import React, { Fragment } from 'react';
import styled from 'styled-components';
import Container from './Container';
import theme from 'styled-theming';
import media from '../utils/MediaQueries';
import Logo from './Logo';
import Link from './Link';

const DividerColor = theme('mode', {
  light: '#dbdbdb',
  dark: '#414141',
});

const Footer = styled.footer`
  min-height: 150px;
  border-top: 1px solid ${DividerColor};
  border-bottom: 5px solid var(--primary);
  .bottom-info {
    text-align: center;
    small {
      display: block;
    }
    ${media.desktop} {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const getYear = () => {
  const d = new Date();
  return d.getFullYear();
};

export default () => (
  <Footer>
    <Container>
      <Logo />
      <p>
        This website is built and maintained by Gautam Naik. If you see anything
        broken, you are welcome to create a pull request&nbsp;
        <Link
          title="Github Link"
          to="https://github.com/gautamnaik1994/personal-website"
        >
          here
        </Link>
        .
      </p>
      <div className="bottom-info">
        <small>
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
      </div>
    </Container>
  </Footer>
);
