require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
    PRESERVE_WEBPACK_CACHE: true,
    FAST_REFRESH: true,
    FAST_DEV: true,
    QUERY_ON_DEMAND: true,
    LAZY_IMAGES: true,
    DEV_SSR: false,
  },
  graphqlTypegen: true,
  pathPrefix: `/`,
  siteMetadata: {
    siteUrl: `https://gautamnaik.com`,
    author: `Gautam Naik`,
    title: `Gautam Naik`,
    description: `Gautam Naik is a UI Designer and Frontend Web Developer who specializes in building mobile-friendly web apps`,
    keywords: [
      `ui`,
      `ux`,
      `designer`,
      `css`,
      `frontend`,
      `reactjs`,
      `javascript`,
      `python`,
      `scss`,
      `adobe`,
      `xd`,
      `photoshop`,
      `illustrator`,
      `figma`,
      `blog`,
    ],
    ogImage: `/siteMedia/og-image.png`,
  },
  plugins: [
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     path: `${__dirname}/content/blog`,
    //     name: 'blog',
    //   },
    // },
    // `gatsby-plugin-netlify-cms-paths`,
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

    // netlifyCmsPaths,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          // netlifyCmsPaths,
          // `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // maxWidth: 620,
              // srcSetBreakpoints: [400],
            },
          },

          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: `language-`,
              inlineCodeMarker: null,
              aliases: {},
              noInlineHighlight: false,
              showLineNumbers: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },

          // {
          //   resolve: `gatsby-remark-responsive-iframe`,
          //   options: {
          //     wrapperStyle: `margin-bottom: 1.0725rem`,
          //   },
          // },
          // `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        name: `Gautam Naik`,
        short_name: `Gautam Naik`,
        start_url: `/`,
        background_color: `#212738`,
        theme_color: `#4BACFE`,
        display: `standalone`,
        icon: `assets/logo.png`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-next-seo`,
      options: {
        openGraph: {
          type: `website`,
          locale: `en_IN`,
          url: `https://www.gautamnaik.com/`,

          site_name: `Gautam Naik`,
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
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `${process.env.GTM_KEY}`,
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
