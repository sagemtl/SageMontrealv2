import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import './styles/shopViewItem.scss';

const ShopViewItem = ({ product }) => {
  const { node } = product;
  const productImage = node.featuredImg.childImageSharp.fixed;

  return (
    <Link to={`/shop/${node.fields.slug}`}>
      <div className="shop-view-all-item">
        <Img
          className="shop-view-all-item__image"
          fixed={productImage}
          alt={`Product-${node.id}`}
          key={0}
        />
        <span className="shop-view-all-item__name">{product.node.name}</span>
        <br />
        <span className="shop-view-all-item__price">
          ${product.node.metadata.price}.00 CAD
        </span>
      </div>
    </Link>
  );
};

ShopViewItem.propTypes = {
  product: PropTypes.shape().isRequired,
};

export default ShopViewItem;
