import path, { resolve } from 'path';
import { createFilePath } from 'gatsby-source-filesystem';

let categories = [];
let blogPostPerPage = 4;

export async function createPages(params) {
  await fetchImportantData(params);
  await Promise.all([
    // createCategoryPages(params),
    createPostPage(params),
    createBlogPages(params),
  ]);
}

async function createPostPage({ actions, graphql }) {
  const template = path.resolve(`./src/templates/post.tsx`);
  const { data } = await graphql(`
    query {
      allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/blog/" } }
          frontmatter: { publish: { eq: true } }
        }
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
            }
          }
          next {
            frontmatter {
              title
              slug
            }
          }
          previous {
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `);
  const { edges } = data.allMdx;
  edges.forEach((post) => {
    actions.createPage({
      path: `/blog/${post.node.frontmatter.slug}`,
      component: template,
      context: {
        id: post.node.id,
        next: post.next,
        prev: post.previous,
      },
    });
  });
}

async function fetchImportantData({ actions, graphql }) {
  console.log(`called fetch data`);
  const { data } = await graphql(`
    query {
      siteData: allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/_data/siteData/settings/" } }
        }
      ) {
        nodes {
          frontmatter {
            posts {
              postPerPage
            }
          }
        }
      }
      allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/_data/blog/" } }
          frontmatter: { publish: { eq: true } }
        }
      ) {
        group(field: { frontmatter: { category: SELECT } }) {
          fieldValue
        }
      }
    }
  `);
  blogPostPerPage = data.siteData.nodes[0].frontmatter.posts.postPerPage;

  data.allMdx.group.forEach(({ fieldValue }) => {
    categories.push(fieldValue);
  });
  categories = [...new Set(categories)];
}

async function createBlogPages({ actions, graphql }) {
  const template = path.resolve(`./src/templates/blog.tsx`);
  const { data } = await graphql(`
    query {
      allMdx(
        filter: {
          internal: { contentFilePath: { regex: "/_data/blog/" } }
          frontmatter: { publish: { eq: true } }
        }
      ) {
        totalCount
      }
    }
  `);
  const pageCount = Math.ceil(data.allMdx.totalCount / blogPostPerPage);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/blog/${i < 1 ? `` : i + 1}`,
      component: template,
      context: {
        skip: i * blogPostPerPage,
        currentPage: i + 1,
        blogPostPerPage,
        base: `/blog`,
        pageCount,
        categories,
      },
    });
  });
}

async function createCategoryPages({ actions, graphql }) {
  const template = path.resolve(`./src/templates/blog.tsx`);
  let catIndex = 0;
  for await (const cat of categories) {
    const { data } = await graphql(`
      query {
        allMdx(filter: {internal: { contentFilePath: { regex: "/_data/blog/" } }, frontmatter: {category: {eq: "${cat}"},publish: {eq: true}}}) {
          totalCount
        }
      }
    `);
    const pageCount = Math.ceil(data.allMdx.totalCount / blogPostPerPage);
    Array.from({ length: pageCount }).forEach((_, i) => {
      actions.createPage({
        path: `/blog/${cat}/${i < 1 ? `` : i + 1}`,
        component: template,
        context: {
          skip: i * blogPostPerPage,
          currentPage: i + 1,
          blogPostPerPage,
          base: `/blog/${cat}`,
          pageCount,
          categories,
          activeCategory: cat,
          activeCategoryIndex: catIndex,
        },
      });
    });
    catIndex++;
  }
}

export async function onCreateNode({ node, actions, getNode }) {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
}

export async function createSchemaCustomization({ actions }) {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      github: String
      linkedin: String
      email: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      bannerImage: File @fileByRelativePath
      image: File @fileByRelativePath
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
}
