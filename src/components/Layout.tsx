import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import '../global.d.ts';
// Had added @ts-ignore
import { MDXProvider } from '@mdx-js/react';
import 'prismjs/themes/prism-tomorrow.css';
import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import '../styles/style.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { MDXLayoutComponents, MDXGlobalComponents } from './mdx';
import { GlobalStyle } from './GlobalStyle';
import { LayoutProps } from '../types';
import { ThemeProvider } from 'styled-components';
import { primaryCol, desaturatedPrimaryCol } from '../utils/colors';
import { setColors, getThemeValue } from '../utils/themeConfig';

export default ({ site, children }: LayoutProps) => {
  const [theme, setTheme] = useState<string | null>(getThemeValue());

  const toggleTheme = (): void => {
    const currentTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    setColors(currentTheme);
    setTheme(currentTheme);
  };

  useEffect(() => {
    //themeConfig();
    //setTheme(theme);
    // window.matchMedia('(prefers-color-scheme: dark)').addEventListener((e) => {
    //   if (e.matches) {
    //     console.log('dark mode is enabled');
    //   } else {
    //     console.log('dark mode is disabled');
    //   }
    // });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <html lang="en" />
        <link
          href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,400i,700,700i&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="all" />
        <meta name="googlebot" content="all" />
        <script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />
      </Helmet>
      <ThemeProvider
        theme={{
          mode: theme || null,
          primary: theme === 'light' ? primaryCol : desaturatedPrimaryCol,
        }}
      >
        <Fragment>
          <GlobalStyle />
          <MDXProvider
            components={{
              ...MDXLayoutComponents,
              ...MDXGlobalComponents,
            }}
          >
            <Fragment>
              <Navbar toggleTheme={toggleTheme} />
              {children}
              <Footer />
            </Fragment>
          </MDXProvider>
        </Fragment>
      </ThemeProvider>
    </Fragment>
  );
};

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
      siteUrl
    }
  }
`;
