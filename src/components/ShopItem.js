import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import './styles/shopItem.scss';

const ShopItem = ({
  buttonPaused,
  delay,
  paused,
  setPaused,
  windowWidth,
  product,
}) => {
  const { node } = product;

  const actualDelay = windowWidth >= 1200 ? delay : 'unset';
  const productImage = node.featuredImg.childImageSharp.fixed;

  return (
    <Link to={`/shop/${node.fields.slug}`}>
      <div
        className={windowWidth >= 1200 ? 'shop-item' : 'shop-item-mobile'}
        style={
          paused || buttonPaused
            ? {
                animationPlayState: 'paused',
                animationDelay: actualDelay,
              }
            : { animationDelay: actualDelay }
        }
        onMouseEnter={() => {
          setPaused(true);
        }}
        onMouseLeave={() => {
          setPaused(false);
        }}
      >
        <Img fixed={productImage} alt={`Product-${node.id}`} key={0} />
        {windowWidth > 700 && (
          <Img fixed={productImage} alt={`Product-${node.id}`} key={1} />
        )}
        {windowWidth > 1100 && (
          <Img fixed={productImage} alt={`Product-${node.id}`} key={2} />
        )}
        {windowWidth > 1400 && (
          <Img fixed={productImage} alt={`Product-${node.id}`} key={3} />
        )}
      </div>
    </Link>
  );
};

ShopItem.propTypes = {
  buttonPaused: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
  paused: PropTypes.bool.isRequired,
  setPaused: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
  product: PropTypes.shape().isRequired,
};

export default ShopItem;
