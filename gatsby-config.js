// const rehypeSlug = require(`rehype-slug`);
// const rehypeAutolinkHeadings = require(`rehype-autolink-headings`);
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';

require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});

const wrapESMPlugin = (name) =>
  function wrapESM(opts) {
    return async (...args) => {
      const mod = await import(name);
      const plugin = mod.default(opts);
      return plugin(...args);
    };
  };

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
    description: `Gautam Naik is a Senior Software Engineer who specializes in Web Development, Data Science and Machine Learning.`,
    keywords: [
      `responsive web design`,
      `progressive web application`,
      `web application`,
      `web design`,
      `web development`,
      `css`,
      `aws`,
      `frontend`,
      `reactjs`,
      `javascript`,
      `python`,
      `fastapi`,
      `scss`,
      `adobe`,
      `xd`,
      `photoshop`,
      `illustrator`,
      `figma`,
      `blog`,
      `machine learning`,
      `data science`,
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
        // plugins: [
        //   `gatsby-remark-images`,
        //   `gatsby-remark-images-medium-zoom` // Important!
        // ],
        gatsbyRemarkPlugins: [
          // `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
              linkImagesToOriginal: false,
              // srcSetBreakpoints: [400],
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              title: true,
              classPrefix: `language-`,
              inlineCodeMarker: null,
              aliases: {},
              noInlineHighlight: false,
              showLineNumbers: false,
              showLanguages: true,
            },
          },
          // {
          //   resolve: `gatsby-remark-shiki`,
          //   options: {
          //     theme: 'nord',
          //   },
          // },
        ],
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            // require(`remark-gfm`),
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            // [require(`remark-external-links`), { target: false }],
          ],
          rehypePlugins: [
            // Generate heading ids for rehype-autolink-headings
            wrapESMPlugin(`rehype-slug`),
            require(`./src/utils/rehype-prepend-id`),
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            // [wrapESMPlugin(`rehype-autolink-headings`), { behavior: `wrap` }],
          ],
        },
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
              maxWidth: 720,
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
        id: `gautamnaik`,
        background_color: `#212738`,
        theme_color: `#4BACFE`,
        display: `standalone`,
        icon: `assets/logo.png`,
        icon_options: {
          purpose: `any maskable`,
        },
        orientation: `portrait`,
        description: `Gautam Naik is a Senior Software Engineer who specializes in Web Development, Data Science and Machine Learning.`,
        shortcuts: [
          {
            name: `Gautam Blogs`,
            short_name: `Gautam Blogs`,
            description: `Gautam Blogs`,
            url: `/blog`,
            icons: [
              {
                src: `icons/icon-192x192.png?v=d069094058bc95375f4c5230909458da`,
                sizes: `192x192`,
              },
            ],
          },
          {
            name: `Projects`,
            short_name: `Projects`,
            description: `Projects`,
            url: `/projects`,
            icons: [
              {
                src: `icons/icon-192x192.png?v=d069094058bc95375f4c5230909458da`,
                sizes: `192x192`,
              },
            ],
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    // {
    //   resolve: `gatsby-plugin-next-seo`,
    //   options: {
    //     openGraph: {
    //       type: `website`,
    //       locale: `en_IN`,
    //       url: `https://www.gautamnaik.com/`,

    //       site_name: `Gautam Naik`,
    //     },
    //     facebook: {
    //       appId: 543210136344363,
    //     },
    //   },
    // },
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
      resolve: `gatsby-plugin-decap-cms`,
      options: {
        htmlTitle: `Gautam's Content Manager`,
        htmlFavicon: `./assets/logo.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        devMode: false,
      },
    },
  ],
};
