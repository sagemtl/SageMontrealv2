import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import '../styles/shop.scss';

const Shop = ({ data }) => {
  const [paused, setPaused] = useState(false);
  const [buttonPaused, setButtonPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [extra, setExtra] = useState(0);
  const [scroll, setScroll] = useState(window.pageYOffset);

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
    if (scroll === 0) window.scrollTo(0, 1000);
    else if (scroll === 1) window.scrollTo(0, 0);
  }, [scroll]);

  useEffect(() => {
    const updateWindow = () => {
      setWindowWidth(window.innerWidth);
    };

    const updateDelay = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = winScroll / height;

      setScroll(scrolled);
      setExtra((window.scrollY / 50) % 20);
    };
    window.addEventListener('resize', updateWindow);
    window.addEventListener('scroll', updateDelay);

    return () => {
      window.removeEventListener('resize', updateWindow);
      window.removeEventListener('scroll', updateDelay);
    };
  }, [buttonPaused, extra, scroll]);

  return (
    <Layout>
      <div className="shop-scroll">
        <div className="shop">
          <div className="shop-wheel">
            <button
              onClick={() => setButtonPaused(!buttonPaused)}
              type="button"
              className="shop__button"
            >
              {buttonPaused ? 'RESUME' : 'PAUSE'}
            </button>
            {getProducts().map((product, index) => {
              if (index < 16) {
                const delay = `${0 - index * 1.25 - extra}s`;

                return (
                  <div
                    className="shop-wheel__item"
                    style={
                      paused || buttonPaused
                        ? {
                            animationPlayState: 'paused',
                            animationDelay: delay,
                          }
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
