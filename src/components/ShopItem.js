import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

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
        <img
          src={node.images[0]}
          className="shop-wheel__image"
          alt={`Product-${node.id}`}
        />
        {windowWidth > 400 && (
          <img
            src={node.images[0]}
            className="shop-wheel__image"
            alt={`Product-${node.id}`}
          />
        )}
        {windowWidth > 700 && (
          <img
            src={node.images[0]}
            className="shop-wheel__image"
            alt={`Product-${node.id}`}
          />
        )}
        {windowWidth > 1200 && (
          <img
            src={node.images[0]}
            className="shop-wheel__image"
            alt={`Product-${node.id}`}
          />
        )}
        {windowWidth > 1500 && (
          <img
            src={node.images[0]}
            className="shop-wheel__image"
            alt={`Product-${node.id}`}
          />
        )}
      </div>
    </Link>
  );
};

ShopItem.propTypes = {
  buttonPaused: PropTypes.bool.isRequired,
  delay: PropTypes.string.isRequired,
  paused: PropTypes.bool.isRequired,
  setPaused: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
  product: PropTypes.shape().isRequired,
};

export default ShopItem;
