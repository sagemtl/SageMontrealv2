/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Img from "gatsby-image"
import { GlobalContext } from '../context/Provider';

import './styles/product.scss';

const Product = ({ data }) => {
  const item = data.stripeProduct;
  const skus = data.allStripeSku;
  const sizes = ['S', 'M', 'L', 'XL'];

  const [selectedSize, setSelectedSize] = useState('');
  const { state, dispatch } = useContext(GlobalContext);

  const addToCart = () => {
    const itemsCopy = Array.from(state.checkoutItems);
    const itemId = item.id + selectedSize;
    const itemIndex = itemsCopy.findIndex((i) => i.id === itemId);

    if (itemIndex !== -1) {
      itemsCopy[itemIndex].amount += 1;
    } else {
      itemsCopy.push({
        id: itemId,
        name: item.name,
        amount: 1,
        price: 50,
        size: selectedSize,
        image: skus.edges[0].node.image,
      });
    }

    dispatch({
      type: 'SET_CHECKOUT_ITEMS',
      payload: {
        checkoutItems: itemsCopy,
      },
    });
  };

  return (
    <Layout>
      <div className="product">
        <div className="product-images">
        {item.children.map(({ childImageSharp }) => (
            <div>
              <img
                src={childImageSharp.fixed.src}
                alt={item.name}
                className="product-images__image"
              />
            </div>
          ))}
          {skus.edges.map(({ node }) => (
            <div>
              <img
                src={node.featuredImg.childImageSharp.fixed.src}
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
          <button
            className="product-details__button"
            type="button"
            onClick={addToCart}
            disabled={selectedSize.length <= 0}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

Product.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Product;

export const query = graphql`
  query($id: String!) {
    stripeProduct(id: { eq: $id }) {
      id
      name
      description
      children {
        ... on File {
          name
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
    }
    allStripeSku(filter: { product: { id: { eq: $id } } }) {
      edges {
        node {
          attributes {
            name
          }
          featuredImg {
            childImageSharp {
              fixed {
                src
              }
            }
          }
        }
      }
    }
  }
`;
