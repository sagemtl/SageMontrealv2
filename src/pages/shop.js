import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import '../styles/shop.scss';

const Shop = ({ data }) => {
  const [paused, setPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(data);
  const getProducts = () => {
    const stripeProducts = data.allStripeProduct.edges;
    const products = [];
    let factor = Math.floor(16 / stripeProducts.length);
    const remainder = 16 % stripeProducts.length;
    while (factor > 0) {
      products.push(...stripeProducts);
      factor -= 1;
    }
    products.push(...stripeProducts.slice(0, remainder));
    return products;
  };

  useEffect(() => {
    const updateWindow = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindow);

    return () => window.removeEventListener('resize', updateWindow);
  }, []);

  return (
    <Layout>
      <div className="shop">
        <div className="shop-wheel">
          {getProducts().map((product, index) => {
            if (index < 16) {
              const delay = `${0 - index * 1.25}s`;

              return (
                <div
                  className="shop-wheel__item"
                  style={
                    paused
                      ? { animationPlayState: 'paused', animationDelay: delay }
                      : { animationDelay: delay }
                  }
                  onMouseEnter={() => {
                    setPaused(true);
                  }}
                  onMouseLeave={() => {
                    setPaused(false);
                  }}
                >
                  <img
                    src={product.node.images[0]}
                    className="shop-wheel__image"
                    alt={`Product-${index}`}
                  />
                  <img
                    src={product.node.images[0]}
                    className="shop-wheel__image"
                    alt={`Product-${index}`}
                  />
                  <img
                    src={product.node.images[0]}
                    className="shop-wheel__image"
                    alt={`Product-${index}`}
                  />
                  {windowWidth > 1200 && (
                    <img
                      src={product.node.images[0]}
                      className="shop-wheel__image"
                      alt={`Product-${index}`}
                    />
                  )}
                  {windowWidth > 1500 && (
                    <img
                      src={product.node.images[0]}
                      className="shop-wheel__image"
                      alt={`Product-${index}`}
                    />
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
    </Layout>
  );
};

Shop.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Shop;

export const query = graphql`
  query MyQuery {
    allStripeProduct {
      edges {
        node {
          id
          name
          images
        }
      }
    }
    allStripeSku {
      edges {
        node {
          id
          attributes {
            name
          }
          product {
            id
          }
          image
        }
      }
    }
    allMongodbHeroku8Pxd36BkProducts {
      edges {
        node {
          imagePath
        }
      }
    }
  }
`;
