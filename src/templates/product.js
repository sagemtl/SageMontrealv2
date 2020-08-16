/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SizeChart from '../components/sizeChart';
import { GlobalContext } from '../context/Provider';
import { sortSizes, getSkuInventory } from '../helpers/stripeHelper';

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
  const [inventories, setInventories] = useState([]);
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    getAllInventory();
  }, []);

  const getAllInventory = async () => {
    var invs = await Promise.all(skus.edges.map(async (node) => {
      var inv = await getSkuInventory(node.node.id);
      console.log(inv);
      return inv;
    }));
    console.log("invs");
    console.log(invs);
    if(invs) {
      console.log("inside if inv");
      setInventories(invs);
    }
    // console.log(inventories);
  }

  const checkIsInStock = (sku_id) => {
    console.log("is in stock inventories "+sku_id);
    console.log(inventories);
    var inv = inventories.filter(inv => inv.sku_id == sku_id);
    // console.log("is in stock ");
    // console.log(inv);
    if (inv[0] && inv[0].quantity != 0) {
      console.log("has inv");
      return true
    };
    return false;
  }

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
    var matched = skus.edges.find((node) => node.node.id == sku);
    return matched.node.price / 100;
  };

  // not fully tested yet
  const sortedSkus = sortSizes(skus.edges);

  const imgIcons = () => {
    var icons = item.children.map((node) => {

      <img
        src={node.childImageSharp.fixed.src}
        alt={node.name}
        key={node.id}
        className="product-images__image--secondary"
        onClick={() =>
          setSelectedImage(node.childImageSharp.fixed.src)
        }
      />
      
    });
    return icons;
  }

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

            {imgIcons()}

            {/* not pulling images from skus anymore */}
            {/* {skus.edges.map(({ node }) => (
              <img
                src={node.featuredImg.childImageSharp.fixed.src}
                alt={node.attributes.name}
                className="product-images__image--secondary"
                onClick={() =>
                  setSelectedImage(node.featuredImg.childImageSharp.fixed.src)
                }
              />
            ))} */}
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
              const nodeid = node.id;
              const hasStock = !checkIsInStock(nodeid);
              return (
                <div className="product-details-sizes__size" key={size}>
                  <input
                    type="radio"
                    id={size}
                    value={size}
                    checked={selectedSize === size}
                    onClick={() => {
                      setSelectedSku(nodeid);
                      setSelectedSize(size);
                    }}
                    disabled={hasStock}
                    // disabled={checkIsInStock(nodeid)}
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
          <SizeChart modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
