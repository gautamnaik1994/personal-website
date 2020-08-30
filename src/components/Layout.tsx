import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import '../global.d.ts';
// @ts-ignore
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

export default ({ site, children }: LayoutProps) => {
  // const {
  //   title,
  //   description: siteDescription,
  //   keywords: siteKeywords,
  // } = site.siteMetadata;

  // const {
  //   keywords: frontmatterKeywords,
  //   description: frontmatterDescription,
  // } = frontmatter;

  // const keywords = (frontmatterKeywords || siteKeywords).join(', ');
  // const description = frontmatterDescription || siteDescription;

  //const initialThemeValue = (typeof window !== 'undefined' && window.localStorage && localStorage.getItem('theme')) || 'light';

  //let initialThemeValue = 'light';
  //if (typeof window !== 'undefined' && window.localStorage) {
  //if (localStorage.getItem('theme') === null) {
  //localStorage.setItem('theme', 'light');
  //initialThemeValue = 'light';
  //} else {
  //initialThemeValue = localStorage.getItem('theme') || 'light';
  //}
  //}
  //

  const [theme, setTheme] = useState<string | null>(null);

  const toggleTheme = (): void => {
    const currentTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    setTheme(currentTheme);
  };

  useEffect(() => {
    let initialThemeValue = theme;
    if (localStorage.getItem('theme') === null) {
      if (matchMedia('(prefers-color-scheme: dark)').matches) {
        initialThemeValue = 'dark';
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
        initialThemeValue = 'light';
      }
    } else {
      initialThemeValue = localStorage.getItem('theme') || 'light';
    }
    //localStorage.setItem('theme', initialThemeValue);
    setTheme(initialThemeValue);
  }, []);

  return (
    <Fragment>
      <Helmet
      // title={title}
      // meta={[
      //   { name: 'description', content: description },
      //   { name: 'keywords', content: keywords },
      // ]}
      >
        <html lang="en" />
        {/*
        <link
          href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,600,700|Merriweather:400,400i,700|Ubuntu:400,400i,700&display=swap"
          rel="stylesheet"
        />
        */}
        <link
          href="https://fonts.googleapis.com/css?family=Ubuntu:400,400i,700,700i&display=swap"
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
