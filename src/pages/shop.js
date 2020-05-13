import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import '../styles/shop.scss';

const shop = ({ data }) => {
  const [paused, setPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const products = data.allMongodbHeroku8Pxd36BkProducts.edges;

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
          {products.map((product, index) => {
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
                    src={product.node.imagePath}
                    className="shop-wheel__image"
                    alt={`Product-${index}`}
                  />
                  <img
                    src={product.node.imagePath}
                    className="shop-wheel__image"
                    alt={`Product-${index}`}
                  />
                  <img
                    src={product.node.imagePath}
                    className="shop-wheel__image"
                    alt={`Product-${index}`}
                  />
                  {windowWidth > 1200 && (
                    <img
                      src={product.node.imagePath}
                      className="shop-wheel__image"
                      alt={`Product-${index}`}
                    />
                  )}
                  {windowWidth > 1500 && (
                    <img
                      src={product.node.imagePath}
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

shop.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default shop;

export const pageQuery = graphql`
  query MyQuery {
    allMongodbHeroku8Pxd36BkProducts {
      edges {
        node {
          id
          imagePath
          title
        }
      }
    }
  }
`;
