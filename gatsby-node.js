/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// need this schema customization to add the link node for images onto stripe objects
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type StripeSku implements Node {
      featuredImg: File @link(from: "featuredImg___NODE")
    }
    type StripeProduct implements Node {
      featuredImg: File @link(from: "featuredImg___NODE")
    }
  `);
};

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField, createNode, createParentChildLink } = actions;
  if (node.internal.type === `StripeProduct`) {
    const slug = generateSlug(node.name);
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
  if (node.internal.type === `StripeSku`) {
    // not pulling imgs for Skus
    // if (node.image) {
    //   try {
    //     fileNode = await createRemoteFileNode({
    //       url: node.image,
    //       parentNodeId: node.id,
    //       // The action used to create nodes
    //       createNode,
    //       // A helper function for creating node Ids
    //       createNodeId,
    //       cache,
    //       store,
    //       ext: '.jpg',
    //     });
    //     // console.log("file node created for: " + node.id + "; file node id is: " + fileNode.id);
    //   } catch (e) {
    //     // Ignore
    //     console.log(`*** error downloading media files: ${e}`);
    //   }
    //   // if the file was created, attach the new node to the parent node
    //   if (fileNode) {
    //     node.featuredImg___NODE = fileNode.id;
    //     // console.log("fileNode is valid, attaching to parent node at: " + node.id);
    //   }
    // }
  }
  if (node.internal.type === `StripeProduct`) {
    for (const img of node.images) {
      try {
        fileNode = await createRemoteFileNode({
          url: img,
          parentNodeId: node.id,
          // The action used to create nodes
          createNode,
          // A helper function for creating node Ids
          createNodeId,
          cache,
          store,
          ext: '.jpg',
        });

        // if the file was created, attach the new node to the parent node
        if (fileNode) {
          createParentChildLink({ parent: node, child: fileNode });
          // console.log("fileNode is valid, attaching to parent node at: " + node.id);
        }
        // console.log("file node created for: " + node.id + "; file node id is: " + fileNode.id);
      } catch (e) {
        // Ignore
        console.log(`*** error downloading media files: ${e}`);
      }
    }
    if (node.metadata.featuredImg) {
      try {
        fileNode = await createRemoteFileNode({
          url: node.metadata.featuredImg,
          parentNodeId: node.id,
          // The action used to create nodes
          createNode,
          // A helper function for creating node Ids
          createNodeId,
          cache,
          store,
          ext: '.jpg',
        });
        // console.log("file node created for: " + node.id + "; file node id is: " + fileNode.id);
        if (fileNode) {
          node.featuredImg___NODE = fileNode.id;
        }
      } catch (e) {
        // Ignore
        console.log(`*** error downloading media files: ${e}`);
      }
      // if the file was created, attach the new node to the parent node
    } else {
      try {
        fileNode = await createRemoteFileNode({
          url: node.images[0],
          parentNodeId: node.id,
          // The action used to create nodes
          createNode,
          // A helper function for creating node Ids
          createNodeId,
          cache,
          store,
          ext: '.jpg',
        });
        // console.log("file node created for: " + node.id + "; file node id is: " + fileNode.id);
        // if the file was created, attach the new node to the parent node
        if (fileNode) {
          node.featuredImg___NODE = fileNode.id;
        }
      } catch (e) {
        // Ignore
        console.log(`*** error downloading media files: ${e}`);
      }
    }
  }
};

const generateSlug = (name) => {
  // global replacement of space
  const slug = name.replace(/ /g, '-');
  return slug;
};

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allStripeProduct(filter: { active: { eq: true } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            featuredImg {
              id
            }
          }
        }
      }
    }
  `);

  const path = require(`path`);

  result.data.allStripeProduct.edges.forEach(({ node }) => {
    if (node.featuredImg.id) {
      createPage({
        path: `/shop/${node.fields.slug}`,
        component: path.resolve(`./src/templates/product.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          id: node.id,
        },
      });
    }
  });
};

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
