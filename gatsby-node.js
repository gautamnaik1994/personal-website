import path, { resolve } from 'path';

let categories = [];
let blogPostPerPage = 4;

export async function createPages(params) {
  await fetchImportantData(params);
  await Promise.all([
    createCategoryPages(params),
    createPostPage(params),
    createBlogPages(params),
  ]);
}

async function createPostPage({ actions, graphql }) {
  const template = path.resolve(`./src/templates/post.tsx`);
  const { data } = await graphql(`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/_data/blog/" } }) {
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
  console.log('called fetch data');
  const { data } = await graphql(`
    query {
      siteData: allMdx(
        filter: { fileAbsolutePath: { regex: "/_data/siteData/settings/" } }
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
          fileAbsolutePath: { regex: "/_data/blog/" }
          frontmatter: { publish: { eq: true } }
        }
      ) {
        group(field: frontmatter___category) {
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
          fileAbsolutePath: { regex: "/_data/blog/" }
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
      path: `/blog/${i < 1 ? '' : i + 1}`,
      component: template,
      context: {
        skip: i * blogPostPerPage,
        currentPage: i + 1,
        blogPostPerPage,
        base: '/blog',
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
        allMdx(filter: {fileAbsolutePath: {regex: "/_data/blog/"}, frontmatter: {category: {eq: "${cat}"},publish: {eq: true}}}) {
          totalCount
        }
      }
    `);
    const pageCount = Math.ceil(data.allMdx.totalCount / blogPostPerPage);
    Array.from({ length: pageCount }).forEach((_, i) => {
      actions.createPage({
        path: `/blog/${cat}/${i < 1 ? '' : i + 1}`,
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
