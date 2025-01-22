const rehypePrependId = () => {
  return (tree) => {
    const visit = require(`unist-util-visit`);

    visit(tree, `element`, (node) => {
      if ([`h1`, `h2`, `h3`, `h4`, `h5`, `h6`].includes(node.tagName)) {
        const idAttr = node.properties?.id;
        if (idAttr) {
          node.properties.id = `heading-${idAttr}`;
        }
      }
    });
  };
};

module.exports = rehypePrependId;
