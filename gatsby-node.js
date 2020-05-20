/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

// exports.onCreateNode = ({ node, getNode, actions }) => {
//     const {createNodeField} = actions
//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode, basePath: `pages` })
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     })  }
// }

exports.createPages = async ({ graphql, actions }) => {
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const {createPage} = actions
    const result = await graphql(`
      query {
        allStripeProduct {
            edges {
              node {
                id
              }
            }
          }
      }
    `)
    // console.log(JSON.stringify(result, null, 4))

    result.data.allStripeProduct.edges.forEach(({ node }) => {
        createPage({
          path: "/shop/"+node.id,
          component: path.resolve(`./src/templates/product.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            id: node.id,
          },
        })
      })
  }

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

//attempt to download images for stripe sku object
exports.downloadMediaFiles = ({ nodes, getCache, createNode, createNodeId }) => {
    nodes.map(async node => {
      let fileNode;
      // Ensures we are only processing Media Files
      // `wordpress__wp_media` is the media file type name for Wordpress
      if (node.internal.type === `StripeSku`) {
        try {
          fileNode = await createRemoteFileNode({
            url: node.image,
            parentNodeId: node.id,
            // Gatsby's cache which the helper uses to check if the file has been downloaded already. It's passed to all Node APIs.
            getCache,
            // The action used to create nodes
            createNode,
            // A helper function for creating node Ids
            createNodeId,
          });
          console.log("file node created for: " + node.id + "; file node id is: " + fileNode.id);
        } catch (e) {
          // Ignore
          console.log("error downloading media files: " + e);
        }
      }
  
      // Adds a field `localFile` to the node
      // ___NODE appendix tells Gatsby that this field will link to another node
      if (fileNode) {
        node.localFile___NODE = fileNode.id;
      }
    });
  };
