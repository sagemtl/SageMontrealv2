import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Layout from '../../components/layout';
import ShopViewItem from '../../components/ShopViewItem';

import './style/all.scss';

const ShopAll = ({ data, location }) => {
  const getProducts = () => {
    const stripeProducts = data.allStripeProduct.edges.filter(
      (node) => node.node.featuredImg,
    ); // only for products that have images
    const products = [];
    products.push(...stripeProducts);

    return products;
  };

  return (
    <Layout location={location}>
      <div className="shop-all-container">
        {getProducts().map((product) => {
          return <ShopViewItem product={product} />;
        })}
      </div>
      <Link className="back" to="/shop">
        <KeyboardBackspaceIcon className="product-back" fontSize="large" />
      </Link>
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
