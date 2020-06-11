/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { GlobalContext } from '../context/Provider';

import './styles/product.scss';

const Product = ({ data }) => {
  const item = data.stripeProduct;
  const skus = data.allStripeSku;
  const sizes = ['S', 'M', 'L', 'XL'];

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(
    item.children[0].childImageSharp.fixed.src,
  );
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
        image: item.featuredImg.childImageSharp.fixed,
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
    <Layout current={`/shop/${item.fields.slug}`}>
      <div className="product">
        <div className="product-images">
          <div>
            <img
              src={selectedImage}
              alt={item.name}
              className="product-images__image--main"
            />
          </div>
          <div className="product-images-secondary">
            <img
              src={item.children[0].childImageSharp.fixed.src}
              alt={item.name}
              className="product-images__image--secondary"
              onClick={() =>
                setSelectedImage(item.children[0].childImageSharp.fixed.src)
              }
            />
            {skus.edges.map(({ node }) => (
              <img
                src={node.featuredImg.childImageSharp.fixed.src}
                alt={node.attributes.name}
                className="product-images__image--secondary"
                onClick={() =>
                  setSelectedImage(node.featuredImg.childImageSharp.fixed.src)
                }
              />
            ))}
          </div>
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
      fields {
        slug
      }
      featuredImg {
        childImageSharp {
          fixed(height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      children {
        ... on File {
          name
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
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
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
