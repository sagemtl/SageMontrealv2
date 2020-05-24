import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Img from "gatsby-image"

const Product = ({ data }) => {
  const item = data.stripeProduct;
  const skus = data.allStripeSku;
  console.log(data);
  return (
    <Layout>
      <div>
        <h1>{item.name}</h1>
        <h2>Product ID: {item.id}</h2>
        <p>Product description: {item.description}</p>
        <h3>Associated SKUs</h3>
        {skus.edges.map(({ node }) => (
          <div>
            <p>{node.attributes.name}</p>
            <img src={node.featuredImg.childImageSharp.fixed.src} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Product;

export const query = graphql`
  query($id: String!) {
    stripeProduct(id: { eq: $id }) {
      id
      name
      description
    }
    allStripeSku(filter: { product: { id: { eq: $id } } }) {
      edges {
        node {
          attributes {
            name
          }
          featuredImg {
            childImageSharp {
              fixed {
                src
              }
            }
          }
        }
      }
    }
  }
`;
