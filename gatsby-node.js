const requireEsm = require(`esm`)(module);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

module.exports = requireEsm(`./gatsby-node.esm.js`);
