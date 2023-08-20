import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
// import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { graphql, useStaticQuery } from 'gatsby';
// import '../global.d.ts';
// Had added @ts-ignore
import 'prismjs/themes/prism-tomorrow.css';
import 'sanitize.css';
import { MDXProvider } from '@mdx-js/react';
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
// import OuterLinks from './OuterLinks';
// import SEO from './SEO';

function Layout({ children }: LayoutProps): React.ReactElement {
  const [theme, setTheme] = useState<string | null>(getThemeValue());

  // const data = useStaticQuery(graphql`
  //   {
  //     site {
  //       siteMetadata {
  //         title
  //         description
  //         siteUrl
  //         author
  //         keywords
  //         ogImage
  //       }
  //     }
  //   }
  // `);
  // const { site } = data;
  const toggleTheme = (): void => {
    const currentTheme = theme === `light` ? `dark` : `light`;
    if (typeof window !== `undefined`) {
      localStorage.setItem(`theme`, currentTheme);
    }

    setColors(currentTheme);
    setTheme(currentTheme);
    // console.log(`called toggl thme`);
  };

  // useEffect(() => {
  // themeConfig();
  // setTheme(theme);
  // alert(' d', theme);
  // window.matchMedia('(prefers-color-scheme: dark)').addEventListener((e) => {
  //   if (e.matches) {
  //     console.log('dark mode is enabled');
  //   } else {
  //     console.log('dark mode is disabled');
  //   }
  // });
  // }, []);

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap&text=0123456789"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,500;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />
      </Helmet>
      <ThemeProvider
        theme={{
          mode: theme || `dark`,
          primary: theme === `light` ? primaryCol : desaturatedPrimaryCol,
        }}
      >
        <>
          <GlobalStyle />
          <MDXProvider
            components={{
              ...MDXLayoutComponents,
              ...MDXGlobalComponents,
            }}
          >
            <>
              <Navbar toggleTheme={toggleTheme} />
              <Sidebar toggleTheme={toggleTheme} />
              {children}
              <Footer />
            </>
          </MDXProvider>
        </>
      </ThemeProvider>
    </>
  );
}

export default Layout;

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
      siteUrl
      ogImage
    }
  }
`;
