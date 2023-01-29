const requireEsm = require(`esm`)(module);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
// const { fmImagesToRelative } = require(`gatsby-remark-relative-images`);

module.exports = requireEsm(`./gatsby-node.esm.js`);
