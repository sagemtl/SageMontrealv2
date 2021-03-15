import React, { useContext } from 'react';
import { GlobalContext } from '../context/Provider';

import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { convertCadToUsd } from '../helpers/stripeHelper';

import './styles/shopViewItem.scss';

const ShopViewItem = ({ product }) => {
  const { node } = product;
  const productImage = node.featuredImg.childImageSharp.fixed;
  const { state } = useContext(GlobalContext);

  const renderPriceAndCurrency = (price) => {
    if(state.currency === 'USD') {
      return `$ ${convertCadToUsd(price)} USD`;
    }
    return `$ ${price} CAD`;
  }


  return (
    <Link to={`/shop/${node.fields.slug}`}>
      <div className="shop-view-all-item">
        <Img
          className="shop-view-all-item__image"
          fixed={productImage}
          alt={`Product-${node.id}`}
          key={0}
        />
        <span className="shop-view-all-item__name">
          {product.node.name.toUpperCase()}
        </span>
        <br />
        <span className="shop-view-all-item__price">
          {renderPriceAndCurrency(product.node.metadata.price)}
        </span>
      </div>
    </Link>
  );
};

ShopViewItem.propTypes = {
  product: PropTypes.shape().isRequired,
};

export default ShopViewItem;
