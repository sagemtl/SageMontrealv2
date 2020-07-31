/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Layout from '../components/layout';
import { GlobalContext } from '../context/Provider';
import { sortSizes } from '../helpers/stripeHelper';

import './styles/product.scss';

const Product = ({ data }) => {
  const item = data.stripeProduct;
  const skus = data.allStripeSku;

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSku, setSelectedSku] = useState('');
  const [selectedImage, setSelectedImage] = useState(
    item.children[0].childImageSharp.fixed.src,
  );
  const [modalOpen, setModalOpen] = useState(false);
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
        price: filterPrice(selectedSku),
        size: selectedSize,
        image: item.featuredImg.childImageSharp.fixed,
        sku: selectedSku,
      });
    }

    dispatch({
      type: 'SET_CHECKOUT_ITEMS',
      payload: {
        checkoutItems: itemsCopy,
      },
    });
  };

  const filterPrice = (sku) => {
    return skus.edges.filter((node) => node.id === sku) / 100;
  };

  // not fully tested yet
  const sortedSkus = sortSizes(skus.edges);

  return (
    <Layout current={`/shop/${item.fields.slug}`}>
      <div className="product">
        <div className="product-images">
          <img
            src={selectedImage}
            alt={item.name}
            className="product-images__image--main"
          />
          <div className="product-images-secondary">
            {item.children.map((node) => {
              <img
                src={node.childImageSharp.fixed.src}
                alt={node.name}
                key={node.id}
                className="product-images__image--secondary"
                onClick={() => setSelectedImage(node.childImageSharp.fixed.src)}
              />;
            })}
          </div>
        </div>
        <div className="product-details">
          <h1 className="product-details__header">{item.name}</h1>
          <p className="product-details__point">{item.description}</p>
          {item.metadata.modelInfo ? (
            <p className="product-details__point">{item.metadata.modelInfo}</p>
          ) : null}
          <p style={{ margin: 0 }}>$ {skus.edges[0].node.price / 100}</p>
          <div className="product-details-sizes">
            {sortedSkus.map(({ node }) => {
              const size = node.attributes.name;
              return (
                <div className="product-details-sizes__size" key={size}>
                  <input
                    type="radio"
                    id={size}
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => {
                      setSelectedSize(size);
                      setSelectedSku(node.id);
                    }}
                  />
                  <label htmlFor={size} className="cursor">
                    {size}
                  </label>
                </div>
              );
            })}
          </div>
          <button
            className="size-guide__size-guide-link"
            onClick={() => setModalOpen(true)}
          >
            {' '}
            size guide
          </button>
          <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
            <DialogContent>
              <header className="size-guide__heading">
                Size Guides: Short sleeve T-shirts (Centimeters)
              </header>
              <div>
                <table>
                  <tr>
                    <th> </th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                  </tr>
                  <tr>
                    <th>Width</th>
                    <th>49</th>
                    <th>52</th>
                    <th>56</th>
                    <th>59</th>
                  </tr>
                  <tr>
                    <th>Shoulders</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                    <th>51</th>
                  </tr>
                  <tr>
                    <th>Length</th>
                    <th>65</th>
                    <th>67</th>
                    <th>70</th>
                    <th>73</th>
                  </tr>
                  <tr>
                    <th>Sleeve</th>
                    <th>23</th>
                    <th>25</th>
                    <th>26</th>
                    <th>27</th>
                  </tr>
                </table>
              </div>
            </DialogContent>
          </Dialog>
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
      metadata {
        modelInfo
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
          id
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
          id
          price
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
