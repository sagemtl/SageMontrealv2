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