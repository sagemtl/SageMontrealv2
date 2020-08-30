import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import classNames from 'classnames';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';
import Layout from '../components/layout';
import ShopItem from '../components/ShopItem';
import './styles/shop.scss';

const Shop = ({ data }) => {
  const [buttonPaused, setButtonPaused] = useState(false);
  const [paused, setPaused] = useState(false);
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 1200;
  const [windowWidth, setWindowWidth] = useState(widthVal);
  const [extra, setExtra] = useState(0);
  const pageYOffset = typeof window !== `undefined` ? window.pageYOffset : 0;
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
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      window.addEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );

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
    }
  }, [extra, scroll]);

  const shopAnimationClasses = classNames({
    'shop-wheel': !mobile,
    'shop-track': mobile,
    'shop-paused': buttonPaused || paused,
  });

  return (
    <Layout>
      <div className="shop-scroll">
        <img
          src={
            mobile
              ? 'https://sageimagebank.s3.ca-central-1.amazonaws.com/sage-shop-background-mobile.jpg'
              : 'https://sageimagebank.s3.ca-central-1.amazonaws.com/sage-shop-background.jpg'
          }
          className="shop-scroll__background"
          alt="Shop Wheel Art"
        />
        <div className="shop">
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
          </div>
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
      <Link to="/shop/all">
        <div className="shop-view" role="button" tabIndex={0}>
          <img
            style={{ margin: 0 }}
            className="shop-view__logo"
            src="https://sageimagebank.s3.ca-central-1.amazonaws.com/sage-animated.gif"
            alt="Sage Logo"
          />
          <div className="shop-view__text">
            <b>view all</b>
          </div>
          <ForwardRoundedIcon fontSize="large" className="shop-view__arrow" />
        </div>
      </Link>
    </Layout>
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
