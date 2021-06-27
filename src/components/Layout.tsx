import React, { Fragment, useState, useEffect, createContext } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
// import '../global.d.ts';
// Had added @ts-ignore
import { MDXProvider } from '@mdx-js/react';
import 'prismjs/themes/prism-tomorrow.css';
import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import '../styles/style.scss';
import Navbar from './Navbar';
import Footer from './Footer';
import { MDXLayoutComponents, MDXGlobalComponents } from './mdx';
import { GlobalStyle } from './GlobalStyle';
import { LayoutProps } from '../types';
import { ThemeProvider } from 'styled-components';
import { primaryCol, desaturatedPrimaryCol } from '../utils/colors';
import { setColors, getThemeValue } from '../utils/themeConfig';
import Sidebar from './Sidebar';
import OuterLinks from './OuterLinks';

export default ({ site, children }: LayoutProps): JSX.Element => {
  const [theme, setTheme] = useState<string | null>(getThemeValue());

  const toggleTheme = (): void => {
    const currentTheme = theme === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', currentTheme);
    }

    setColors(currentTheme);
    setTheme(currentTheme);
    console.log('called toggl thme');
  };

  useEffect(() => {
    // themeConfig();
    //setTheme(theme);
    // alert(' d', theme);
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
        <meta charSet="UTF-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1,
        maximum-scale=1, user-scalable = no, shrink-to-fit=no"
        />
        <meta name="apple-mobile-web-app-title" content="Gautam Naik" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="apple-mobile-web-app-title" content=" " />
        <meta name="application-name" content=" " />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <title>Gautam Naik</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap&text=0123456789"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,500;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="all" />
        <meta name="googlebot" content="all" />
        <script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />
      </Helmet>
      <ThemeProvider
        theme={{
          mode: theme || 'dark',
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
              <Sidebar toggleTheme={toggleTheme} />
              {children}
              <OuterLinks />
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
