import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../../components/layout';
import ShopViewItem from '../../components/ShopViewItem';

import './style/all.scss';

const ShopAll = ({ data }) => {
  const getProducts = () => {
    const stripeProducts = data.allStripeProduct.edges.filter(
      (node) => node.node.featuredImg,
    ); // only for products that have images
    const products = [];
    products.push(...stripeProducts);

    return products;
  };

  return (
    <Layout>
      <div className="shop-all-container">
        {getProducts().map((product) => {
          return <ShopViewItem product={product} />;
        })}
      </div>
    </Layout>
  );
};

ShopAll.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ShopAll;

export const query = graphql`
  query ShopViewQuery {
    allStripeProduct(filter: { active: { eq: true } }) {
      edges {
        node {
          id
          name
          images
          fields {
            slug
          }
          metadata {
            price
          }
          featuredImg {
            childImageSharp {
              fixed(height: 200, toFormat: PNG) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
