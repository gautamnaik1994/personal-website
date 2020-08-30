const path = require('path');

const PAGINATION_OFFSET = 3;

const pluckCategories = (edges) =>
  Object.keys(
    edges.reduce((acc, value) => {
      value.node.fields.categories.forEach((category) => {
        if (!acc[category]) {
          acc[category] = category;
        }
      });

      return acc;
    }, {}),
  );

const groupByCategory = (edges) =>
  edges.reduce((acc, value) => {
    value.node.fields.categories.forEach((category) => {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(value);
    });
    return acc;
  }, {});

const pluckTags = (edges) =>
  Object.keys(
    edges.reduce((acc, value) => {
      value.node.fields.tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = tag;
        }
      });

      return acc;
    }, {}),
  );

const groupByTag = (edges) =>
  edges.reduce((acc, value) => {
    value.node.fields.tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(value);
    });
    return acc;
  }, {});

const createPaginatedPages = (createPage, edges, pathPrefix, context) => {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET);

    if (!acc[pageIndex]) {
      acc[pageIndex] = [];
    }

    acc[pageIndex].push(value.node.id);

    return acc;
  }, []);

  pages.forEach((page, index) => {
    const nextPagePath =
      index === pages.length - 1 ? `/blog` : `/blog/${index + 1}`;
    const previousPagePath = index === 0 ? `/blog` : `/blog/${index - 1}`;
    createPage({
      path: index > 0 ? `/blog/${index}` : `${pathPrefix}`,
      component: path.resolve(`src/templates/blog.tsx`),
      context: {
        pagination: {
          page,
          nextPagePath: nextPagePath,
          previousPagePath: index === 1 ? pathPrefix : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    });
  });
};

const createPaginatedPagesForCategoriesAndTags = (
  createPage,
  edges,
  pathPrefix,
  context,
) => {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET);
    if (!acc[pageIndex]) {
      acc[pageIndex] = [];
    }
    acc[pageIndex].push(value.node.id);
    return acc;
  }, []);
  pages.forEach((page, index) => {
    const nextPagePath =
      index === pages.length - 1 ? null : `${pathPrefix}/${index + 1}`;
    const previousPagePath = index === 0 ? null : `${pathPrefix}/${index - 1}`;
    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: path.resolve(`src/templates/blog.tsx`),
      context: {
        pagination: {
          page,
          nextPagePath: nextPagePath,
          previousPagePath: index === 1 ? pathPrefix : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    });
  });
};

const createCategoryPages = (createPage, edges) => {
  const categories = pluckCategories(edges);
  const posts = groupByCategory(edges);
  Object.keys(posts).forEach((category, index) => {
    createPaginatedPagesForCategoriesAndTags(
      createPage,
      posts[category],
      `/blog/categories/${category}`,
      {
        categories,
        activeCategory: category,
        activeCategoryIndex: index,
      },
    );
  });
};

const createTagPages = (createPage, edges) => {
  const tags = pluckTags(edges);
  const categories = pluckCategories(edges);
  const posts = groupByTag(edges);
  Object.keys(posts).forEach((tag, index) => {
    createPaginatedPagesForCategoriesAndTags(
      createPage,
      posts[tag],
      `/blog/tags/${tag}`,
      {
        tags,
        categories,
        activeTag: tag,
        activeTagIndex: index,
      },
    );
  });
};

const createPosts = (createPage, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node;
    const next = i === edges.length - 1 ? null : edges[i + 1].node;
    createPage({
      path: `/blog${node.fields.slug}`,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        id: node.id,
        prev,
        next,
      },
    });
  });
};

const createBlog = (createPage, edges) => {
  const categories = pluckCategories(edges);
  createPaginatedPages(createPage, edges, '/blog/', {
    categories,
  });
};

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            fields {
              title
              slug
              categories
              tags
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    const { edges } = data.allMdx;
    // createIBlog(actions.createPage, edges);
    createBlog(actions.createPage, edges);
    createPosts(actions.createPage, edges);
    createCategoryPages(actions.createPage, edges);
    //createTagPages(actions.createPage, edges);
  });

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    });

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    });

    createNodeField({
      name: 'slug',
      node,
      value: node.frontmatter.slug,
    });

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date || '',
    });

    createNodeField({
      name: 'updatedDate',
      node,
      value: node.frontmatter.updatedDate || '',
    });

    createNodeField({
      name: 'banner',
      node,
      banner: node.frontmatter.banner,
    });

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    });

    createNodeField({
      name: 'tags',
      node,
      value: node.frontmatter.tags || [],
    });

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    });
  }
};
