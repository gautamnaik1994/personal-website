var netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`,
  },
};

module.exports = {
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
    PRESERVE_WEBPACK_CACHE: false,
    FAST_REFRESH: false,
    FAST_DEV: false,
    QUERY_ON_DEMAND: false,
    LAZY_IMAGES: true,
    DEV_SSR: false,
  },
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://gautamnaik.com',
    author: 'Gautam Naik',
    title: 'Gautam Naik',
    description: 'Personal Website',
    keywords: ['ui', 'ux', 'designer', 'css', 'frontend'],
  },
  plugins: [
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     path: `${__dirname}/content/blog`,
    //     name: 'blog',
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/img`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `cms`,
        path: `${__dirname}/_data`,
      },
    },
    netlifyCmsPaths,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          netlifyCmsPaths,
          {
            resolve: 'gatsby-remark-images',
            options: {
              // maxWidth: 620,
              // srcSetBreakpoints: [400],
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              noInlineHighlight: false,
              showLineNumbers: false,
            },
          },
        ],
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gautam Naik',
        short_name: 'Gautam Naik',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#525dce',
        display: 'standalone',
        icon: 'assets/logo.png',
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        openGraph: {
          type: 'website',
          locale: 'en_IN',
          url: 'https://www.gautamnaik.com/',
          site_name: 'Gautam Naik',
        },
        facebook: {
          appId: 543210136344363,
        },
        // twitter: {
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // },
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-5ZV4S62',
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: 'UA-124761745-2',
    //   },
    // },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        htmlTitle: `Gautam's Content Manager`,
        htmlFavicon: `./assets/logo.png`,
      },
    },
  ],
};
