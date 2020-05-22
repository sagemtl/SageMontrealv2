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
  return (
    <Link to="/shop/product">
      <div
        className="shop-item"
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
          alt={`Product-${product.id}`}
        />
        <img
          src={product.node.images[0]}
          className="shop-wheel__image"
          alt={`Product-${product.id}`}
        />
        <img
          src={product.node.images[0]}
          className="shop-wheel__image"
          alt={`Product-${product.id}`}
        />
        {windowWidth > 1200 && (
          <img
            src={product.node.images[0]}
            className="shop-wheel__image"
            alt={`Product-${product.id}`}
          />
        )}
        {windowWidth > 1500 && (
          <img
            src={product.node.images[0]}
            className="shop-wheel__image"
            alt={`Product-${product.id}`}
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
