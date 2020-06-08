import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import Layout from '../components/layout';
import ShopItem from '../components/ShopItem';
import '../styles/shop.scss';

const Shop = (props) => {
  const { data } = props;
  const [paused, setPaused] = useState(false);
  const [buttonPaused, setButtonPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [extra, setExtra] = useState(0);
  const [scroll, setScroll] = useState(window.pageYOffset);
  const [mobile, setMobile] = useState(window.innerWidth < 1200);

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
  });

  useEffect(() => {
    setMobile(windowWidth < 1200);

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
      if (window.scrollY) setExtra((window.scrollY + extra) / 50);
    };
    window.addEventListener('resize', updateWindow);
    window.addEventListener('scroll', updateDelay);

    return () => {
      window.removeEventListener('resize', updateWindow);
      window.removeEventListener('scroll', updateDelay);
    };
  }, [buttonPaused, extra, scroll, windowWidth]);

  return (
    <Layout current="/shop">
      <div className="shop-scroll">
        <div className={mobile ? 'shop-mobile' : 'shop'}>
          <div
            className={mobile ? 'shop-track' : 'shop-wheel'}
            style={
              buttonPaused || paused ? { animationPlayState: 'paused' } : {}
            }
          >
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
          <button
            onClick={() => setButtonPaused(!buttonPaused)}
            type="button"
            className="shop__button"
          >
            {buttonPaused ? (
              <PlayArrowIcon />
            ) : (
              <PauseIcon style={{ verticalAlign: 'center' }} />
            )}
          </button>
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
