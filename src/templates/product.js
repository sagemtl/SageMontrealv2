/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

import './styles/product.scss';

const Product = ({ data }) => {
  const item = data.stripeProduct;
  const skus = data.allStripeSku;

  const sizes = ['S', 'M', 'L', 'XL'];

  const [selectedSize, setSelectedSize] = useState('');

  return (
    <Layout>
      <div className="product">
        <div className="product-images">
          {skus.edges.map(({ node }) => (
            <div>
              <img
                src={node.image}
                alt={node.attributes.name}
                className="product-images__image"
              />
            </div>
          ))}
        </div>
        <div className="product-details">
          <h1>{item.name}</h1>
          <p className="product-details__point">260g/sm French Terry Cotton</p>
          <p className="product-details__point">
            Double-needle sleeve and side-seams
          </p>
          <p className="product-details__point">Embroidered Logo</p>
          <p className="product-details__point">Relaxed Fit</p>
          <div className="product-details-sizes">
            {sizes.map((size, index) => {
              return (
                <div
                  className="product-details-sizes__size"
                  style={index === 0 ? { marginLeft: 0 } : {}}
                >
                  <input
                    type="radio"
                    id={size}
                    value={size}
                    checked={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  />
                  <label htmlFor={size} className="cursor">
                    {size}
                  </label>
                </div>
              );
            })}
          </div>
          <button className="product-details__button" type="button">
            Add To Cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Product;

export const query = graphql`
  query($id: String!) {
    stripeProduct(id: { eq: $id }) {
      id
      name
      description
    }
    allStripeSku(filter: { product: { id: { eq: $id } } }) {
      edges {
        node {
          image
          attributes {
            name
          }
        }
      }
    }
  }
`;
