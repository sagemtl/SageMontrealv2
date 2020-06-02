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

  return (
    <Link to={`/shop/${node.fields.slug}`}>
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
          src={node.featuredImg.childImageSharp.fixed.src}
          className="shop-wheel__image"
          alt={`Product-${node.id}`}
        />
        <img
          src={node.featuredImg.childImageSharp.fixed.src}
          className="shop-wheel__image"
          alt={`Product-${node.id}`}
        />
        <img
          src={node.featuredImg.childImageSharp.fixed.src}
          className="shop-wheel__image"
          alt={`Product-${node.id}`}
        />
        {windowWidth > 1200 && (
          <img
            src={node.featuredImg.childImageSharp.fixed.src}
            className="shop-wheel__image"
            alt={`Product-${node.id}`}
          />
        )}
        {windowWidth > 1500 && (
          <img
            src={node.featuredImg.childImageSharp.fixed.src}
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
