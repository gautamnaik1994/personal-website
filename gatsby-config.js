module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://gautamblogs.netlify.app',
    author: 'Gautam Naik',
    title: 'Gautam Blogs',
    description: 'Blog will contain blogs',
    keywords: ['vim', 'blog', 'mappings', 'css', 'react'],
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 620,
              srcSetBreakpoints: [400],
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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gautam Blogs',
        short_name: 'Gautam Blogs',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#525dce',
        display: 'standalone',
        icon: 'assets/logo.png',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        openGraph: {
          type: 'website',
          locale: 'en_IN',
          url: 'https://gautamblogs.netlify.app/',
          site_name: 'Gautam Blogs',
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
  ],
};
