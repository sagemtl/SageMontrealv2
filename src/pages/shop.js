import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import Layout from '../components/layout';
import ShopItem from '../components/ShopItem';
import '../styles/shop.scss';
import { GlobalContext } from '../context/Provider';

const classNames = require('classnames');

const Shop = (props) => {
  const { data } = props;
  const [paused, setPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [extra, setExtra] = useState(0);
  const [scroll, setScroll] = useState(window.pageYOffset);
  const mobile = windowWidth < 1200;

  const { state, dispatch } = useContext(GlobalContext);
  const { buttonPaused } = state;

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

  const handleClick = () => {
    dispatch({
      type: 'SET_BUTTON_PAUSED',
      payload: {
        buttonPaused: !buttonPaused,
      },
    });
  };

  useEffect(() => {
    if (scroll === 0) window.scrollTo(0, 1000);
    else if (scroll === 1) window.scrollTo(0, 0);
  });

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

    const updateDelay = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = winScroll / height;
      setScroll(scrolled);
      if (window.scrollY) setExtra((window.scrollY + extra) / 50);
    };
    window.addEventListener('scroll', updateDelay);

    return () => {
      window.removeEventListener('scroll', updateDelay);
    };
  }, [extra, scroll, windowWidth]);

  const shopClasses = classNames({
    shop: !mobile,
    'shop-mobile': mobile,
  });

  const shopAnimationClasses = classNames({
    'shop-wheel': !mobile,
    'shop-track': mobile,
    'shop-paused': buttonPaused || paused,
  });

  return (
    <Layout current="/shop">
      <div className="shop-scroll">
        <div className={shopClasses}>
          <div className={shopAnimationClasses}>
            {getProducts().map((product, index) => {
              if (index < 16) {
                const delay = !mobile ? `${0 - index * 1.25 - extra}s` : 0;

                return (
                  <ShopItem
                    buttonPaused={buttonPaused}
                    delay={delay}
                    paused={paused}
                    setPaused={setPaused}
                    windowWidth={windowWidth}
                    product={product}
                  />
                );
              }
            })}
            {mobile &&
              getProducts().map((product, index) => {
                if (index < 16) {
                  return (
                    <ShopItem
                      buttonPaused={buttonPaused}
                      delay={0}
                      paused={paused}
                      setPaused={setPaused}
                      windowWidth={windowWidth}
                      product={product}
                    />
                  );
                }
              })}
          </div>
          {!mobile && (
            <button
              onClick={() => handleClick()}
              type="button"
              className="shop__button"
            >
              {buttonPaused ? (
                <PlayArrowIcon />
              ) : (
                <PauseIcon style={{ verticalAlign: 'center' }} />
              )}
            </button>
          )}
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
          fields {
            slug
          }
          featuredImg {
            childImageSharp {
              fixed(width:160) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
