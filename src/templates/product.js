/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
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
    const getAllInventory = async () => {
      const invs = await Promise.all(
        skus.edges.map(async (node) => {
          const inv = await getSkuInventory(node.node.id);
          return inv;
        }),
      );
      if (invs) {
        setInventories(invs);
      }
    };

    getAllInventory();
  }, [skus.edges]);

  const checkIsInStock = (skuId) => {
    console.log(skuId);
    inventories.forEach((invEl) => console.log(invEl));

    const inv = inventories.filter(
      (invEl) => typeof invEl !== 'undefined' && invEl.sku_id === skuId,
    );
    if (inv[0] && inv[0].quantity !== 0) {
      return true;
    }
    return false;
  };

  const allowAddToCart = () => {
    if (selectedSize.length <= 0) return false;
    if (!checkIsInStock(selectedSku)) return false;
    return true;
  };

  const filterPrice = (sku) => {
    const matched = skus.edges.find((node) => node.node.id === sku);
    return matched.node.price / 100;
  };

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

  // not fully tested yet
  const sortedSkus = sortSizes(skus.edges);

  const imgIcons = () => {
    const icons = item.children.map((node) => {
      return (
        <img
          src={node.childImageSharp.fixed.src}
          alt={node.name}
          className="product-images__image--secondary"
          onClick={() => setSelectedImage(node.childImageSharp.fixed.src)}
          onKeyDown={() => setSelectedImage(node.childImageSharp.fixed.src)}
        />
      );
    });
    return icons;
  };

  const renderSizesFromSku = () => {
    const skuComponents = sortedSkus.map(({ node }) => {
      const size = node.attributes.name;
      const nodeid = node.id;
      const hasStock = checkIsInStock(nodeid);
      const className = `product-details-sizes-label__${
        hasStock ? 'in-stock' : 'no-stock'
      }`;
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
            disabled={!hasStock}
          />
          <label htmlFor={size} className={className}>
            {size}
          </label>
        </div>
      );
    });
    return skuComponents;
  };

  const productDescription = (desc) => {
    const descArr = desc.split(',');
    const descComponent = descArr.map((text) => {
      text = text.trim();
      return (
        <p className="product-details__point">{text}</p>
      )
    })
    return descComponent;
  }

  return (
    <Layout>
      <div className="product">
        <div className="product-images">
          <img
            src={selectedImage}
            alt={item.name}
            className="product-images__image--main"
          />
          <div className="product-images-secondary">{imgIcons()}</div>
        </div>
        <div className="product-details">
          <h1 className="product-details__header">{item.name}</h1>
          {/* <p className="product-details__point">{item.description}</p> */}
          {productDescription(item.description)}
          {item.metadata.modelInfo ? (
            <p className="product-details__point">{item.metadata.modelInfo}</p>
          ) : null}
          <br/>
          <p style={{ margin: 0 }}>$ {skus.edges[0].node.price / 100}</p>
          {/* sku/size selection */}
          <div className="product-details-sizes">{renderSizesFromSku()}</div>
          {/* size guide */}
          <button
            type="button"
            className="size-guide__size-guide-link"
            onClick={() => setModalOpen(true)}
          >
            size guide
          </button>
          <SizeChart modalOpen={modalOpen} setModalOpen={setModalOpen} />

          <button
            className="product-details__button"
            type="button"
            onClick={addToCart}
            disabled={!allowAddToCart()}
          >
            Add to cart
          </button>
        </div>
        <Link className="product-details__back" to="/shop">
          <KeyboardBackspaceIcon
            style={{ color: '#154734' }}
            fontSize="large"
          />
        </Link>
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
