import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';

import ShopItem from '../components/ShopItem';

import './styles/shop.scss';

const Shop = ({ data }) => {
  const [paused, setPaused] = useState(false);
  const [buttonPaused, setButtonPaused] = useState(false);
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 800;
  const pageYOffset = typeof window !== `undefined` ? window.pageYOffset : 0;

  const [windowWidth, setWindowWidth] = useState(widthVal);
  const [extra, setExtra] = useState(0);
  const [scroll, setScroll] = useState(pageYOffset);

  const mobile = windowWidth < 1200;

  const getProducts = () => {
    const stripeProducts = data.allStripeProduct.edges.filter(
      (node) => node.node.featuredImg,
    ); // only for products that have images
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
    if (typeof window !== `undefined`) {
      if (scroll === 0) window.scrollTo(0, 1000);
      else if (scroll === 1) window.scrollTo(0, 0);
    }
  });

  useEffect(() => {
    if (typeof window !== `undefined`)
      window.addEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );

    const updateDelay = () => {
      const winScroll =
        typeof document !== `undefined`
          ? document.body.scrollTop || document.documentElement.scrollTop
          : false;

      const height =
        typeof document !== `undefined`
          ? document.documentElement.scrollHeight -
            document.documentElement.clientHeight
          : 0;

      const scrolled = winScroll / height;
      setScroll(scrolled);
      if (typeof window !== `undefined` && window.scrollY)
        setExtra((window.scrollY + extra) / 50);
    };
    if (typeof window !== `undefined`)
      window.addEventListener('scroll', updateDelay);

    return () => {
      if (typeof window !== `undefined`)
        window.removeEventListener('scroll', updateDelay);
    };
  }, [extra, scroll]);

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
    <>
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
          <button
            type="button"
            className="shop-scroll__button"
            onClick={() => setButtonPaused(!buttonPaused)}
          >
            {buttonPaused ? (
              <PlayArrowIcon />
            ) : (
              <PauseIcon style={{ verticalAlign: 'center' }} />
            )}
          </button>
        </div>
      </div>
      <ForwardRoundedIcon className="shop__view" />
    </>
  );
};

Shop.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Shop;

export const query = graphql`
  query MyQuery {
    allStripeProduct(filter: { active: { eq: true } }) {
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
              fixed(width: 240) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
