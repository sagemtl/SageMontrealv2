import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import classNames from 'classnames';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import Layout from '../components/layout';
import ShopItem from '../components/ShopItem';
import AdModal from '../components/adModal';
import './styles/shop.scss';
import sageAnimated from '../assets/sage-animated.gif';
import { GlobalContext } from '../context/Provider';
import ShopAudio1 from '../assets/ShopAudio1.mp3';
import ShopAudio2 from '../assets/ShopAudio2.mp3';
import sageBackgroundDesktop from '../assets/sage-shop-cornfield-background.png';
import sageBackgroundMobile from '../assets/sage-shop-cornfield-background-mobile.png';

const Shop = ({ data }) => {
  const [buttonPaused, setButtonPaused] = useState(false);
  const [paused, setPaused] = useState(false);
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 1200;
  const [windowWidth, setWindowWidth] = useState(widthVal);
  const [extra, setExtra] = useState(0);
  const pageYOffset = typeof window !== `undefined` ? window.pageYOffset : 0;
  const [scroll, setScroll] = useState(pageYOffset);
  const mobile = windowWidth < 1200;

  const { state, dispatch } = useContext(GlobalContext);
  const { audioPaused, audio } = state;

  const setAudioPaused = (isPaused) => {
    dispatch({
      type: 'SET_AUDIO_PAUSED',
      payload: {
        audioPaused: isPaused,
      },
    });
  };

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
    const setAudio = (audioFile) => {
      dispatch({
        type: 'SET_AUDIO',
        payload: {
          audio: audioFile,
        },
      });
    };

    if (!audio) {
      if (Math.random() < 0.5) {
        setAudio(ShopAudio1);
      } else {
        setAudio(ShopAudio2);
      }
    }
  }, [audio, dispatch]);

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

  if (typeof window === `undefined`) {
    return <></>;
  }

  const shopAnimationClasses = classNames({
    'shop-wheel': !mobile,
    'shop-track': mobile,
    'shop-paused': buttonPaused || paused,
  });

  return (
    <Layout footerColor="white">
      <AdModal />
      <div className="shop-scroll">
        {audio && (
          <audio autoPlay loop muted={audioPaused}>
            <source type="audio/mp3" src={audio} />
          </audio>
        )}
        <img
          src={mobile ? sageBackgroundMobile : sageBackgroundDesktop}
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
                    delay={delay.toString()}
                    paused={paused}
                    setPaused={setPaused}
                    windowWidth={windowWidth}
                    product={product}
                    key={product.node.id + index.toString()}
                  />
                );
              }
              return <></>;
            })}
          </div>
          {mobile &&
            getProducts().map((product, index) => {
              if (index < 16) {
                return (
                  <ShopItem
                    buttonPaused={buttonPaused}
                    delay="0"
                    paused={paused}
                    setPaused={setPaused}
                    windowWidth={windowWidth}
                    product={product}
                    key={product.node.id + index.toString()}
                  />
                );
              }
              return <></>;
            })}
          <div className="shop-buttons">
            <button
              type="button"
              className="shop-scroll__button"
              onClick={() => setAudioPaused(!audioPaused)}
            >
              {audioPaused ? <MusicOffIcon /> : <MusicNoteIcon />}
            </button>
            <button
              type="button"
              className="shop-scroll__button"
              onClick={() => setButtonPaused(!buttonPaused)}
            >
              {buttonPaused ? <PlayArrowIcon /> : <PauseIcon />}
            </button>
          </div>
        </div>
      </div>
      <Link to="/shop/all">
        <div className="shop-view" role="button" tabIndex={0}>
          <img
            style={{ margin: 0 }}
            className="shop-view__logo"
            src={sageAnimated}
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
  data: PropTypes.PropTypes.shape().isRequired,
};

export default Shop;

export const query = graphql`
  query MyQuery {
    allStripeProduct(
      filter: { active: { eq: true }, metadata: { onCarousel: { eq: "true" } } }
    ) {
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
